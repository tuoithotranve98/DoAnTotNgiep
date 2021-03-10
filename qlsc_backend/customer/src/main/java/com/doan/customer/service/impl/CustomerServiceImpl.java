package com.doan.customer.service.impl;

import com.doan.customer.common.Const;
import com.doan.customer.dto.main.CustomerDTO;
import com.doan.customer.entity.main.Customer;
import com.doan.customer.repository.CustomerRepository;
import com.doan.customer.converter.CustomerConverter;
import com.doan.customer.converter.WardConverter;
import com.doan.customer.exception.DataTooLongException;
import com.doan.customer.exception.DuplicateFieldException;
import com.doan.customer.exception.EntityNotFoundException;
import com.doan.customer.model.SearchCustomer;
import com.doan.customer.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final WardConverter wardConverter;
    private final CustomerConverter customerConverter;

    @Override
    public CustomerDTO addCustomer(CustomerDTO customerDTO) throws DataTooLongException {

        if (StringUtils.isEmpty(customerDTO.getCode())) {
            String code = generateCode();
            customerDTO.setCode(code);
        }

        if (StringUtils.isNotEmpty(customerDTO.getCode())) {
            Customer existedCode = customerRepository.findOneByCode(customerDTO.getCode());
            if (existedCode != null) throw new DuplicateFieldException("Code", Const.CUSTOMER);
        }

        if (StringUtils.isNotEmpty(customerDTO.getPhoneNumber())
                && checkPhoneNumber(customerDTO.getPhoneNumber())
                && customerDTO.getPhoneNumber().length() >= 10) {
            throw new DuplicateFieldException("Phone", Const.CUSTOMER);
        }

        customerDTO.setCreatedDate(new Date());
        customerDTO.setModifiedDate(new Date());
        customerDTO.setStatus((byte) 1);
        customerDTO.setCode(customerDTO.getCode().toLowerCase());
        customerDTO.setWard(customerDTO.getWard());
        Customer customer = customerConverter.convertToEntity(customerDTO);

        try {
            customer = customerRepository.save(customer);
        } catch (DuplicateFieldException e) {
            e.printStackTrace();
        } catch (Exception exception) {
            throw new DataTooLongException();
        }
        return customerConverter.convertToDTO(customer);
    }

    @Override
    public Map<String, Object> searchCustomer(SearchCustomer searchCustomer) {

        int pageNumber = searchCustomer.getPage();
        int size = searchCustomer.getSize();
        String nameField = searchCustomer.getNameField();
        String order = searchCustomer.getOrder();
        String keyWork = searchCustomer.getSearch();
        Pageable paging = PageRequest.of(pageNumber - 1, size, Sort.by("modifiedDate").descending());

        if (nameField.equals("code")) {
            if (order.equals("ascend")) {
                paging = PageRequest.of(pageNumber - 1, size, Sort.by("code"));
            } else if (order.equals("descend")) {
                paging = PageRequest.of(pageNumber - 1, size, Sort.by("code").descending());
            }
        } else if (nameField.equals("name")) {
            if (order.equals("ascend")) {
                paging = PageRequest.of(pageNumber - 1, size, Sort.by("name"));
            } else if (order.equals("descend")) {
                paging = PageRequest.of(pageNumber - 1, size, Sort.by("name").descending());
            }
        }

        Page<Customer> customerPage = customerRepository.search(paging, keyWork);
        List<CustomerDTO> customerDTOList = new ArrayList<>();
        HashMap<String, Object> map = new HashMap<>();
        List<Customer> customers = customerPage.getContent();

        customers.forEach(customer -> customerDTOList.add(customerConverter.convertToDTO(customer)));

        map.put("customers", customerDTOList);
        map.put("currentPage", customerPage.getNumber() + 1);
        map.put("totalItems", customerPage.getTotalElements());
        map.put("totalPages", customerPage.getTotalPages());
        return map;
    }

    @Override
    public CustomerDTO updateCustomer(CustomerDTO customerDTO, Long idCustomer) {

        Customer customer = getCustomerById(idCustomer);
        customerDTO.setCreatedDate(new Date());
        customerDTO.setModifiedDate(new Date());
        customerDTO.setStatus((byte) 1);
        customerDTO.setCode(customerDTO.getCode().toLowerCase());

        if (StringUtils.isEmpty(customerDTO.getCode())) {
            String code = generateCode();
            customerDTO.setCode(code);
        }

        if (StringUtils.isNotEmpty(customer.getCode())
                && StringUtils.isNotEmpty(customerDTO.getCode())
                && !customerDTO.getCode().equals(customer.getCode())) {
            Customer existedCode = customerRepository.findOneByCode(customerDTO.getCode());
            if (existedCode != null) throw new DuplicateFieldException("Code", Const.CUSTOMER);
        }

        if (!customerDTO.getPhoneNumber().equals(customer.getPhoneNumber())
                && checkPhoneNumber(customerDTO.getPhoneNumber())) {
            throw new DuplicateFieldException("Phone", Const.CUSTOMER);
        }

        customer.setCustomer(customerDTO);
        if (customerDTO.getWard() != null) {
            customer.setWard(wardConverter.convertToEntity(customerDTO.getWard()));
        } else {
            customer.setWard(null);
        }

        try {
            customer = customerRepository.save(customer);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return customerConverter.convertToDTO(customer);
    }

    @Override
    public void deleteCustomer(Long idCustomer) {
        Customer customer = getCustomerById(idCustomer);
        customerRepository.delete(customer);
    }

    @Override
    public CustomerDTO getById(Long idCustomer) {
        Customer customer = getCustomerById(idCustomer);
        if (customer.getStatus() == 0) {
            throw new EntityNotFoundException(idCustomer, Const.CUSTOMER);
        }
        return customerConverter.convertToDTO(customer);
    }


    @Override
    public boolean checkPhoneNumber(String phoneNumber) {
        Customer customer = customerRepository.checkPhoneNumber(phoneNumber);
        return customer != null;
    }

    private Customer getCustomerById(Long idCustomer) {
        Optional<Customer> customer = customerRepository.findById(idCustomer);
        if (customer.isEmpty())
            throw new EntityNotFoundException(idCustomer, Const.CUSTOMER);
        return customer.get();
    }

    @Override
    @Transactional
    public void updateMultipleStatusCustomer(List<Long> ids) {
        try {
            ids.forEach(id -> {
                Customer customer = CustomerServiceImpl.this.getCustomerById(id);
                customer.setStatus((byte) 0);
                customerRepository.save(customer);
            });
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private String generateCode() {
        long codeNumber;
        String newCodeString;
        int index = 0;
        codeNumber = getCodeNumber(index, customerRepository.getMaxCode(index));
        newCodeString = "kh00" + codeNumber;
        Customer existedCode = customerRepository.findOneByCode(newCodeString);
        if (existedCode != null) throw new DuplicateFieldException("Code", Const.CUSTOMER);
        return newCodeString;
    }

    static long getCodeNumber(int index, String maxCode) {
        String getMaxCode;
        long codeNumber;
        do {
            getMaxCode = maxCode;
            if (getMaxCode == null) {
                getMaxCode = "0";
            } else {
                boolean result = StringUtils.isNumeric(getMaxCode);
                if (!result) {
                    getMaxCode = null;
                    index++;
                }
            }
        } while (getMaxCode == null);
        codeNumber = Long.parseLong(getMaxCode) + 1;
        return codeNumber;
    }

}

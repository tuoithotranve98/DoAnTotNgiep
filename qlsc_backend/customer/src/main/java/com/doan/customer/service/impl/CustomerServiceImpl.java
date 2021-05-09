package com.doan.customer.service.impl;

import com.doan.customer.common.Const;
import com.doan.customer.dto.main.CustomerDTO;
import com.doan.customer.entity.main.Customer;
import com.doan.customer.model.CustomerRes;
import com.doan.customer.repository.CustomerRepository;
import com.doan.customer.converter.CustomerConverter;
import com.doan.customer.converter.WardConverter;
import com.doan.customer.exception.DataTooLongException;
import com.doan.customer.exception.DuplicateFieldException;
import com.doan.customer.exception.EntityNotFoundException;
import com.doan.customer.model.SearchCustomer;
import com.doan.customer.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.BooleanUtils;
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
    public CustomerRes addCustomer(CustomerDTO customerDTO) {

        if (StringUtils.isEmpty(customerDTO.getCode())) {
            String code = generateCode();
            customerDTO.setCode(code);
        }

        if (StringUtils.isNotEmpty(customerDTO.getCode())) {
            Customer existedCode = customerRepository.findOneByCode(customerDTO.getCode());
            if (existedCode != null) {
                new CustomerRes(Boolean.FALSE, "Mã khách hàng đã tồn tại");
            }
        }

        if (StringUtils.isNotEmpty(customerDTO.getPhone())
            && BooleanUtils.isTrue(checkPhoneNumber(customerDTO.getPhone()))) {
            return new CustomerRes(Boolean.FALSE, "Số điện thoại đã tồn tại");
        }

        customerDTO.setCreatedDate(new Date());
        customerDTO.setModifiedDate(new Date());
        customerDTO.setStatus((byte) 1);
        customerDTO.setCode(customerDTO.getCode().toLowerCase());
        customerDTO.setWard(customerDTO.getWard());
        Customer customer = customerConverter.convertToEntity(customerDTO);

        try {
            customerRepository.save(customer);
            return new CustomerRes(Boolean.TRUE, "");
        } catch (DuplicateFieldException e) {
            e.printStackTrace();
            return new CustomerRes(Boolean.FALSE, "");
        }
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
        if (customerPage.getContent().size() == 0) {
            map.put("customers", customerDTOList);
            map.put("currentPage", 0);
            map.put("totalItems", 0);
            map.put("totalPages", 0);
            return map;
        }
        customers.forEach(customer -> customerDTOList.add(customerConverter.convertToDTO(customer)));
        if (customers.isEmpty()) fakeDataCustomer();

        map.put("customers", customerDTOList);
        map.put("currentPage", customerPage.getNumber() + 1);
        map.put("totalItems", customerPage.getTotalElements());
        map.put("totalPages", customerPage.getTotalPages());
        return map;
    }

    @Override
    public CustomerRes updateCustomer(CustomerDTO customerDTO, Long idCustomer) {

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
            if (existedCode != null) {
                return new CustomerRes(Boolean.FALSE, "Mã khách hàng đã tồn tại");
            }
        }

        if (!customerDTO.getPhone().equals(customer.getPhone())
            && BooleanUtils.isTrue(checkPhoneNumber(customerDTO.getPhone()))) {
            return new CustomerRes(Boolean.FALSE, "Số điện thoại đã tồn tại");
        }
        customer.setCustomer(customerDTO);
        if (!Objects.isNull(customerDTO.getWard())) {
            customer.setWard(wardConverter.convertToEntity(customerDTO.getWard()));
        } else {
            customer.setWard(null);
        }
        try {
            customerRepository.save(customer);
            return new CustomerRes(Boolean.TRUE, "");
        } catch (Exception e) {
            e.printStackTrace();
            return new CustomerRes(Boolean.FALSE, "");
        }
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

    public void fakeDataCustomer() {
        List<String> first = Arrays.asList("Bùi Đức ", "Nguyễn Văn ", "Nguyễn Xuân ");
        List<String> last = Arrays.asList("A", "B", "C", "D", "E", "F", "G", "H", "M");
        List<String> email = Arrays.asList("fake@gmail.com", "hanoi@gmail.com", "ninhbinh@gmail.com");
        for (int i = 0; i < 1000; i++) {
            Customer customer = new Customer();
            String code = "kh" + i;
            customer.setCode(code);
            customer.setPhone("0347481199");
            customer.setName(first.get(new Random().nextInt(first.size())) + last.get(new Random().nextInt(first.size())));
            customer.setEmail(email.get(new Random().nextInt(first.size())));
            customer.setStatus(new Byte("1"));
            customer.setCreatedDate(new Date());
            customer.setModifiedDate(new Date());
            customerRepository.save(customer);
        }
    }

}

package com.doan.customer.converter;

import com.doan.customer.dto.main.CustomerDTO;
import com.doan.customer.entity.main.Customer;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CustomerConverter {

    private final WardConverter wardConverter;

    public CustomerDTO convertToDTO(Customer customer) {
        CustomerDTO customerDTO = new CustomerDTO();
        customerDTO.setId(customer.getId());
        customerDTO.setCode(customer.getCode());
        customerDTO.setCreatedDate(customer.getCreatedDate());
        customerDTO.setModifiedDate(customer.getModifiedDate());
        customerDTO.setPhoneNumber(customer.getPhoneNumber());
        customerDTO.setName(customer.getName());
        customerDTO.setEmail(customer.getEmail());
        customerDTO.setDescription(customer.getDescription());
        customerDTO.setAddress(customer.getAddress());
        customerDTO.setStatus(customer.getStatus());

        if (customer.getWard() != null) {
            customerDTO.setWard(wardConverter.convertToDTO(customer.getWard()));
        }

        return customerDTO;
    }

    public Customer convertToEntity(CustomerDTO customerDTO) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(customerDTO, Customer.class);
    }

}

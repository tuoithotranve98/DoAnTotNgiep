package com.doan.customer.validation.validator;

import com.doan.customer.validation.anotation.CustomerCode;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class CustomerCodeValidator implements ConstraintValidator<CustomerCode, String> {

    @Override
    public boolean isValid(String customerCode, ConstraintValidatorContext constraintValidatorContext) {
        try {
            return (customerCode == null)
                    || (customerCode.length() == 0
                    || customerCode.length() >= 4
                    && customerCode.matches("[a-zA-Z]{2}[0-9]{1,4}"));
        } catch (Exception e) {
            return false;
        }
    }
}

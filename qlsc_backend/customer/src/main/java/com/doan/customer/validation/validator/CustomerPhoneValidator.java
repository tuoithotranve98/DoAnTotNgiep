package com.doan.customer.validation.validator;

import com.doan.customer.validation.anotation.CustomerPhone;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class CustomerPhoneValidator implements ConstraintValidator<CustomerPhone, String> {

    @Override
    public boolean isValid(String customerCode, ConstraintValidatorContext constraintValidatorContext) {
        try {
            return (customerCode == null)
                    || (customerCode.length() == 0
                    || customerCode.length() >= 10
                    && customerCode.matches("(03|07|08|09|01[2|6|8|9])+([0-9]{8})"));
        } catch (Exception e) {
            return false;
        }
    }
}

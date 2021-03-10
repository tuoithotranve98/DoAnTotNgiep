package com.doan.customer.validation.validator;

import com.doan.customer.validation.anotation.ProductCode;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class ProductCodeValidator implements ConstraintValidator<ProductCode, String> {

    @Override
    public boolean isValid(String productCode, ConstraintValidatorContext constraintValidatorContext) {
        try {
            return (productCode == null)
                    || (productCode.length() == 0
                    || productCode.length() >= 4
                    && productCode.matches("[A-Z]{2}[0-9]{1,5}"));
        }
        catch (Exception e) {
            return false;
        }
    }
}

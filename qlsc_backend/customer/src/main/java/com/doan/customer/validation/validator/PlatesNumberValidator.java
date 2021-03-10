package com.doan.customer.validation.validator;

import com.doan.customer.validation.anotation.PlatesNumber;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PlatesNumberValidator implements ConstraintValidator<PlatesNumber, String> {

    @Override
    public boolean isValid(String platesNumber, ConstraintValidatorContext constraintValidatorContext) {
        try {
            return (platesNumber == null)
                    || (platesNumber.length() == 0
                    || platesNumber.length() >= 8
                    && platesNumber.matches("[0-9]{2}[a-zA-Z]{1}[0-9]{5,6}"));
        } catch (Exception e) {
            return false;
        }
    }
}

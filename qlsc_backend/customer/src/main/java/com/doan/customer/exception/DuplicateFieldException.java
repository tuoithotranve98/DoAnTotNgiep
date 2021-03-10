package com.doan.customer.exception;

public class DuplicateFieldException extends RuntimeException {

    public DuplicateFieldException(String fieldName, String objectName) {
        super(fieldName + " of " + objectName + "is duplicate");
    }
}

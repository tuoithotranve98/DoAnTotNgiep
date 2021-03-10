package com.doan.customer.exception;

public class EntityNotFoundException extends RuntimeException {

    public EntityNotFoundException(Long id, String entityName) {
        super("not found id " + entityName + " : " + id);
    }

}

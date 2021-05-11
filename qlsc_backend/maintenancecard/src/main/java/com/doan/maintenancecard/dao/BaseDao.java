package com.doan.maintenancecard.dao;

import java.util.List;
import java.util.concurrent.Future;
import org.springframework.scheduling.annotation.Async;

public interface BaseDao<T extends Entity> extends BaseGenericDao<T> {
    void add(T entity);

    void addNoTrans(T entity);

    void update(T entity);

    void updateNoTrans(T entity);

    T getById(int id);

    @Async
    Future<T> getByIdAsync(int id);

    void remove(T entity);

    void add(List<T> list);

    void addNoTrans(List<T> list);

    void update(List<T> list);

    void updateNoTrans(List<T> list);

    void addOrUpdate(T entity);

    void addOrUpdateNoTrans(T entity);

    void addOrUpdate(List<T> list);

    void addOrUpdateNoTrans(List<T> list);
}
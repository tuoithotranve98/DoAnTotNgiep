package com.doan.maintenancecard.dao.impl;

import com.doan.maintenancecard.dao.BaseDao;
import com.doan.maintenancecard.dao.Entity;
import java.util.List;
import java.util.concurrent.Future;
import java.util.stream.Collectors;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.hibernate.Session;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.transaction.annotation.Transactional;

/**
 * @param <T> Domain
 * @author HaLV
 * @modified KhoiNM
 */
public class BaseDaoImpl<T extends Entity> extends BaseDaoGenericImpl<T> implements BaseDao<T> {
    final Class<T> typeParameterClass;

    @PersistenceContext
    protected EntityManager entityManager;

    public BaseDaoImpl(Class<T> typeParameterClass) {
        super(typeParameterClass);
        this.typeParameterClass = typeParameterClass;
    }

    private Session getSession() {
        return entityManager.unwrap(Session.class);
    }

    @Override
    @Transactional
    public void add(T entity) {
        entityManager.persist(entity);
    }

    @Override
    @Transactional
    public void add(List<T> entities) {
        addList(entities);
    }

    @Override
    @Transactional
    public void update(List<T> entities) {
        updateList(entities);
    }

    @Override
    @Transactional
    public void addOrUpdate(T entity) {
        Session session = getSession();
        session.saveOrUpdate(entity);
        session.flush();
        session.clear();
    }

    @Override
    @Transactional
    public void addOrUpdate(List<T> entities) {
        addOrUpdateList(entities);
    }

    @Override
    @Transactional
    public void update(T entity) {
        entityManager.merge(entity);
    }

    @Override
    public T getById(int id) {
        if (id > 0) {
            return entityManager.find(typeParameterClass, id);
        }
        return null;
    }

    @Override
    @Async
    public Future<T> getByIdAsync(int id) {
        if (id > 0) {
            return new AsyncResult<T>(entityManager.find(typeParameterClass, id));
        } else {
            return new AsyncResult<T>(null);
        }
    }

    @Override
    @Transactional
    public void remove(T entity) {
        entityManager.remove(entity);
    }

//    @Override
//    protected List<Integer> intResultToList(List<IntResult> list) {
//        return list.stream().map(a -> a.getIntResult()).collect(Collectors.toList());
//    }

    @Override
    public void addNoTrans(T entity) {
        entityManager.persist(entity);
    }

    @Override
    public void updateNoTrans(T entity) {
        entityManager.merge(entity);
    }

    @Override
    public void addNoTrans(List<T> list) {
        addList(list);
    }

    @Override
    public void updateNoTrans(List<T> list) {
        updateList(list);
    }

    @Override
    public void addOrUpdateNoTrans(T entity) {
        Session session = getSession();
        session.saveOrUpdate(entity);
        session.flush();
        session.clear();
    }

    @Override
    public void addOrUpdateNoTrans(List<T> list) {
        addOrUpdateList(list);
    }

    private void addList(List<T> entities) {

        Session session = getSession();

        int totalEntities = entities.size();
        for (int index = 0; index < totalEntities; index++) {
            session.save(entities.get(index));
            flushAndReleaseMemoryInBatch(session, index, totalEntities);
        }
    }

    private void updateList(List<T> entities) {

        Session session = getSession();

        int totalEntities = entities.size();
        for (int index = 0; index < totalEntities; index++) {
            session.update(entities.get(index));
            flushAndReleaseMemoryInBatch(session, index, totalEntities);
        }
    }

    private void addOrUpdateList(List<T> entities) {

        Session session = getSession();

        int totalEntities = entities.size();
        for (int index = 0; index < totalEntities; index++) {
            session.saveOrUpdate(entities.get(index));
            flushAndReleaseMemoryInBatch(session, index, totalEntities);
        }
    }

    private void flushAndReleaseMemoryInBatch(Session session, int index, int totalEntities) {
        if (isBatchOrLastItem(index, totalEntities)) {
            flushAndReleaseMemory(session);
        }
    }

    private boolean isBatchOrLastItem(int index, int totalEntities) {
        return (index + 1) % 20 == 0 || index == totalEntities - 1;
    }

    private void flushAndReleaseMemory(Session session) {
        session.flush();
        session.clear();
    }

    public void excute(String query) {
        jdbc.execute(query);
    }
}

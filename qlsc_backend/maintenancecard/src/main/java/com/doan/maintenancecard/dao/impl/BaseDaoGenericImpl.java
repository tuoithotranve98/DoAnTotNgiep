package com.doan.maintenancecard.dao.impl;

import com.doan.maintenancecard.dao.BaseGenericDao;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Future;
import java.util.stream.Collectors;
import lombok.val;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;

/**
 * @param <T> Domain
 * @author HaLV
 * @modified KhoiNM
 */
public class BaseDaoGenericImpl<T> implements BaseGenericDao<T> {
    private final Class<T> typeParameterClass;

    @Autowired
    protected JdbcTemplate jdbc;
    @Autowired
    protected NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public BaseDaoGenericImpl(Class<T> typeParameterClass) {
        this.typeParameterClass = typeParameterClass;
    }

    public void executeSP(String storeProcedure, Map<String, Object> params) {
        executeSP(storeProcedure, params, jdbc);
    }

    public void
    executeSP(String storeProcedure, Map<String, Object> params, JdbcTemplate jdbcTemplate) {
        SimpleJdbcCall jdbcCall = initJdbcCall(storeProcedure, null, null, jdbcTemplate);

        SqlParameterSource mapParams = new MapSqlParameterSource(params);

        jdbcCall.execute(mapParams);
    }

    @SuppressWarnings("unchecked")
    public List<T> querySP(String storeProcedure, Map<String, Object> params) {
        SimpleJdbcCall jdbcCall = initJdbcCall(storeProcedure, "result", typeParameterClass);

        SqlParameterSource in = new MapSqlParameterSource(params);
        Map<String, Object> jdbcCallResult = jdbcCall.execute(in);

        return (List<T>) jdbcCallResult.get("result");
    }

    @SuppressWarnings("unchecked")
    @Async
    public Future<List<T>> querySPAsync(String storeProcedure, Map<String, Object> params) {
        SimpleJdbcCall jdbcCall = initJdbcCall(storeProcedure, "result", typeParameterClass);

        SqlParameterSource in = new MapSqlParameterSource(params);
        Map<String, Object> jdbcCallResult = jdbcCall.execute(in);

        return new AsyncResult<List<T>>((List<T>) jdbcCallResult.get("result"));
    }

    private <V> SimpleJdbcCall initJdbcCall(String storeProcedure, String resultSet, Class<V> clazz) {
        return initJdbcCall(storeProcedure, resultSet, clazz, jdbc);
    }

    private <V> SimpleJdbcCall initJdbcCall(String storeProcedure, String resultSet, Class<V> clazz,
        JdbcTemplate jbdcTemplate) {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jbdcTemplate);
        jdbcCall.withProcedureName(storeProcedure);
        if (StringUtils.isNotEmpty(resultSet)) {
            jdbcCall.returningResultSet(resultSet, new BeanPropertyRowMapper<V>(clazz));
        }

        return jdbcCall;
    }

    @SuppressWarnings("unchecked")
    /**
     * Để V tại vì có T phía trên rồi
     */
    public <V> List<V> querySP(String storeProcedure, Map<String, Object> params, Class<V> clazz) {
        SimpleJdbcCall jdbcCall = initJdbcCall(storeProcedure, "result", clazz);

        SqlParameterSource mapParams = new MapSqlParameterSource(params);
        Map<String, Object> jdbcCallResult = jdbcCall.execute(mapParams);

        return (List<V>) jdbcCallResult.get("result");
    }

    @SuppressWarnings("unchecked")
    @Async
    public <V> Future<List<V>> querySPAsync(String storeProcedure, Map<String, Object> params, Class<V> clazz) {
        SimpleJdbcCall jdbcCall = initJdbcCall(storeProcedure, "result", clazz);

        SqlParameterSource mapParams = new MapSqlParameterSource(params);
        Map<String, Object> jdbcCallResult = jdbcCall.execute(mapParams);

        return new AsyncResult<List<V>>((List<V>) jdbcCallResult.get("result"));
    }

    @SuppressWarnings("unchecked")
    public List<T> getByListId(String tableName, List<Integer> listId) {
        if (listId == null || listId.isEmpty()) {
            return Collections.emptyList();
        }
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("tableName", tableName);
//        params.put("Ids", UtilCommon.joinList(UtilCommon.removeNull(listId)));

        return querySP("GetByListId", params);
    }

    @SuppressWarnings("unchecked")
    public List<T> getByListId(String tableName, List<Integer> listId, int tenantId) {
        if (listId == null || listId.isEmpty()) {
            return Collections.emptyList();
        }

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("tableName", tableName);
//        params.put("Ids", UtilCommon.joinList(UtilCommon.removeNull(listId)));
        params.put("TenantId", tenantId);
        return querySP("GetByListIdAndTenantId", params);
    }

    @SuppressWarnings("unchecked")
    @Async
    public Future<List<T>> getByListIdAsync(String tableName, List<Integer> listId, int tenantId) {
        return new AsyncResult<>(getByListId(tableName, listId, tenantId));
    }

    public <V> List<V> query(String query, Object[] args, Class<V> clazz) {
        return query(query, args, clazz, jdbc);
    }

    public <V> List<V> query(String query, Object[] args, Class<V> clazz, JdbcTemplate jdbcTemplate) {
        return jdbcTemplate.query(query, args, new BeanPropertyRowMapper<V>(clazz));
    }

    public List<T> query(String query, Object[] args) {
        return query(query, args, typeParameterClass);
    }

    public <V> List<V> query(String query, Map<String, Object> map, Class<V> clazz, NamedParameterJdbcTemplate namedParameterJdbcTemplate) {
        return namedParameterJdbcTemplate.query(query, map, new BeanPropertyRowMapper(clazz));
    }

    public <V> List<V> query(String query, Map<String, Object> map, Class<V> clazz) {
        return this.query(query, map, clazz, this.namedParameterJdbcTemplate);
    }

    public List<T> query(String query, Map<String, Object> map) {
        return this.query(query, map, this.typeParameterClass);
    }

    public List<String> queryForListString(String query, Object[] args) {
        return jdbc.query(query, args, new RowMapper<String>() {
            @Override
            public String mapRow(ResultSet resultSet, int i) throws SQLException {
                return resultSet.getString(1);
            }
        });
    }

    @Async
    public Future<List<T>> queryAsync(String query, Object[] args) {
        return new AsyncResult<List<T>>(query(query, args, typeParameterClass));
    }

    @Async
    public <V> Future<List<V>> queryAsync(String query, Object[] args, Class<V> clazz) {
        return new AsyncResult<List<V>>(jdbc.query(query, args, new BeanPropertyRowMapper<V>(clazz)));
    }

    public <V> V queryForObject(String query, Object[] args, Class<V> clazz) {
        val result = jdbc.query(query, args, new BeanPropertyRowMapper<V>(clazz));

        if (result.isEmpty())
            return null;

        return result.get(0);
    }

    public <V> V queryForObject(String query, Object[] args, Class<V> clazz, JdbcTemplate jdbcTemplate) {
        val result = jdbcTemplate.query(query, args, new BeanPropertyRowMapper<V>(clazz));

        if (result.isEmpty())
            return null;

        return result.get(0);
    }

    @Async
    public <V> Future<V> queryForObjectAsync(String query, Object[] args, Class<V> clazz) {
        return new AsyncResult<V>(queryForObject(query, args, clazz));
    }

    public T queryForObject(String query, Object[] args) {
        return queryForObject(query, args, typeParameterClass);
    }

    public T queryForObject(String query, Object[] args, JdbcTemplate jdbcTemplate) {
        return queryForObject(query, args, typeParameterClass, jdbcTemplate);
    }

    @Async
    public Future<T> queryForObjectAsync(String query, Object[] args) {
        return new AsyncResult<T>(queryForObject(query, args, typeParameterClass));
    }

//    protected List<Integer> intResultToList(List<IntResult> list) {
//        return list.stream().map(a -> a.getIntResult()).collect(Collectors.toList());
//    }

    @Async
    public <V> Future<V> queryForObjectAsync(String query, Object[] args, Class<V> clazz, JdbcTemplate jdbcTemplate) {
        return new AsyncResult<V>(queryForObject(query, args, clazz, jdbcTemplate));
    }

    @SuppressWarnings("unchecked")
    @Async
    public Future<List<T>> getByListIdAsync(String tableName, List<Integer> listId, int storeId, JdbcTemplate jdbcTemplate) {
        return new AsyncResult<>(getByListId(tableName, listId, storeId, jdbcTemplate));
    }

    public List<T> getByListId(String tableName, List<Integer> listId, int storeId, JdbcTemplate jdbcTemplate) {
        if (listId == null || listId.isEmpty()) {
            return Collections.emptyList();
        }

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("tableName", tableName);
//        params.put("Ids", UtilCommon.joinList(UtilCommon.removeNull(listId)));
        params.put("StoreId", storeId);
        return querySP("GetByListIdAndStoreId", params, jdbcTemplate);
    }

    public <V> List<V> querySP(String storeProcedure, Map<String, Object> params, Class<V> clazz, JdbcTemplate jdbcTemplate) {
        SimpleJdbcCall jdbcCall = initJdbcCall(storeProcedure, "result", clazz, jdbcTemplate);

        SqlParameterSource mapParams = new MapSqlParameterSource(params);
        Map<String, Object> jdbcCallResult = jdbcCall.execute(mapParams);

        return (List<V>) jdbcCallResult.get("result");
    }

    public List<T> querySP(String storeProcedure, Map<String, Object> params, JdbcTemplate jdbcTemplate) {
        SimpleJdbcCall jdbcCall = initJdbcCall(storeProcedure, "result", typeParameterClass, jdbcTemplate);

        SqlParameterSource in = new MapSqlParameterSource(params);
        Map<String, Object> jdbcCallResult = jdbcCall.execute(in);

        return (List<T>) jdbcCallResult.get("result");
    }
}

package com.doan.product.service.impl;

import com.doan.product.model.ProductReportModel;
import com.doan.product.service.ProductReport;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductReportImpl implements ProductReport {

    private final NamedParameterJdbcTemplate jdbcTemplate;

    @Override
    public List<ProductReportModel> getProductReport(Long tenantId) {
        String sql = "select p.id as id, p.code as code, p.name as name, p.quantity as quantity FROM products p where p.type = 1 and p.tenant_id = :tenantId";
        SqlParameterSource sqlParameterSource = new MapSqlParameterSource().addValue("tenantId", tenantId);
        return jdbcTemplate.query(sql, sqlParameterSource, ((resultSet, i) ->
            new ProductReportModel(
                resultSet.getLong("id"),
                resultSet.getNString("code"),
                resultSet.getNString("name"),
                resultSet.getInt("quantity"))));
    }
}

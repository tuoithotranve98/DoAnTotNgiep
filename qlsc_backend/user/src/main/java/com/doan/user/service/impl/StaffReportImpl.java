package com.doan.user.service.impl;

import com.doan.user.model.StaffReportModel;
import com.doan.user.service.StaffReport;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StaffReportImpl implements StaffReport {

    private final NamedParameterJdbcTemplate jdbcTemplate;

    @Override
    public List<StaffReportModel> getStaffReport(Long tenantId) {
        String sql = "select u.code as code, u.id as id, u.full_name as name from users u where u.role = 2 and u.tenant_id = :tenantId";
        SqlParameterSource sqlParameterSource = new MapSqlParameterSource().addValue("tenantId", tenantId);
        return jdbcTemplate.query(sql, sqlParameterSource, ((resultSet, i) ->
            new StaffReportModel(
                resultSet.getNString("code"),
                resultSet.getLong("id"),
                resultSet.getNString("name"))));
    }
}

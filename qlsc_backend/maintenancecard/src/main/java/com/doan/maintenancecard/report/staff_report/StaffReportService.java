package com.doan.maintenancecard.report.staff_report;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StaffReportService {

    private final NamedParameterJdbcTemplate jdbcTemplate;

    public List<StaffModel> staffReport(Long tenantId) {
        String sql = "select count(m.repairman_id) as total_main, sum(m.price) as revenue, m.repairman_id as repairman_id from maintenance_cards m where m.tenant_id = :tenantId group by repairman_id";
        SqlParameterSource sqlParameterSource = new MapSqlParameterSource().addValue("tenantId", tenantId);
        return jdbcTemplate.query(sql, sqlParameterSource, ((resultSet, i) ->
            new StaffModel(
                resultSet.getInt("total_main"),
                resultSet.getBigDecimal("revenue"),
                resultSet.getLong("repairman_id"))));
    }
}

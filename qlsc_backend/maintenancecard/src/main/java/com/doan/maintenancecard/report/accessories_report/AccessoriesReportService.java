package com.doan.maintenancecard.report.accessories_report;

import com.doan.maintenancecard.report.staff_report.StaffModel;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccessoriesReportService {

    private final NamedParameterJdbcTemplate jdbcTemplate;

    public List<AccessoriesModel> accessoriesReport(Long tenantId) {
        String sql = "select count(m.product_id) as count_product, sum(m.price) as revenue, m.product_id as product_id, m.product_code as code from maintenance_card_details m where tenant_id = :tenantId group by code";
        SqlParameterSource sqlParameterSource = new MapSqlParameterSource().addValue("tenantId", tenantId);
        return jdbcTemplate.query(sql, sqlParameterSource, ((resultSet, i) ->
            new AccessoriesModel(
                resultSet.getInt("count_product"),
                resultSet.getBigDecimal("revenue"),
                resultSet.getLong("product_id"),
                resultSet.getString("code"))));
    }
}

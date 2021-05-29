package com.doan.maintenancecard.report.maintenance_card_report;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MaintenanceCardReportService {

    private final NamedParameterJdbcTemplate jdbcTemplate;

    public MaintenanceCardReport maintenanceCardReport(String date, Long tenantId) {
        String sql = "select m.created_date as date, count(m.id) as total, count(m.work_status = 2) as success, count(m.work_status != 2) as unfinished,\n" +
            "(select sum(p.money) from payment_histories p where p.tenant_id = :tenantId and date_format(p.created_date,'%d/%m/%Y')  = :date) as revenue\n" +
            "from maintenance_cards m where date_format(m.created_date,'%d/%m/%Y') = :date and m.tenant_id = :tenantId";
        SqlParameterSource sqlParameterSource = new MapSqlParameterSource().addValue("date", date).addValue("tenantId", tenantId);
        return jdbcTemplate.queryForObject(sql, sqlParameterSource, ((resultSet, i) ->
            new MaintenanceCardReport(
                resultSet.getDate("date"),
                resultSet.getInt("total"),
                resultSet.getInt("success"),
                resultSet.getInt("unfinished"),
                resultSet.getBigDecimal("revenue"))));
    }
}

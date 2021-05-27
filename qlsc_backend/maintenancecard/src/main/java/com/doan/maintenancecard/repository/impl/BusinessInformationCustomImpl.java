package com.doan.maintenancecard.repository.impl;

import com.doan.maintenancecard.model.Accessories;
import com.doan.maintenancecard.model.StatisticRepairman;
import com.doan.maintenancecard.model.TotalMoney;
import com.doan.maintenancecard.repository.BusinessInformationCustom;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class BusinessInformationCustomImpl implements BusinessInformationCustom {

    private final NamedParameterJdbcTemplate jdbcTemplate;

    @Override
    public int getTotalMaintenanceCard(String date, Long tenantId) {
        String sql = "SELECT count(id) as total FROM maintenance_cards where DATE_FORMAT(created_date,'%d/%m/%Y') = :date and tenant_id = :tenantId";
        SqlParameterSource sqlParameterSource = new MapSqlParameterSource()
            .addValue("date", date).addValue("tenantId", tenantId);
        return jdbcTemplate.queryForObject(sql, sqlParameterSource, (rs, rowNum) -> {
            return rs.getInt("total");
        });
    }

    @Override
    public int getTotalMaintenanceCardSuccess(String date, Long tenantId) {
        String sql = "SELECT count(id) as total FROM maintenance_cards where DATE_FORMAT(created_date,'%d/%m/%Y') = :date and work_status = 2 and tenant_id = :tenantId";
        SqlParameterSource sqlParameterSource = new MapSqlParameterSource()
            .addValue("date", date).addValue("tenantId", tenantId);
        return jdbcTemplate.queryForObject(sql, sqlParameterSource, (rs, rowNum) -> {
            return rs.getInt("total");
        });
    }

    @Override
    public int getTotalMaintenanceCardIsRepair(String date, Long tenantId) {
        String sql = "SELECT count(id) as total FROM maintenance_cards where DATE_FORMAT(created_date,'%d/%m/%Y') = :date and work_status = 1 and tenant_id = :tenantId";
        SqlParameterSource sqlParameterSource = new MapSqlParameterSource()
            .addValue("date", date).addValue("tenantId", tenantId);
        return jdbcTemplate.queryForObject(sql, sqlParameterSource, (rs, rowNum) -> {
            return rs.getInt("total");
        });
    }

    @Override
    public int getTotalMaintenanceCardSuccessNotPay(String date, Long tenantId) {
        String sql = "SELECT count(id) as 'total' FROM maintenance_cards WHERE DATE_FORMAT(created_date,'%d/%m/%Y') = :date and work_status = 2 and pay_status = 0 and tenant_id = :tenantId";
        SqlParameterSource sqlParameterSource = new MapSqlParameterSource()
            .addValue("date", date).addValue("tenantId", tenantId);
        return jdbcTemplate.queryForObject(sql, sqlParameterSource, (rs, rowNum) -> {
            return rs.getInt("total");
        });
    }

    @Override
    public int getTotalMaintenanceCardSuccessPayed(String date, Long tenantId) {
        String sql = "SELECT count(id) as 'total' FROM maintenance_cards WHERE DATE_FORMAT(created_date,'%d/%m/%Y') = :date and work_status = 2 and pay_status = 1 and tenant_id = :tenantId";
        SqlParameterSource sqlParameterSource = new MapSqlParameterSource()
            .addValue("date", date).addValue("tenantId", tenantId);
        return jdbcTemplate.queryForObject(sql, sqlParameterSource, (rs, rowNum) -> {
            return rs.getInt("total");
        });
    }

    @Override
    public TotalMoney getMoney(String date, Long tenantId) {
        String sql = "SELECT DATE_FORMAT(modified_date,'%d/%m/%Y') as date, SUM(money) as totalMoney FROM payment_histories WHERE DATE_FORMAT(modified_date,'%d/%m/%Y') = :date and tenant_id = :tenantId;";
        SqlParameterSource sqlParameterSource = new MapSqlParameterSource()
            .addValue("date", date).addValue("tenantId", tenantId);
        return jdbcTemplate.queryForObject(sql, sqlParameterSource, ((resultSet, i) ->
            new TotalMoney(
                resultSet.getString("date"),
                resultSet.getBigDecimal("totalMoney")
            )
        ));
    }

    @Override
    public List<StatisticRepairman> getTopService(String from, String to, Long tenantId) {
        String sql = "SELECT m.product_name as name, count(m.id) as numberService FROM maintenance_card_details m \n" +
            "where m.product_type = 2\n" +
            "and m.created_date BETWEEN Date(:from) AND Date(:to) and tenant_id = :tenantId\n" +
            "group by m.product_id \n" +
            "order by numberService desc limit 5; ";
        SqlParameterSource sqlParameterSource = new MapSqlParameterSource().addValue("from", from).addValue("to", to).addValue("tenantId", tenantId);
        return jdbcTemplate.query(sql, sqlParameterSource, ((resultSet, i) ->
            new StatisticRepairman(resultSet.getNString("name"),
                resultSet.getInt("numberService"))));
    }

    @Override
    public List<Accessories> getTopAccessories(String from, String to, Long tenantId) {
        String sql = "SELECT m.product_name as name, m.product_code as code, sum(m.price) as money, " +
            "count(m.id) as numberAccessories FROM maintenance_card_details m \n" +
            "where m.product_type = 1\n" +
            "and m.created_date BETWEEN Date(:from) AND Date(:to) and tenant_id = :tenantId\n" +
            "group by m.product_id \n" +
            "order by numberAccessories desc limit 5; ";
        SqlParameterSource sqlParameterSource = new MapSqlParameterSource().addValue("from", from).addValue("to", to).addValue("tenantId", tenantId);
        return jdbcTemplate.query(sql, sqlParameterSource, ((resultSet, i) ->
            new Accessories(
                resultSet.getNString("name"),
                resultSet.getNString("code"),
                resultSet.getInt("numberAccessories"),
                resultSet.getBigDecimal("money"))));
    }

    @Override
    public List<StatisticRepairman> getTopRepairMan(String from, String to, Long tenantId) {
        String sql = "SELECT m.repairman_name as name, " +
            "(select sum(p.money) from payment_histories as p where p.maintenance_card_id = m.id) as money, " +
            "count(m.repairman_id) as total " +
            "FROM maintenance_cards as m  \n" +
            "where m.work_status = 2\n" +
            "and m.repairman_id != 0\n " +
            "and m.created_date BETWEEN Date(:from) AND Date(:to) and tenant_id = :tenantId\n" +
            "group by m.repairman_id \n" +
            "order by total desc limit 5; ";
        SqlParameterSource sqlParameterSource = new MapSqlParameterSource().addValue("from", from).addValue("to", to).addValue("tenantId", tenantId);
        return jdbcTemplate.query(sql, sqlParameterSource, ((resultSet, i) ->
            new StatisticRepairman(
                resultSet.getNString("name"),
                resultSet.getInt("total"),
                resultSet.getBigDecimal("money"))));
    }

}

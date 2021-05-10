package com.doan.maintenancecard.repository.impl;

import com.doan.maintenancecard.dto.StatisticRepairmanDTO;
import com.doan.maintenancecard.dto.TotalMoneyDTO;
import com.doan.maintenancecard.repository.BusinessInformationCustom;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
    public int getTotalMaintenanceCard(String date) {
        String sql = "SELECT count(id) as total FROM maintenance_cards where DATE_FORMAT(created_date,'%d/%m/%Y') = :date";
        SqlParameterSource sqlParameterSource = new MapSqlParameterSource()
            .addValue("date", date);
        return jdbcTemplate.queryForObject(sql, sqlParameterSource, (rs, rowNum) -> {
            return rs.getInt("total");
        });
    }

    @Override
    public int getTotalMaintenanceCardSuccess(String date) {
        String sql = "SELECT count(id) as total FROM maintenance_cards where DATE_FORMAT(created_date,'%d/%m/%Y') = :date and work_status = 2";
        SqlParameterSource sqlParameterSource = new MapSqlParameterSource()
            .addValue("date", date);
        return jdbcTemplate.queryForObject(sql, sqlParameterSource, (rs, rowNum) -> {
            return rs.getInt("total");
        });
    }

    @Override
    public int getTotalMaintenanceCardSuccessNotPay(String date) {
        String sql = "SELECT count(id) as 'total' FROM maintenance_cards WHERE DATE_FORMAT(created_date,'%d/%m/%Y') = :date and work_status = 2 and pay_status = 0";
        SqlParameterSource sqlParameterSource = new MapSqlParameterSource()
            .addValue("date", date);
        return jdbcTemplate.queryForObject(sql, sqlParameterSource, (rs, rowNum) -> {
            return rs.getInt("total");
        });
    }

    @Override
    public int getTotalMaintenanceCardSuccessPayed(String date) {
        String sql = "SELECT count(id) as 'total' FROM maintenance_cards WHERE DATE_FORMAT(created_date,'%d/%m/%Y') = :date and work_status = 2 and pay_status = 1";
        SqlParameterSource sqlParameterSource = new MapSqlParameterSource()
            .addValue("date", date);
        return jdbcTemplate.queryForObject(sql, sqlParameterSource, (rs, rowNum) -> {
            return rs.getInt("total");
        });
    }

    @Override
    public TotalMoneyDTO getMoneyDto(String date) {
        String sql = "SELECT DATE_FORMAT(modified_date,'%d/%m/%Y') as date_format, SUM(money) as totalMoney FROM payment_histories WHERE DATE_FORMAT(modified_date,'%d/%m/%Y') = :date;";
        SqlParameterSource sqlParameterSource = new MapSqlParameterSource()
            .addValue("date", date);
        return jdbcTemplate.queryForObject(sql, sqlParameterSource, ((resultSet, i) ->
            new TotalMoneyDTO(
                resultSet.getString("date_format"),
                resultSet.getBigDecimal("totalMoney")
            )
        ));
    }

    @Override
    public List<StatisticRepairmanDTO> getTopService(String startDate, String endDate) {
        String sql = "SELECT m.product_name as tendv, count(m.id) as solansddv FROM maintenance_card_details m \n" +
            "where m.product_type = 2\n" +
            "and m.created_date BETWEEN Date(:startDate) AND Date(:endDate)\n" +
            "group by m.product_id \n" +
            "order by solansddv desc limit 5; ";
        SqlParameterSource sqlParameterSource = new MapSqlParameterSource().addValue("startDate", startDate).addValue("endDate", endDate);
        return jdbcTemplate.query(sql, sqlParameterSource, (((resultSet, i) ->
            new StatisticRepairmanDTO(
                resultSet.getNString("tendv"),
                resultSet.getInt("solansddv")
            ))));
    }

    @Override
    public List<StatisticRepairmanDTO> getTopRepairMan(String startDate, String endDate) {
        String sql = "SELECT m.repairman_name as name, count(m.repairman_id) as total FROM maintenance_cards as m  \n" +
            "where m.work_status = 2\n" +
            "and m.repairman_id != 0\n " +
            "and m.created_date BETWEEN Date(:startDate) AND Date(:endDate)\n" +
            "group by m.repairman_id \n" +
            "order by total desc limit 5; ";
        SqlParameterSource sqlParameterSource = new MapSqlParameterSource().addValue("startDate", startDate).addValue("endDate", endDate);
        return jdbcTemplate.query(sql, sqlParameterSource, ((resultSet, i) ->
            new StatisticRepairmanDTO(resultSet.getNString("name"),
                resultSet.getInt("total"))));
    }

}

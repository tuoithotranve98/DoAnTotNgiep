package com.doan.maintenancecard.repository;


import com.doan.maintenancecard.entity.MaintenanceCard;
import com.doan.maintenancecard.entity.MaintenanceCardV1;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Repository
public interface MaintenanceCardRepository extends JpaRepository<MaintenanceCard, Long> {

    @Query(value = "SELECT CONVERT(SUBSTRING(code, 4), UNSIGNED INTEGER ) AS newcode FROM maintenance_cards WHERE code LIKE 'mc00%' ORDER BY newcode DESC LIMIT 1 offset :index", nativeQuery = true)
    String getMaxCode(@Param("index") int index);

    @Query(value = "SELECT count(code) FROM maintenance_cards\n" +
        "where code = :code \n" +
        "and id != :id " +
        ";", nativeQuery = true)
    public int checkCode(@Param("code") String code, @Param("id") Long id);

    @Query("SELECT distinct wc FROM MaintenanceCard wc WHERE wc.code LIKE %?1% " +
        "AND wc.workStatus IN  ?2 " +
        "AND wc.payStatus IN  ?3 " +
        "AND (wc.repairmanEmail = ?4 or wc.coordinatorEmail = ?4 or ?5 = 3) ")
    Page<MaintenanceCard> search(Pageable pageable, String keyWork, byte[] workStatus, byte[] payStatus, String email, int role);

    @Query("SELECT distinct wc FROM MaintenanceCard wc WHERE wc.id = :id " +
        "AND (wc.repairmanEmail = :email or wc.coordinatorEmail = :email or :role = 3) ")
    MaintenanceCard getMaintenanceCardByIdAndEmail(@Param("id") Long id, @Param("email") String email, @Param("role") int role);

    @Query("SELECT distinct wc FROM MaintenanceCard wc WHERE wc.id = :id " +
        "AND (wc.coordinatorEmail = :email) " +
        "and (:role = 1 or :role = 3)")
    MaintenanceCard getMaintenanceCardByIdAndCoordinatorEmail(@Param("id") Long id, @Param("email") String email, @Param("role") int role);

    @Query("SELECT distinct wc FROM MaintenanceCard wc WHERE wc.id = :id " +
        "AND (wc.repairmanEmail = :email) " +
        "and :role = 2")
    MaintenanceCard getMaintenanceCardByIdAndRepairmanEmail(@Param("id") Long id, @Param("email") String email, @Param("role") int role);

    @Query("SELECT m FROM MaintenanceCard  m WHERE m.customerId = ?1 AND m.code LIKE %?2% AND m.payStatus IN  ?3 AND m.workStatus IN ?4")
    Page<MaintenanceCard> getMaintenanceCardByIdCustomer(Pageable pageable, Long id, String keyWork, byte[] payStatus, byte[] workStatus);

    @Query(value = "select m from MaintenanceCard m where (m.repairmanId =:userId or m.coordinatorId =:userId) and m.code like %:code%")
    Page<MaintenanceCard> getMaintenanceCardByRepairMan(Pageable pageable, Long userId, String code);

    @Query(value = "SELECT SUM(money) as totalMoney FROM payment_histories where modified_date BETWEEN ?1 AND ?2", nativeQuery = true)
    BigDecimal getTotalMoney(Date startDate, Date endDate);

    @Query(value = "select sum( price)- sum(money) as sono from maintenance_cards as m\n" +
        " left join payment_histories as p on p.maintenance_card_id  = m.id\n" +
        "where m.modified_date BETWEEN ?1 AND ?2 ;", nativeQuery = true)
    BigDecimal getTotalLiabilities(Date startDate, Date endDate);

    @Query(value = "SELECT COUNT(mc.id) as totalMoney FROM maintenance_cards mc where mc.created_date BETWEEN ?1 AND ?2", nativeQuery = true)
    int getTotalMaintenanceCard(Date startDate, Date endDate);

    @Query(value = "select m from MaintenanceCard m where m.code like %:code% and (m.repairmanId =:userId or m.coordinatorId =:userId) "
        + "AND (m.workStatus  In :workstatus ) " +
        "AND (m.payStatus  In :paystatus  )")
    Page<MaintenanceCard> filterByWsandPs(Pageable pageable, @Param("userId") Long userId, @Param("workstatus") byte[] workstatus, @Param("paystatus") byte[] paystatus, @Param("code") String code);

    @Query(value = "{call maintenance_cards_filter(:_query, :_work_status_ids, :_pay_status_ids, :_from, :_to, :_limit, :_offset)}", nativeQuery = true)
    List<MaintenanceCard> filter(
        @Param("_query") String _query,
        @Param("_work_status_ids") String _work_status_ids,
        @Param("_pay_status_ids") String _pay_status_ids,
        @Param("_from") Date _from,
        @Param("_to") Date _to,
        @Param("_limit") int _limit,
        @Param("_offset") int _offset);

    @Query(value = "{call maintenance_cards_filter_count(:_query, :_work_status_ids, :_pay_status_ids, :_from, :_to)}", nativeQuery = true)
    int filterCount(
        @Param("_query") String _query,
        @Param("_work_status_ids") String _work_status_ids,
        @Param("_pay_status_ids") String _pay_status_ids,
        @Param("_from") Date _from,
        @Param("_to") Date _to);
}

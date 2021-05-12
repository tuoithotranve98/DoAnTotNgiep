package com.doan.maintenancecard.dao.impl;

import com.doan.maintenancecard.dao.CountResult;
import com.doan.maintenancecard.dao.MaintenanceCardsDao;
import com.doan.maintenancecard.entity.MaintenanceCardV1;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Repository;

@Repository
public class MaintenanceCardsDaoImpl extends
    BaseDaoImpl<MaintenanceCardV1> implements MaintenanceCardsDao {
    public MaintenanceCardsDaoImpl() {
        super(MaintenanceCardV1.class);
    }

    @Override
    public List<MaintenanceCardV1> filter(
        int offset, int limit, String query, String payStatusIds, String workStatusIds, Long from, Long to
    ) {
        Map<String, Object> map = filterCountMap(
            query, payStatusIds, workStatusIds, from, to
        );
        map.put("_limit", limit);
        map.put("_offset", offset);
        return querySP("maintenance_cards_filter", map);
    }

    private Map<String, Object> filterCountMap(
        String query, String payStatusIds, String workStatusIds, Long from, Long to
    ) {
        Map<String, Object> map = new HashMap<>();
        map.put("_pay_status_ids", payStatusIds);
        map.put("_work_status_ids", workStatusIds);
        map.put("_query", query);
        map.put("_from", from);
        map.put("_to", to);
        return map;
    }

    @Override
    public int filterCount(
        String query, String payStatusIds, String workStatusIds, Long from, Long to
    ) {
        Map<String, Object> map = filterCountMap(
             query, payStatusIds,  workStatusIds, from, to
        );
        return querySP(
            "maintenance_cards_filter_count", map, CountResult.class
        ).get(0).getCount();
    }
}

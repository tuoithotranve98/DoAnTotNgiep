package com.doan.maintenancecard.dao;


import com.doan.maintenancecard.entity.MaintenanceCardV1;
import java.util.List;

public interface MaintenanceCardsDao extends BaseDao<MaintenanceCardV1> {
    List<MaintenanceCardV1> filter(
        int offset, int size, String query, String payStatusIds, String workStatusIds, Long from, Long to
    );

    int filterCount(
        String query, String payStatusIds, String workStatusIds, Long from, Long to
    );
}

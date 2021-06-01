package com.doan.maintenancecard.model;

import java.util.Set;
import javax.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MaintenanceCardsFilterRequest {
    private static final long serialVersionUID = 1L;

    @Positive(message = "Số Trang >= 1")
    private int page = 1;
    private Integer limit = 10;
    private String query;
    private Set<Integer> workStatus;
    private Set<Integer> payStatus;
    private Long from;
    private Long to;
    private Long tenantId;
    private Long repairmanId;
}

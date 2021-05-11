package com.doan.maintenancecard.model;

import java.io.Serializable;
import java.util.Arrays;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MetadataResponse implements Serializable {
    private static final long serialVersionUID = 1L;
    private static final int DEFAULT_PAGE = 1;
    private static final int DEFAULT_LIMIT = 5;
    private static final List<Integer> LIMITS = Arrays.asList(5, 10, 20, 50, 100, 200, 250);
    private int total;
    private int page = 1;
    private int limit = 50;
}

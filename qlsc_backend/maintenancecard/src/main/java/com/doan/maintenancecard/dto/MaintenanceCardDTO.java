package com.doan.maintenancecard.dto;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MaintenanceCardDTO extends BaseDTO {

    private String code;
    private String platesNumber;
    private CustomerDTO customer;
    private UserDTO repairman;
    private UserDTO coordinator;
    private String description;
    private Date returnDate;
    private BigDecimal price;
    private byte workStatus;
    private byte payStatus;
    private String model;
    private String color;
    private Date expectedReturnDate;
    private List<MaintenanceCardDetailDTO> maintenanceCardDetails;
    private List<PaymentHistoryDTO> paymentHistories;
    private List<MaintenanceCardDetailStatusHistoryDTO> maintenanceCardDetailStatusHistories;
}

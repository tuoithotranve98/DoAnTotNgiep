package com.doan.user.entity;

import com.doan.user.dto.CustomerDTO;
import com.doan.user.dto.MaintenanceCardDetailDTO;
import com.doan.user.dto.MaintenanceCardDetailStatusHistoryDTO;
import com.doan.user.dto.PaymentHistoryDTO;
import com.doan.user.dto.UserDTO;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MaintenanceCard extends BaseEntity {
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

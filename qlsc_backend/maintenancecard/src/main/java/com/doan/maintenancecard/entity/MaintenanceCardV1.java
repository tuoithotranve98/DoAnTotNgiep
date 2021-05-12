package com.doan.maintenancecard.entity;

import java.math.BigDecimal;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(
    name = "maintenance_cards"
)
public class MaintenanceCardV1 extends com.doan.maintenancecard.dao.Entity {
    @Id
    private int id;

    @Column(name = "code", nullable = false, length = 11, unique = true)
    private String code;

    @Column(name = "plates_number", nullable = false, length = 11)
    private String platesNumber;

    @Column(name = "customer_id")
    private long customerId;

    @Column(name = "customer_name")
    private String customerName;

    @Column(name = "customer_phone")
    private String customerPhone;

    @Column(name = "repairman_id")
    private long repairmanId;

    @Column(name = "repairman_name")
    private String repairmanName;

    @Column(name = "repairman_email")
    private String repairmanEmail;

    @Column(name = "coordinator_id")
    private long coordinatorId;

    @Column(name = "coordinator_name")
    private String coordinatorName;

//    @Column(name = "coordinator_email")
    private String coordinatorEmail;

    @Column(name = "description", columnDefinition = "text(5000)")
    private String description;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "return_date", length = 19)
    private Date returnDate;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "work_status")
    private byte workStatus;

    @Column(name = "pay_status")
    private byte payStatus;

    @Column(name = "model", length = 50)
    private String model;

    @Column(name = "color", length = 50)
    private String color;

    @Column(name = "modified_date")
    private Date modifiedDate;

    @Column(name = "modified_date")
    private Date createdDate;

    @Column(name = "expected_return_date")
    private Date expectedReturnDate;
}

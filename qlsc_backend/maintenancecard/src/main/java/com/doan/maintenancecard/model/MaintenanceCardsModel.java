package com.doan.maintenancecard.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class MaintenanceCardsModel implements Serializable {
    private static final long serialVersionUID = 1L;

    private int id;
    private String code;
    private String color;

    @JsonProperty("coordinator_email")
    private String coordinatorEmail;

    @JsonProperty("coordinator_id")
    private long coordinatorId;

    @JsonProperty("coordinator_name")
    private String coordinatorName;

    @JsonProperty("customer_id")
    private long customerId;

    @JsonProperty("customer_name")
    private String customerName;

    @JsonProperty("customer_phone")
    private String customerPhone;

    private String description;

    @JsonProperty("expected_return_date")
    private Date expectedReturnDate;

    private String model;

    @JsonProperty("pay_status")
    private byte payStatus;

    @JsonProperty("plates_number")
    private String platesNumber;

    private BigDecimal price;

    @JsonProperty("repairman_email")
    private String repairmanEmail;

    @JsonProperty("return_date")
    private Date returnDate;

    @JsonProperty("work_status")
    private byte workStatus;

    @JsonProperty("modified_date")
    private Date modifiedDate;

    @JsonProperty("modified_date")
    private Date createdDate;

}

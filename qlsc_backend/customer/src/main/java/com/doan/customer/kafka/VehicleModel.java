package com.doan.customer.kafka;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class VehicleModel {

    private String color;
    private String model;
    @JsonProperty("plate_number")
    private String plateNumber;
    @JsonProperty("customer_id")
    private Long customerId;
    @JsonProperty("tenant_id")
    private Long tenantId;

}

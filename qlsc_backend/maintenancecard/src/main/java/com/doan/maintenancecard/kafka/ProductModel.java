package com.doan.maintenancecard.kafka;

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
public class ProductModel {

    @JsonProperty("amount")
    private int amount;
    @JsonProperty("code")
    private String code;
    @JsonProperty("status")
    private int status;

}

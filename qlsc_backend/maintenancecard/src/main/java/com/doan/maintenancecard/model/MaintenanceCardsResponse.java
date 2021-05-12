package com.doan.maintenancecard.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class MaintenanceCardsResponse implements Serializable {
    private static final long serialVersionUID = 1L;

    private MetadataResponse metadata = new MetadataResponse();

    @JsonProperty("maintenance_cards")
    private List<MaintenanceCardsModel> maintenanceCardsModels = new ArrayList<>();
}

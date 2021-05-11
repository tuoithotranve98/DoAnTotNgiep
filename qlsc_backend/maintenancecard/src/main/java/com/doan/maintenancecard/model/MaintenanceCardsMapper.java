package com.doan.maintenancecard.model;

import com.doan.maintenancecard.entity.MaintenanceCardV1;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class MaintenanceCardsMapper {
    public List<MaintenanceCardsModel> getMaintenanceCardsModels(
        List<MaintenanceCardV1> maintenanceCardsModels
    ) {
        return maintenanceCardsModels.stream()
            .filter(Objects::nonNull)
            .map(this::getMaintenanceCardsModel).collect(Collectors.toList());
    }

    public MaintenanceCardsModel getMaintenanceCardsModel(
        MaintenanceCardV1 maintenanceCardV1
    ) {
        MaintenanceCardsModel maintenanceCardsModel = new MaintenanceCardsModel();
        maintenanceCardsModel.setId(maintenanceCardV1.getId());
        maintenanceCardsModel.setCode(maintenanceCardV1.getCode());
        maintenanceCardsModel.setColor(maintenanceCardV1.getColor());
        maintenanceCardsModel.setCoordinatorEmail(maintenanceCardV1.getCoordinatorEmail());
        maintenanceCardsModel.setCoordinatorId(maintenanceCardV1.getCoordinatorId());
        maintenanceCardsModel.setCoordinatorName(maintenanceCardV1.getCoordinatorName());
        maintenanceCardsModel.setCustomerId(maintenanceCardV1.getCustomerId());
        maintenanceCardsModel.setCustomerName(maintenanceCardV1.getCustomerName());
        maintenanceCardsModel.setCustomerPhone(maintenanceCardV1.getCustomerPhone());
        maintenanceCardsModel.setDescription(maintenanceCardV1.getDescription());
        maintenanceCardsModel.setExpectedReturnDate(maintenanceCardV1.getExpectedReturnDate());
        maintenanceCardsModel.setModel(maintenanceCardV1.getModel());
        maintenanceCardsModel.setPayStatus(maintenanceCardV1.getPayStatus());
        maintenanceCardsModel.setPlatesNumber(maintenanceCardV1.getPlatesNumber());
        maintenanceCardsModel.setPrice(maintenanceCardV1.getPrice());
        maintenanceCardsModel.setRepairmanEmail(maintenanceCardV1.getRepairmanEmail());
        maintenanceCardsModel.setReturnDate(maintenanceCardV1.getReturnDate());
        maintenanceCardsModel.setWorkStatus(maintenanceCardV1.getWorkStatus());
        maintenanceCardsModel.setModifiedDate(maintenanceCardV1.getModifiedDate());
        maintenanceCardsModel.setCreatedDate(maintenanceCardV1.getCreatedDate());

        return maintenanceCardsModel;
    }
}

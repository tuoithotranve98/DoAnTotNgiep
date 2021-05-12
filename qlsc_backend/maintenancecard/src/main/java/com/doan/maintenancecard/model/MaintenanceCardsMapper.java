package com.doan.maintenancecard.model;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import com.doan.maintenancecard.entity.MaintenanceCard;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class MaintenanceCardsMapper {
    public List<MaintenanceCardsModel> getMaintenanceCardsModels(
        List<MaintenanceCard> maintenanceCardsModels
    ) {
        return maintenanceCardsModels.stream()
            .filter(Objects::nonNull)
            .map(this::getMaintenanceCardsModel).collect(Collectors.toList());
    }

    public MaintenanceCardsModel getMaintenanceCardsModel(MaintenanceCard maintenanceCard) {
        MaintenanceCardsModel maintenanceCardsModel = new MaintenanceCardsModel();
        maintenanceCardsModel.setId(Math.toIntExact(maintenanceCard.getId()));
        maintenanceCardsModel.setCode(maintenanceCard.getCode());
        maintenanceCardsModel.setColor(maintenanceCard.getColor());
        maintenanceCardsModel.setCoordinatorEmail(maintenanceCard.getCoordinatorEmail());
        maintenanceCardsModel.setCoordinatorId(maintenanceCard.getCoordinatorId());
        maintenanceCardsModel.setCoordinatorName(maintenanceCard.getCoordinatorName());
        maintenanceCardsModel.setCustomerId(maintenanceCard.getCustomerId());
        maintenanceCardsModel.setCustomerName(maintenanceCard.getCustomerName());
        maintenanceCardsModel.setCustomerPhone(maintenanceCard.getCustomerPhone());
        maintenanceCardsModel.setDescription(maintenanceCard.getDescription());
        maintenanceCardsModel.setExpectedReturnDate(maintenanceCard.getExpectedReturnDate());
        maintenanceCardsModel.setModel(maintenanceCard.getModel());
        maintenanceCardsModel.setPayStatus(maintenanceCard.getPayStatus());
        maintenanceCardsModel.setPlatesNumber(maintenanceCard.getPlatesNumber());
        maintenanceCardsModel.setPrice(maintenanceCard.getPrice());
        maintenanceCardsModel.setRepairmanEmail(maintenanceCard.getRepairmanEmail());
        maintenanceCardsModel.setReturnDate(maintenanceCard.getReturnDate());
        maintenanceCardsModel.setWorkStatus(maintenanceCard.getWorkStatus());
        maintenanceCardsModel.setModifiedDate(maintenanceCard.getModifiedDate());
        maintenanceCardsModel.setCreatedDate(maintenanceCard.getCreatedDate());

        return maintenanceCardsModel;
    }
}

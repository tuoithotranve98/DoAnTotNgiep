package com.doan.maintenancecard.service;

import com.doan.maintenancecard.dto.MaintenanceCardDTO;
import com.doan.maintenancecard.entity.MaintenanceCardV1;
import com.doan.maintenancecard.exception.CodeExistedException;
import com.doan.maintenancecard.exception.commonException.NotFoundException;
import com.doan.maintenancecard.exception.commonException.UnknownException;
import com.doan.maintenancecard.exception.maintenanceCardException.NotEnoughProductException;
import com.doan.maintenancecard.exception.maintenanceCardException.NotFoundRepairmanException;
import com.doan.maintenancecard.exception.maintenanceCardException.NotUpdateException;
import com.doan.maintenancecard.model.MaintenanceCardCustomer;
import com.doan.maintenancecard.model.MaintenanceCardFilter;
import com.doan.maintenancecard.model.MaintenanceCardUser;
import com.doan.maintenancecard.model.MaintenanceCardsFilterRequest;
import com.doan.maintenancecard.model.MaintenanceCardsResponse;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.List;
import java.util.Map;

public interface MaintenanceCardService {

    MaintenanceCardDTO insertMaintenanceCard(MaintenanceCardDTO maintenanceCardDTO, String tenantId) throws NotEnoughProductException, CodeExistedException, JsonProcessingException;

    Map<String, Object> searchMaintenanceCard(MaintenanceCardFilter maintenanceCardFilter, String email, int role);

    MaintenanceCardDTO getMaintenanceCardById(Long id, String email, int role) throws NotFoundException;

    MaintenanceCardDTO updateMaintenanceCard(MaintenanceCardDTO maintenanceCardDTO, String email, int role) throws NotEnoughProductException, NotFoundException, CodeExistedException, NotUpdateException, UnknownException, JsonProcessingException;

    Map<String, Object> getMaintenanceCardByIdCustomer(
        MaintenanceCardCustomer maintenanceCardCustomer);

    MaintenanceCardDTO updateAllStatusMaintenanceCard(Long id, String email, int role) throws NotFoundException, NotFoundRepairmanException, JsonProcessingException;

    boolean deleteMaintenanceCard(Long id) throws NotFoundException, NotFoundRepairmanException, NotEnoughProductException, UnknownException, JsonProcessingException;

    Map<String, Object> getMaintenanceCardByRepairMan(MaintenanceCardUser maintenanceCardUser);

    MaintenanceCardDTO setReturnDate(long id);

    // update mơi ekko
    MaintenanceCardsResponse getMaintenanceCard(MaintenanceCardsFilterRequest maintenanceCardsFilterRequest);
}

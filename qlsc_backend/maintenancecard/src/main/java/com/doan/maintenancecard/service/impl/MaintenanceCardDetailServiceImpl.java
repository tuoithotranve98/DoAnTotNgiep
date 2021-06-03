package com.doan.maintenancecard.service.impl;

import com.doan.maintenancecard.converter.MaintenanceCardConverter;
import com.doan.maintenancecard.dto.MaintenanceCardDTO;
import com.doan.maintenancecard.entity.MaintenanceCard;
import com.doan.maintenancecard.entity.MaintenanceCardDetail;
import com.doan.maintenancecard.entity.MaintenanceCardDetailStatusHistory;
import com.doan.maintenancecard.exception.commonException.NotFoundException;
import com.doan.maintenancecard.exception.maintenanceCardException.NotFoundRepairmanException;
import com.doan.maintenancecard.kafka.SendMessage;
import com.doan.maintenancecard.kafka.SendToClient;
import com.doan.maintenancecard.repository.MaintenanceCardDetailRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.doan.maintenancecard.service.MaintenanceCardDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
public class MaintenanceCardDetailServiceImpl implements MaintenanceCardDetailService {

    private final MaintenanceCardDetailRepository maintenanceCardDetailRepository;
    private final MaintenanceCardConverter maintenanceCardConverter;
    private final SendMessage sendMessage;
    private final SendToClient sendToClient;

    @Override
    public MaintenanceCardDTO updateStatusMaintenanceCardDetail(Long id, String email) throws NotFoundException, NotFoundRepairmanException, JsonProcessingException {
        // kiểm tra chi tiết phiếu có tồn tại hay không
        MaintenanceCardDetail maintenanceCardDetail = maintenanceCardDetailRepository.findById(id).orElse(null);
        if (maintenanceCardDetail == null) {
            throw new NotFoundException("Phiếu không tồn tại!");
        }
        MaintenanceCard maintenanceCard = maintenanceCardDetail.getMaintenanceCard();
        if (maintenanceCard.getRepairmanEmail() == null || !maintenanceCard.getRepairmanEmail().equals(email)) {
            throw new NotFoundException("Không tìm thấy chi tiết phiếu");
        }
        byte status = 1;
        boolean checkToSetWorkStatus = true;
        if (maintenanceCard.getRepairmanEmail() != null) {
            // kiểm tra trạng thái chi tiết phiếu
            // nếu trạng thái là chưa hoàn thành thì cập nhật
            if (maintenanceCardDetail.getStatus() < 2) {
                maintenanceCardDetail.setStatus((byte) (maintenanceCardDetail.getStatus() + 1));
                MaintenanceCardDetailStatusHistory maintenanceCardDetailStatusHistory = new MaintenanceCardDetailStatusHistory();
                maintenanceCardDetailStatusHistory.setCreatedDate(new Date());
                maintenanceCardDetailStatusHistory.setModifiedDate(new Date());
                maintenanceCardDetailStatusHistory.setMaintenanceCardDetail(maintenanceCardDetail);
                maintenanceCardDetailStatusHistory.setStatus(maintenanceCardDetail.getStatus());
                maintenanceCardDetail.getMaintenanceCardDetailStatusHistories().add(maintenanceCardDetailStatusHistory);
                if (maintenanceCardDetail.getStatus() != 2) {
                    checkToSetWorkStatus = false;
                }
            }
            // kiểm tra tất cả chi tiết phiếu
            // phiếu khác với phiếu hiện tại
            // và status khác 2
            // check = true
            for (MaintenanceCardDetail mainCardDetail : maintenanceCard.getMaintenanceCardDetails()) {
                if (!mainCardDetail.getId().equals(maintenanceCardDetail.getId())
                    && mainCardDetail.getStatus() != 2) {
                    checkToSetWorkStatus = false;
                    break;
                }
            }

            if (checkToSetWorkStatus) {
                maintenanceCard.setWorkStatus((byte) 2);
                // giảm số phiếu đang nhận của nhân viên
                CompletableFuture.runAsync(() -> sendMessage.sendToUser(String.valueOf(maintenanceCard.getRepairmanId()), "-1"));
            } else {
                maintenanceCard.setWorkStatus(status);
            }

            MaintenanceCardDetail newMaintenanceCardDetail = maintenanceCardDetailRepository.save(maintenanceCardDetail);
            MaintenanceCard newMaintenanceCard = newMaintenanceCardDetail.getMaintenanceCard();
            if (newMaintenanceCard.getWorkStatus() == 2 && newMaintenanceCard.getPayStatus() == 0) {
                CompletableFuture.runAsync(() -> sendToClient.sendNotificationToClient(newMaintenanceCard, 2, email));
            } else {
                CompletableFuture.runAsync(() -> sendToClient.sendNotificationToClient(newMaintenanceCard, 3, email));
            }
            // send notification to client

            return maintenanceCardConverter.convertAllToDTO(newMaintenanceCard);
        } else if (maintenanceCard.getRepairmanId() != 0) {
            throw new NotFoundException("Không tìm thấy chi tiết phiếu");
        } else {
            throw new NotFoundRepairmanException("Không tìm thấy nhân viên");
        }
    }
}

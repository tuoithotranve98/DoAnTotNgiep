package com.doan.user.kafka;

import com.doan.user.dto.MaintenanceCardsModel;
import com.doan.user.entity.Message;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageTmp extends Message {
    private MaintenanceCardsModel maintenanceCard;
}

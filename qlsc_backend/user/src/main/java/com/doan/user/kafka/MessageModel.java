package com.doan.user.kafka;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageModel {

    private String maintenanceCard;
    private String maintenanceCardCode;
    private String author;
    private int type;
    private String repairmanEmail;
    private String coordinatorEmail;

}

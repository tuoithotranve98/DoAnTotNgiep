package com.doan.maintenancecard.controller;

import com.doan.maintenancecard.dto.BusinessInformationDTO;
import com.doan.maintenancecard.dto.StatisticRepairmanDTO;
import com.doan.maintenancecard.dto.TotalMoneyDTO;
import com.doan.maintenancecard.service.BusinessInformationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("admin")
@RequiredArgsConstructor
public class BusinessInformationController {

    private final BusinessInformationService businessInformationService;
    private static final String DATE_FORMAT = "dd/MM/yyyy";
    @GetMapping("totals")
    public ResponseEntity<BusinessInformationDTO> getTotals(
        @RequestParam(name = "startDate", defaultValue = "") String startDate,
        @RequestParam(name = "endDate", defaultValue = "") String endDate) throws ParseException {
        BusinessInformationDTO businessInformationDTO = new BusinessInformationDTO();
        businessInformationDTO.setTotalMaintenanceCard(businessInformationService.getTotalMaintenanceCard());
        businessInformationDTO.setTotalMaintenanceCardSuccess(businessInformationService.getTotalMaintenanceCardSuccess());
        businessInformationDTO.setTotalMoney(businessInformationService.getTotalMoney(startDate, endDate));
        businessInformationDTO.setTotalMaintenanceCards(businessInformationService.getTotalMaintenanceCards(startDate, endDate));
        businessInformationDTO.setTotalMaintenanceCardScNotPay(businessInformationService.getTotalMaintenanceCardSuccessNotPay());
        businessInformationDTO.setTotalMaintenanceCardScPayed(businessInformationService.getTotalMaintenanceCardSuccessPayed());
        businessInformationDTO.setTotalLiabilities((businessInformationService.getTotalLiabilities(startDate, endDate)));
        return new ResponseEntity<>(businessInformationDTO, HttpStatus.OK);
    }

    @GetMapping("totalDayMoneys")
    public ResponseEntity<List<TotalMoneyDTO>> getTotalDayMoney(
        @RequestParam(name = "startDate", defaultValue = "") String startDate,
        @RequestParam(name = "endDate", defaultValue = "") String endDate) {
        List<TotalMoneyDTO> moneyDTOList = businessInformationService.getAllTotalMoney(startDate, endDate);
        return new ResponseEntity<>(moneyDTOList, HttpStatus.OK);
    }

    @GetMapping("topServices")
    public ResponseEntity<List<StatisticRepairmanDTO>> getTopService(
        @RequestParam(name = "startDate", defaultValue = "") String startDate,
        @RequestParam(name = "endDate", defaultValue = "") String endDate) throws ParseException {
        Date sDate = new SimpleDateFormat().parse(startDate);
        Date eDate = new SimpleDateFormat(DATE_FORMAT).parse(endDate);
        List<StatisticRepairmanDTO> statisticRepairmanDTOS = businessInformationService.getTopService(sDate, eDate);
        return new ResponseEntity<>(statisticRepairmanDTOS, HttpStatus.OK);
    }

    //
    @GetMapping("top_repair_mans")
    public ResponseEntity<List<StatisticRepairmanDTO>> getTopRepairman(
        @RequestParam(name = "from", defaultValue = "") String from,
        @RequestParam(name = "to", defaultValue = "") String to) throws ParseException {
        Date sDate = new SimpleDateFormat(DATE_FORMAT).parse(from);
        Date eDate = new SimpleDateFormat(DATE_FORMAT).parse(to);
        List<StatisticRepairmanDTO> statisticRepairmanDTOS = businessInformationService.getTopRepairman(sDate, eDate);
        return new ResponseEntity<>(statisticRepairmanDTOS, HttpStatus.OK);
    }

    @GetMapping("test")
    public String testApi() {
        return "Success";
    }

}

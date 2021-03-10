package com.doan.customer.controller;

import com.doan.customer.dto.main.DistrictDTO;
import com.doan.customer.dto.main.WardDTO;
import com.doan.customer.service.DistrictService;
import com.doan.customer.service.WardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/")
@RequiredArgsConstructor
public class AddressController {

    private final DistrictService districtService;
    private final WardService wardService;

    @GetMapping("/provinces")
    public ResponseEntity<List<DistrictDTO>> getAllPro() {
        List<DistrictDTO> districts = districtService.getDistricts();
        return ResponseEntity.ok(districts);
    }

    @GetMapping("/wards/{code}")
    public ResponseEntity<List<WardDTO>> getWardsOfDistrict(
            @PathVariable("code") String code) {
        List<WardDTO> wards = wardService.getWardOfDistrict(code);
        return ResponseEntity.ok(wards);
    }
}

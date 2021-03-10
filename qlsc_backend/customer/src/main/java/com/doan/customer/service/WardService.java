package com.doan.customer.service;

import com.doan.customer.dto.main.WardDTO;

import java.util.List;

public interface WardService {

    List<WardDTO> getWardOfDistrict(String district);
}

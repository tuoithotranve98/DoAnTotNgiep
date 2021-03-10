package com.nk.customer.service;

import com.nk.customer.dto.main.WardDTO;
import org.springframework.stereotype.Service;

import java.util.List;

public interface WardService {

    List<WardDTO> getWardOfDistrict(String district);
}

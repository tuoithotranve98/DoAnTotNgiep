package com.doan.customer.controller;

import com.doan.customer.common.Const;
import com.doan.customer.dto.main.DistrictDTO;
import com.doan.customer.dto.main.WardDTO;
import com.doan.customer.entity.main.District;
import com.doan.customer.entity.main.Province;
import com.doan.customer.entity.main.Ward;
import com.doan.customer.repository.DistrictRepository;
import com.doan.customer.repository.ProvinceRepository;
import com.doan.customer.repository.WardRepository;
import com.doan.customer.service.DistrictService;
import com.doan.customer.service.WardService;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import lombok.RequiredArgsConstructor;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.lang.reflect.Array;
import java.util.*;

@RestController
@CrossOrigin
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AddressController {

    private final DistrictService districtService;
    private final WardService wardService;
    private final WardRepository wardRepository;
    private final DistrictRepository districtRepository;
    private final ProvinceRepository provinceRepository;

    @GetMapping("provinces")
    public ResponseEntity<List<DistrictDTO>> getProvinces() {
        List<DistrictDTO> districts = districtService.getDistricts();
        return ResponseEntity.ok(districts);
    }

    @GetMapping("wards")
    public ResponseEntity<List<WardDTO>> getWardsOfDistrict(
        @RequestParam("districtId") String districtId) {
        List<WardDTO> wards = wardService.getWardOfDistrict(districtId);
        return ResponseEntity.ok(wards);
    }

    @PostMapping("insert_by_csv")
    public Map insert() {
        String provinces = "E:\\DoAn2\\DoAnTotNgiep\\qlsc_backend\\data\\provinces.csv";
        String wards = "E:\\DoAn2\\DoAnTotNgiep\\qlsc_backend\\data\\wards.csv";
        String districts = "E:\\DoAn2\\DoAnTotNgiep\\qlsc_backend\\data\\districts.csv";
        try {
            List<String> dataProvinces = processFileCsv(provinces);
            List<String> dataDistricts = processFileCsv(districts);
            List<String> dataWards = processFileCsv(wards);
            processSaveData(dataProvinces);
            processSaveData(dataDistricts);
            processSaveData(dataWards);
            return Map.of("success", Boolean.TRUE);
        } catch (Exception e) {
            return Map.of("success", Boolean.FALSE);
        }
    }

    private List<String> processFileCsv(String fileName) throws IOException {
        try (CSVReader reader = new CSVReader(new FileReader(fileName))) {
            List<String[]> r = reader.readAll();
            List<String> data = new ArrayList<>();
            r.forEach(x -> data.add(Arrays.toString(x)));
            return data;
        } catch (CsvException e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    private void processSaveData(List<String> dataSave) {
        if (CollectionUtils.isNotEmpty(dataSave)) {
            if (dataSave.get(0).contains("code_province")
                && !dataSave.get(0).contains("code_district")) {
                saveDataByType(dataSave, Const.PROVINCE);
            }
            if (dataSave.get(0).contains("code_district")
                && dataSave.get(0).contains("code_province")) {
                saveDataByType(dataSave, Const.DISTRICT);
            }
            if (dataSave.get(0).contains("code_ward")
                && dataSave.get(0).contains("code_province")) {
                saveDataByType(dataSave, Const.WARD);
            }
        }
    }

    private void saveDataByType(List<String> dataSave, String type) {
        switch (type) {
            case Const.PROVINCE:
                dataSave.forEach(data -> {
                    if (!data.contains("code_province")) {
                        Province province = new Province();
                        province.setCode(data.substring(1, data.indexOf(";") - 1));
                        province.setName(data.substring(data.indexOf(";") + 2, data.indexOf("]")));
                        provinceRepository.save(province);
                    }
                });
                break;
            case Const.DISTRICT:
                dataSave.forEach(data -> {
                    if (!data.contains("code_province")) {
                        District district = new District();
                        district.setCode(data.substring(1, data.indexOf(";") - 1));
                        district.setName(data.substring(data.indexOf(";") + 2, data.lastIndexOf(";") - 1));
                        Province province = new Province();
                        province.setCode(data.substring(data.lastIndexOf(";") + 2, data.indexOf("]")));
                        district.setProvince(province);
                        districtRepository.save(district);
                    }
                });
                break;
            case Const.WARD:
                dataSave.forEach(data -> {
                    if (!data.contains("code_ward")) {
                        Ward ward = new Ward();
                        ward.setCode(data.substring(1, data.indexOf(";") - 1));
                        ward.setName(data.substring(data.indexOf(";") + 2, data.lastIndexOf(";") - 1));
                        District district = new District();
                        district.setCode(data.substring(data.lastIndexOf(";") + 2, data.indexOf("]")));
                        ward.setDistrict(district);
                        wardRepository.save(ward);
                    }
                });
                break;
            default:
                break;
        }
    }

}


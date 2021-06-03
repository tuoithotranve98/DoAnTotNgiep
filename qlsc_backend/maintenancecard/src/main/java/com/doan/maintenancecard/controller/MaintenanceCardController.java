package com.doan.maintenancecard.controller;

import com.doan.maintenancecard.model.MaintenanceCardUser;
import com.doan.maintenancecard.model.MaintenanceCardsFilterRequest;
import com.doan.maintenancecard.model.MaintenanceCardsResponse;
import com.doan.maintenancecard.security.AppAuthHelper;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.doan.maintenancecard.dto.MaintenanceCardDTO;
import com.doan.maintenancecard.exception.CodeExistedException;
import com.doan.maintenancecard.exception.commonException.NotFoundException;
import com.doan.maintenancecard.exception.maintenanceCardException.NotEnoughProductException;
import com.doan.maintenancecard.exception.maintenanceCardException.NotFoundRepairmanException;
import com.doan.maintenancecard.exception.maintenanceCardException.NotUpdateException;
import com.doan.maintenancecard.model.MaintenanceCardCustomer;
import com.doan.maintenancecard.model.MaintenanceCardFilter;
import com.doan.maintenancecard.service.MaintenanceCardDetailService;
import com.doan.maintenancecard.service.MaintenanceCardService;

import javax.validation.Valid;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/")
public class MaintenanceCardController {

    private final MaintenanceCardService maintenanceCardService;
    private final MaintenanceCardDetailService maintenanceCardDetailService;
    private final AppAuthHelper appAuthHelper;
    private static final String SPACE = "_";

    // Thêm mới phiếu
    // Kiem tra quyen: NV dieu phoi
    @PostMapping("maintenanceCards")
    public ResponseEntity<MaintenanceCardDTO> insertMaintenanceCard(@RequestBody MaintenanceCardDTO maintenanceCardDTO) throws NotEnoughProductException, CodeExistedException, JsonProcessingException {
        String tenantId = appAuthHelper.httpCredential().getTenantId();
        MaintenanceCardDTO newMaintenanceCard = maintenanceCardService.insertMaintenanceCard(maintenanceCardDTO, tenantId);
        return new ResponseEntity<>(newMaintenanceCard, HttpStatus.OK);
    }

    // Lấy danh sách phiếu v1
    // NV quan li, NV dieu phoi, NV sua chua
    @GetMapping("maintenanceCards")
    public ResponseEntity<Map<String, Object>> searchMaintenanceCard(@ModelAttribute("maintenanceCardFilter") MaintenanceCardFilter maintenanceCardFilter) {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        List<String> roles = authentication.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority).collect(Collectors.toList());
        String tenantId = appAuthHelper.httpCredential().getTenantId();
        Map<String, Object> allMaintenanceCard = maintenanceCardService.searchMaintenanceCard(maintenanceCardFilter, authentication.getName(), Integer.parseInt(roles.get(0).split("_")[1]), tenantId);
        return new ResponseEntity<>(allMaintenanceCard, HttpStatus.OK);
    }

    // Chi tiết phiếu theo id phiếu
    // NV quan li, NV dieu phoi, NV sua chua
    @GetMapping("maintenanceCards/{id}")
    public ResponseEntity<MaintenanceCardDTO> getMaintenanceCardById(@PathVariable Long id) throws NotFoundException {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        List<String> roles = authentication.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority).collect(Collectors.toList());
        MaintenanceCardDTO maintenanceCardDTO = maintenanceCardService.getMaintenanceCardById(id, authentication.getName(), Integer.parseInt(roles.get(0).split("_")[1]));
        return new ResponseEntity<>(maintenanceCardDTO, HttpStatus.OK);
    }

    // cập nhật phiếu
    // NV dieu phoi
    @PutMapping("maintenanceCards/{id}")
    public ResponseEntity<MaintenanceCardDTO> updateMaintenanceCard(@RequestBody MaintenanceCardDTO maintenanceCardDTO, @PathVariable Long id) throws NotEnoughProductException, NotFoundException, CodeExistedException, NotUpdateException, JsonProcessingException {
        maintenanceCardDTO.setId(id);
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        List<String> roles = authentication.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority).collect(Collectors.toList());
        MaintenanceCardDTO newMaintenanceCard = maintenanceCardService.updateMaintenanceCard(maintenanceCardDTO, authentication.getName(), Integer.parseInt(roles.get(0).split("_")[1]));
        return new ResponseEntity<>(newMaintenanceCard, HttpStatus.OK);
    }

    // Lấy danh sách phiếu theo id khách hàng
    // Lấy danh sách phiếu cho 1 khách hàng
    @GetMapping("maintenanceCards/customer")
    public ResponseEntity<Map<String, Object>> getMaintenanceCardsByIdCustomer(@ModelAttribute("maintenanceCardCustomer") MaintenanceCardCustomer maintenanceCardCustomer) {
        Map<String, Object> allMaintenanceCards = maintenanceCardService.getMaintenanceCardByIdCustomer(maintenanceCardCustomer);
        return new ResponseEntity<>(allMaintenanceCards, HttpStatus.OK);
    }

    // Cập nhật trạng thái phiếu
    // Một phiếu
    // Kiem tra quyen : NV sua chua
    @PutMapping("maintenanceCards/workStatus/{id}")
    public ResponseEntity<MaintenanceCardDTO> updateWorkStatusMaintenanceCard(@PathVariable Long id) throws NotFoundException, NotFoundRepairmanException, JsonProcessingException {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        List<String> roles = authentication.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority).collect(Collectors.toList());
        MaintenanceCardDTO maintenanceCardDTO = maintenanceCardService.updateAllStatusMaintenanceCard(id, authentication.getName(), Integer.parseInt(roles.get(0).split("_")[1]));
        return new ResponseEntity<>(maintenanceCardDTO, HttpStatus.OK);
    }

    // Cập nhật trạng thái phiếu
    // Nhiều phiếu
    // Kiem tra quyen : NV sua chua
    @PutMapping(path = "maintenanceCards/workStatus", consumes = MediaType.ALL_VALUE)
    public ResponseEntity<List<MaintenanceCardDTO>> updateMultiAllWorkStatusMaintenanceCard(@RequestBody Long[] ids) throws NotFoundException, NotFoundRepairmanException, JsonProcessingException {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        List<String> roles = authentication.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority).collect(Collectors.toList());
        List<MaintenanceCardDTO> maintenanceCardDTOs = new ArrayList<>();
        for (Long id : ids) {
            MaintenanceCardDTO maintenanceCardDTO = maintenanceCardService.updateAllStatusMaintenanceCard(id, authentication.getName(), Integer.parseInt(roles.get(0).split("_")[1]));
            maintenanceCardDTOs.add(maintenanceCardDTO);
        }
        return new ResponseEntity<>(maintenanceCardDTOs, HttpStatus.OK);
    }

    // Cập nhật trạng thái của chi tiết phiếu
    // Một chi tiết phiếu
    // Kiem tra quyen : NV sua chua
    @PutMapping("maintenanceCardDetails/status/{id}")
    public ResponseEntity<MaintenanceCardDTO> updateStatusMaintenanceCardDetail(@PathVariable Long id) throws NotFoundException, NotFoundRepairmanException, JsonProcessingException {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        MaintenanceCardDTO maintenanceCardDTO = maintenanceCardDetailService.updateStatusMaintenanceCardDetail(id, authentication.getName());
        return new ResponseEntity<>(maintenanceCardDTO, HttpStatus.OK);
    }

    // Xóa phiếu
    // Một phiếu
    @DeleteMapping("maintenanceCards/deletes")
    public ResponseEntity<Boolean> deleteMaintenanceCard(@RequestParam(name = "ids", required = false, defaultValue = "") List<Long> ids) throws NotFoundException, NotFoundRepairmanException, NotEnoughProductException, JsonProcessingException {
        boolean check = maintenanceCardService.deleteMaintenanceCard(ids);
        return new ResponseEntity<>(check, HttpStatus.OK);
    }

    // Cập nhật ngày trả xe
    // Một phiếu
    @PutMapping("maintenanceCards/returnDate/{id}")
    public ResponseEntity<Object> setReturnDate(@PathVariable Long id) {
        MaintenanceCardDTO maintenanceCardDTO = maintenanceCardService.setReturnDate(id);
        return new ResponseEntity<>(maintenanceCardDTO, HttpStatus.OK);
    }

    // Lấy danh sách phiếu theo id nhân viên
    // Lấy danh sách phiếu cho một nhân viên
    @GetMapping("users/maintenanceCards")
    public ResponseEntity<Map<String, Object>> getMaintenanceCardByUserId(@ModelAttribute("maintenanceCardUser") MaintenanceCardUser maintenanceCardUser) {
        Map<String, Object> map = maintenanceCardService.getMaintenanceCardByRepairMan(maintenanceCardUser);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    // Lấy danh sách phiếu v2
    // Lấy danh sách phiếu từ stored procedure
    @GetMapping("maintenance_cards_v2")
    public ResponseEntity<MaintenanceCardsResponse> getMaintenanceCards(@Valid MaintenanceCardsFilterRequest filterRequest) {
        String tenantId = appAuthHelper.httpCredential().getTenantId();
        String userId = appAuthHelper.httpCredential().getUserId();
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        List<String> roles = authentication.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority).collect(Collectors.toList());
        int role = Integer.parseInt(roles.get(0).split(SPACE)[1]);
        if (role == 2 ) {
            filterRequest.setRepairmanId(Long.parseLong(userId));
        } else filterRequest.setRepairmanId(0L);
        MaintenanceCardsResponse maintenanceCardsResponse = maintenanceCardService.getMaintenanceCard(filterRequest, tenantId);
        return ResponseEntity.ok(maintenanceCardsResponse);
    }

}

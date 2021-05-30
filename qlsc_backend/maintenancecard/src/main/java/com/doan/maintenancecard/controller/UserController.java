package com.doan.maintenancecard.controller;

import com.doan.maintenancecard.dto.MaintenanceCardDTO;
import com.doan.maintenancecard.exception.commonException.NotFoundException;
import com.doan.maintenancecard.service.MaintenanceCardService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.binary.Base64;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final MaintenanceCardService maintenanceCardService;

    @GetMapping("user/maintenanceCards")
    public ResponseEntity<MaintenanceCardDTO> searchMaintenanceCard(@RequestParam Long id, @RequestParam String hmac) throws NotFoundException {
        try {
            var hmacSHA256 = Mac.getInstance("HmacSHA256");
            var secretKey = new SecretKeySpec("qlsc".getBytes(), "HmacSHA256");
            hmacSHA256.init(secretKey);

            String result =  new String(Base64.encodeBase64(hmacSHA256.doFinal(id.toString().getBytes(StandardCharsets.UTF_8)))).trim().replace("/",".");
            if(!result.equals(hmac)){
                throw new NotFoundException("Not found maintenance card");
            }
        } catch (NoSuchAlgorithmException | InvalidKeyException e) {
            return null;
        }

        MaintenanceCardDTO maintenanceCardDTO = maintenanceCardService.getMaintenanceCardById(id,"",3);
        return new ResponseEntity<>(maintenanceCardDTO, HttpStatus.OK);
    }

}

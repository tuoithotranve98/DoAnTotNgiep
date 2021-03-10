package com.doan.customer.kafka;

import com.doan.customer.entity.main.Customer;
import com.doan.customer.entity.main.Vehicle;
import com.doan.customer.repository.CustomerRepository;
import com.doan.customer.repository.VehicleRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class VehicleConsumer {

    private final VehicleRepository vehicleRepository;
    private final CustomerRepository customerRepository;

    @KafkaListener(topics = {"lhw3k9sy-vehicle"}, groupId = "customer")
    @Transactional
    public void consume(@Payload String message, @Header(KafkaHeaders.RECEIVED_MESSAGE_KEY) String key) throws JsonProcessingException {
        Customer customer = customerRepository.findById(Long.parseLong(key)).orElse(null);
        if (customer == null) {
            return;
        }

        VehicleModel vehicleModel = new ObjectMapper().readValue(message, VehicleModel.class);
        Vehicle vehicle = vehicleRepository.getVehicleByPlateNumber(vehicleModel.getPlateNumber());
        Date now = new Date();
        if (vehicle == null) {
            Vehicle newVehicle = new Vehicle();
            newVehicle.setModifiedDate(now);
            newVehicle.setCreatedDate(now);
            newVehicle.setCustomer(customer);
            newVehicle.setColor(vehicleModel.getColor());
            newVehicle.setModel(vehicleModel.getModel());
            newVehicle.setPlateNumber(vehicleModel.getPlateNumber());
            vehicleRepository.save(newVehicle);
        } else {
            checkToSet(vehicleModel, vehicle);
            vehicleRepository.save(vehicle);
        }
    }

    private void checkToSet(VehicleModel vehicleModel, Vehicle vehicle) {
        if (StringUtils.isNotBlank(vehicleModel.getModel())
                && !StringUtils.equals(vehicleModel.getModel(), vehicle.getModel())) {
            vehicle.setModel(vehicleModel.getModel());
        }
        if (StringUtils.isNotBlank(vehicleModel.getPlateNumber())
                && !StringUtils.equals(vehicleModel.getPlateNumber(), vehicle.getPlateNumber())) {
            vehicle.setPlateNumber(vehicleModel.getPlateNumber());
        }
        if (StringUtils.isNotBlank(vehicleModel.getColor())
                && !StringUtils.equals(vehicleModel.getColor(), vehicle.getColor())) {
            vehicle.setColor(vehicleModel.getColor());
        }
    }

}

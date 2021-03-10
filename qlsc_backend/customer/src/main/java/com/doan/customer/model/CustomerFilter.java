package com.doan.customer.model;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.util.Arrays;

@Getter
@Setter
public class CustomerFilter {

    final byte[] payStatus = {0,1};
    private int page;
    private int size;
    private byte[] pay;

    public CustomerFilter() {
        this.page = 1;
        this.size = 5;
        this.pay = payStatus;
    }

    @ModelAttribute("CustomerFilter")
    public CustomerFilter customerFilter(){
        CustomerFilter customerFilter = new CustomerFilter();
        customerFilter.setPage(1);
        customerFilter.setSize(5);
        return customerFilter;
    }

    @Override
    public String toString() {
        return "CustomerFilter{" +
                "PAY_STATUS=" + Arrays.toString(payStatus) +
                ", page=" + page +
                ", size=" + size +
                ", payStatus=" + Arrays.toString(pay) +
                '}';
    }
}

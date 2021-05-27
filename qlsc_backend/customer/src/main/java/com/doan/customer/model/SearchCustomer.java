package com.doan.customer.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.bind.annotation.ModelAttribute;

@Getter
@Setter
@AllArgsConstructor
public class SearchCustomer {

    private int page;
    private int size;
    private String search;
    private String nameField;
    private String order;

    public SearchCustomer(){
        this.size = 10;
        this.page = 1;
        this.search = "";
        this.nameField = "";
        this.order = "";
    }

    @ModelAttribute("searchCustomer")
    public SearchCustomer searchCustomer(){
        SearchCustomer searchCustomer = new SearchCustomer();
        searchCustomer.setPage(1);
        searchCustomer.setSize(10);
        searchCustomer.setNameField("");
        searchCustomer.setOrder("");
        searchCustomer.setSearch("");
        return searchCustomer;
    }

    @Override
    public String toString() {
        return "SearchCustomer{" +
                "page=" + page +
                ", size=" + size +
                ", search='" + search + '\'' +
                ", nameField='" + nameField + '\'' +
                ", order='" + order + '\'' +
                '}';
    }
}

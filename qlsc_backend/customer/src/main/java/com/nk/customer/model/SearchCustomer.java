package com.nk.customer.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.ModelAttribute;

@Getter
@Setter
public class SearchCustomer {

    private int page;
    private int size;
    private String search;
    private String nameField;
    private String order;

    public SearchCustomer(){
        this.size = 5;
        this.page = 1;
        this.search = "";
        this.nameField = "";
        this.order = "";
    }

    @ModelAttribute("searchCustomer")
    public SearchCustomer searchCustomer(){
        SearchCustomer searchCustomer = new SearchCustomer();
        searchCustomer.setPage(1);
        searchCustomer.setSize(5);
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

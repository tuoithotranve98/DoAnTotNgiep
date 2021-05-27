package com.doan.product.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.util.Arrays;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class SearchProduct {

    private int page;
    private int size;
    private String search;
    private String nameField;
    private String order;
    private List<Integer> type;

    public SearchProduct() {
        this.size = 10;
        this.page = 1;
        this.search = "";
        this.nameField = "";
        this.order = "";
        this.type = Arrays.asList(1, 2);
    }

    @ModelAttribute("searchProduct")
    public SearchProduct searchProduct() {
        SearchProduct searchProduct = new SearchProduct();
        searchProduct.setPage(1);
        searchProduct.setSize(10);
        searchProduct.setNameField("");
        searchProduct.setOrder("");
        searchProduct.setSearch("");
        searchProduct.setType(Arrays.asList(1, 2));
        return searchProduct;
    }
}

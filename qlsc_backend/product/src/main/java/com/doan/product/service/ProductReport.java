package com.doan.product.service;

import com.doan.product.model.ProductReportModel;

import java.util.List;

public interface ProductReport {

    List<ProductReportModel> getProductReport(Long tenantId);
}

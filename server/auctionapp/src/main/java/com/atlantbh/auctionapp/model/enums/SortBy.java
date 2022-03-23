package com.atlantbh.auctionapp.model.enums;

public enum SortBy {
    PRODUCT_NAME("productName"), START_DATE("startDate"), END_DATE("endDate"), START_PRICE("startPrice"), HIGH_PRICE("highPrice") ;


    private String sort;

    SortBy(String sort) {
        this.sort = sort;
    }

    public String getSort(){
        return sort;
    }
}

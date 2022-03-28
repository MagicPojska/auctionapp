package com.atlantbh.auctionapp.model.enums;

public enum SortBy {
    START_DATE("startDate"),
    DESCENDING("descending");

    private String sort;

    SortBy(String sort) {
        this.sort = sort;
    }

    public String getSort(){
        return sort;
    }
}

package com.atlantbh.auctionapp.model.enums;

public enum SortBy {
    START_DATE("startDate"),
    END_DATE("endDate"),
    SOLD("sold");

    private String sort;

    SortBy(String sort) {
        this.sort = sort;
    }

    public String getSort(){
        return sort;
    }
}

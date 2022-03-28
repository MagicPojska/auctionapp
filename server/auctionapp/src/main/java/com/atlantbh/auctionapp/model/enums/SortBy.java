package com.atlantbh.auctionapp.model.enums;

public enum SortBy {
    START_DATE("startDate");

    private String sort;

    SortBy(String sort) {
        this.sort = sort;
    }

    public String getSort(){
        return sort;
    }
}

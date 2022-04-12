package com.atlantbh.auctionapp.controller;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class ProductControllerIntegrationTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    @Order(1)
    public void getProductsWithNoParams() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/product/items")
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(status().isOk());
    }

    @Test
    @Order(2)
    public void getProductsWithAllParams() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/product/items?pageNumber=0&pageSize=8&sortBy=startDate")
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(status().isOk());
    }

    @Test
    @Order(3)
    public void getProductsWithPageNumber() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/product/items?pageNumber=0")
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(status().isOk());
    }

    @Test
    @Order(4)
    public void getProductsWithPageSize() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/product/items?pageSize=8")
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(status().isOk());
    }

    @Test
    @Order(5)
    public void getProductsWithSortBy() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/product/items?sortBy=startDate")
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(status().isOk());
    }

    @Test
    @Order(6)
    public void getProductById() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/product/item/1")
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(status().isOk());
    }

    @Test
    @Order(7)
    public void getProductsBySubcategoryWithNoOtherParams() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/product/items/category?&categoryId=20")
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(status().isOk());
    }

    @Test
    @Order(8)
    public void getProductsBySubcategoryWithNoSubcategoryId() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/product/items/category")
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(status().is4xxClientError());
    }

    @Test
    @Order(9)
    public void getProductsBySubcategoryWithAllParams() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/product/items/category?pageNumber=0&pageSize=9&categoryId=10&categoryId=20&lowPrice=10&highPrice=99999&sortBy=productName")
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(status().isOk());
    }

    @Test
    @Order(10)
    public void getProductsBySubcategoryWithLowPrice() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/product/items/category?pageNumber=0&pageSize=9&categoryId=10&categoryId=20&lowPrice=10")
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(status().isOk());
    }

    @Test
    @Order(11)
    public void getProductsBySubcategoryWithHighPrice() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/product/items/category?pageNumber=0&pageSize=9&categoryId=10&categoryId=20&highPrice=99999")
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(status().isOk());
    }

    @Test
    @Order(12)
    public void getProductsBySubcategoryWithSortBy() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/product/items/category?pageNumber=0&pageSize=9&categoryId=10&categoryId=20&sortBy=productName")
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(status().isOk());
    }

    @Test
    @Order(13)
    public void getProductPriceRange() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/product/items/price-range")
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(status().isOk());
    }
}

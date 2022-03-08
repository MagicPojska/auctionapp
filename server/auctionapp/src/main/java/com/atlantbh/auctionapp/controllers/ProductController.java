package com.atlantbh.auctionapp.controllers;

import com.atlantbh.auctionapp.model.ProductEntity;
import com.atlantbh.auctionapp.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("/items")
    public ResponseEntity<Page<ProductEntity>> getAllProducts(@RequestParam(defaultValue = "0") Integer pageNumber,
                                                              @RequestParam(defaultValue = "8") Integer pageSize,
                                                              @RequestParam(defaultValue = "startDate") String sortBy){
        Page<ProductEntity> list = productService.getAllProducts(pageNumber, pageSize, sortBy);

        return new ResponseEntity<Page<ProductEntity>>(list, new HttpHeaders(), HttpStatus.OK);
    }
}

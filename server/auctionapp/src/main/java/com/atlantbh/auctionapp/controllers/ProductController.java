package com.atlantbh.auctionapp.controllers;

import com.atlantbh.auctionapp.model.ProductEntity;
import com.atlantbh.auctionapp.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

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

        return new ResponseEntity<>(list, new HttpHeaders(), HttpStatus.OK);
    }

    @GetMapping("/item/{id}")
    public ResponseEntity getAllProducts(@PathVariable long id){
        ProductEntity product = productService.getProductById(id);

        return new ResponseEntity<>(product, new HttpHeaders(), HttpStatus.OK);
    }

    @GetMapping("/items/category")
    public ResponseEntity<Page<ProductEntity>> getAllProductsFromCategory(@RequestParam(defaultValue = "0") Integer pageNumber,
                                                                          @RequestParam(defaultValue = "9") Integer pageSize,
                                                                          @RequestParam long[] categoryId,
                                                                          @RequestParam(defaultValue = "0") BigDecimal lowPrice,
                                                                          @RequestParam(defaultValue = "99999") BigDecimal highPrice){
        Page<ProductEntity> list = productService.getAllProductsFromCategory(pageNumber, pageSize, categoryId, lowPrice, highPrice);

        return new ResponseEntity<>(list, new HttpHeaders(), HttpStatus.OK);
    }

    // Endpoint za najveci bid i broj bidova

}

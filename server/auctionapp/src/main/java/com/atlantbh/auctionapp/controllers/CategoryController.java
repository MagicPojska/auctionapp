package com.atlantbh.auctionapp.controllers;

import com.atlantbh.auctionapp.model.CategoryEntity;
import com.atlantbh.auctionapp.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<List<CategoryEntity>> getAllCategories(){
        List<CategoryEntity> list = categoryService.getAllCategories();

        return new ResponseEntity<>(list, new HttpHeaders(), HttpStatus.OK);
    }
}

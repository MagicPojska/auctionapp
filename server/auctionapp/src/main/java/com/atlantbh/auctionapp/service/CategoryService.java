package com.atlantbh.auctionapp.service;

import com.atlantbh.auctionapp.model.CategoryEntity;
import com.atlantbh.auctionapp.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public List<CategoryEntity> getAllCategories(){
        List<CategoryEntity> categoryList = categoryRepository.findAll();

        return categoryList;
    }
}

package com.atlantbh.auctionapp.service;

import com.atlantbh.auctionapp.model.CategoryEntity;
import com.atlantbh.auctionapp.model.ProductEntity;
import com.atlantbh.auctionapp.model.enums.SortBy;
import com.atlantbh.auctionapp.repository.CategoryRepository;
import com.atlantbh.auctionapp.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public Page<ProductEntity> getAllProducts(Integer pageNumber, Integer pageSize, String sortBy){
        Sort sortOrder;
        if(sortBy.equals(SortBy.startDate.toString())){
            sortOrder = Sort.by(sortBy).descending();
        }else{
            sortOrder = Sort.by(sortBy);
        }
        Pageable paging = PageRequest.of(pageNumber, pageSize, sortOrder);

        Page<ProductEntity> pagedResult = productRepository.findAll(paging);

        return pagedResult;
    }

    public Page<ProductEntity> getAllProductsFromCategory(Integer pageNumber, Integer pageSize,long[] categoryId){
        Pageable paging = PageRequest.of(pageNumber, pageSize);
        Page<ProductEntity> productsList = productRepository.findAllByCategoryIdIn(categoryId, paging);

        return productsList;
    }

    public List<CategoryEntity> getAllCategories(){
        List<CategoryEntity> categoryList = categoryRepository.findAll();

        return categoryList;
    }
}

package com.atlantbh.auctionapp.service;

import com.atlantbh.auctionapp.exceptions.NotFoundException;
import com.atlantbh.auctionapp.model.ProductEntity;
import com.atlantbh.auctionapp.model.enums.SortBy;
import com.atlantbh.auctionapp.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;


@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public Page<ProductEntity> getAllProducts(Integer pageNumber, Integer pageSize, String sortBy){
        Sort sortOrder;
        if (sortBy.equals(SortBy.START_DATE.getSort())){
            sortOrder = Sort.by(sortBy).descending();
        } else {
            sortOrder = Sort.by(sortBy);
        }
        Pageable paging = PageRequest.of(pageNumber, pageSize, sortOrder);

        Page<ProductEntity> pagedResult = productRepository.findAll(paging);

        return pagedResult;
    }

    public Page<ProductEntity> getAllProductsFromCategory(Integer pageNumber, Integer pageSize, long[] categoryId, BigDecimal lowPrice, BigDecimal highPrice){
        Pageable paging = PageRequest.of(pageNumber, pageSize, Sort.by("category_id"));
        Page<ProductEntity> productsList = productRepository.findAllByCategoryIdInAndStartPriceBetween(categoryId, lowPrice, highPrice, paging);

        return productsList;
    }

    public ProductEntity getProductById(long id){
        ProductEntity product = productRepository.findProductById(id);
        if(product == null){
            throw new NotFoundException("Product with id:" + id + " does not exist");
        }
        return product;
    }

}

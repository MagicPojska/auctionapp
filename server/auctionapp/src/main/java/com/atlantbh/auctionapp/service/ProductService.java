package com.atlantbh.auctionapp.service;

import com.atlantbh.auctionapp.model.ProductEntity;
import com.atlantbh.auctionapp.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public Page<ProductEntity> getAllProducts(Integer pageNumber, Integer pageSize, String sortBy){
        Sort sortOrder;
        if(sortBy.equals("startDate")){
            sortOrder = Sort.by(sortBy).descending();
        }else{
            sortOrder = Sort.by(sortBy);
        }
        Pageable paging = PageRequest.of(pageNumber, pageSize, sortOrder);

        Page<ProductEntity> pagedResult = productRepository.findAll(paging);

        return pagedResult;

    }
}

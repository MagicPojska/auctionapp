package com.atlantbh.auctionapp.service;

import com.atlantbh.auctionapp.exceptions.NotFoundException;
import com.atlantbh.auctionapp.model.ProductEntity;
import com.atlantbh.auctionapp.model.enums.SortBy;
import com.atlantbh.auctionapp.projections.PriceRangeProj;
import com.atlantbh.auctionapp.repository.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    Logger logger = LoggerFactory.getLogger(ProductService.class);

    public Page<ProductEntity> getAllProducts(Integer pageNumber, Integer pageSize, String sortBy){
        Sort sortOrder;
        LocalDateTime time = LocalDateTime.now();
        if (sortBy.equals(SortBy.START_DATE.getSort())){
            sortOrder = Sort.by(sortBy).descending();
        } else {
            sortOrder = Sort.by(sortBy);
        }
        Pageable paging = PageRequest.of(pageNumber, pageSize, sortOrder);

        return productRepository.findAllByEndDateIsAfter(time, paging);

    }

    public Page<ProductEntity> getAllProductsFromCategory(Integer pageNumber, Integer pageSize, long[] categoryId, double lowPrice, double highPrice, Sort sortBy, String sort){
        LocalDateTime time = LocalDateTime.now();

        if(sortBy == Sort.unsorted()){
            sortBy = Sort.by(sort).ascending();
        }

        Pageable paging = PageRequest.of(pageNumber, pageSize, sortBy);
        return productRepository.findAllByCategoryIdInAndStartPriceBetweenAndEndDateIsAfter(categoryId, lowPrice, highPrice, time, paging );
    }

    public ProductEntity getProductById(long id){
        ProductEntity product = productRepository.findProductById(id);
        if(product == null){
            logger.error("Product with id: " + id + " not found");
            throw new NotFoundException("Product with id:" + id + " does not exist");
        }
        return product;
    }

    public PriceRangeProj getPriceRange(){
        return productRepository.getPriceRange();
    }

}

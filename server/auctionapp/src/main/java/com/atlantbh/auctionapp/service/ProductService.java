package com.atlantbh.auctionapp.service;

import com.atlantbh.auctionapp.exceptions.NotFoundException;
import com.atlantbh.auctionapp.model.CategoryEntity;
import com.atlantbh.auctionapp.model.ProductEntity;
import com.atlantbh.auctionapp.model.enums.SortBy;
import com.atlantbh.auctionapp.projections.PriceRangeProj;
import com.atlantbh.auctionapp.repository.CategoryRepository;
import com.atlantbh.auctionapp.repository.ProductRepository;
import com.atlantbh.auctionapp.request.ProductRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @Autowired
    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
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

    public ProductEntity createProduct(ProductRequest productRequest) {
        CategoryEntity category = categoryRepository.findById(productRequest.getCategoryId()).orElseThrow(() -> new NotFoundException("Category with id: " + productRequest.getCategoryId() + " does not exist"));
        ProductEntity product = new ProductEntity(productRequest.getProductName(), productRequest.getDescription(), productRequest.getStartPrice(), productRequest.getStartDate(), productRequest.getEndDate(), productRequest.getImages(), productRequest.getAddress(), productRequest.getCity(), productRequest.getZipCode(), productRequest.getCountry(), productRequest.getPhone(), productRequest.getUserId(), category);
        return productRepository.save(product);
    }

    public List<ProductEntity> getProductsFromUser(long userId, String type) {
        LocalDateTime time = LocalDateTime.now();
        List<ProductEntity> products;
        if (type.equals(SortBy.SOLD.getSort())){
            products = productRepository.findAllByUserIdAndEndDateIsBefore(userId, time, Sort.by(Sort.Direction.DESC, SortBy.END_DATE.getSort()));
        } else {
            products = productRepository.findAllByUserIdAndEndDateIsAfter(userId, time, Sort.by(Sort.Direction.DESC, SortBy.START_DATE.getSort()));
        }
        if (products.isEmpty()) {
            logger.error("Products from user with id: " + userId + " not found");
            throw new NotFoundException("Products from user with id: " + userId + " not found");
        }
        return products;
    }
}

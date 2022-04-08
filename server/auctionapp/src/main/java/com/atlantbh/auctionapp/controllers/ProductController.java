package com.atlantbh.auctionapp.controllers;

import com.atlantbh.auctionapp.model.ProductEntity;
import com.atlantbh.auctionapp.projections.PriceRangeProj;
import com.atlantbh.auctionapp.request.ProductRequest;
import com.atlantbh.auctionapp.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/items")
    public ResponseEntity<Page<ProductEntity>> getAllProducts(@RequestParam(defaultValue = "0") Integer pageNumber,
                                                              @RequestParam(defaultValue = "8") Integer pageSize,
                                                              @RequestParam(defaultValue = "startDate") String sortBy){
        Page<ProductEntity> list = productService.getAllProducts(pageNumber, pageSize, sortBy);

        return new ResponseEntity<>(list, new HttpHeaders(), HttpStatus.OK);
    }

    @GetMapping("/item/{id}")
    public ResponseEntity<ProductEntity> getProductById(@PathVariable long id){
        ProductEntity product = productService.getProductById(id);

        return new ResponseEntity<>(product, new HttpHeaders(), HttpStatus.OK);
    }

    @GetMapping("/items/category")
    public ResponseEntity<Page<ProductEntity>> getAllProductsFromCategory(@RequestParam(defaultValue = "0") Integer pageNumber,
                                                                          @RequestParam(defaultValue = "9") Integer pageSize,
                                                                          @RequestParam(required = false) ArrayList<Long> categoryId,
                                                                          @RequestParam(defaultValue = "0") double lowPrice,
                                                                          @RequestParam(defaultValue = "9999999") double highPrice,
                                                                          @RequestParam(defaultValue = "") String searchTerm,
                                                                          @RequestParam(defaultValue = "productName") String sort,
                                                                          Sort sortBy){

        Page<ProductEntity> list = productService.getAllProductsFromCategory(pageNumber, pageSize, categoryId, lowPrice, highPrice, searchTerm, sortBy, sort);

        return new ResponseEntity<>(list, new HttpHeaders(), HttpStatus.OK);
    }

    @GetMapping("/items/price-range")
    public ResponseEntity<PriceRangeProj> getProductPriceRange(){
        PriceRangeProj priceRange = productService.getPriceRange();
        return new ResponseEntity<>(priceRange, new HttpHeaders(), HttpStatus.OK);
    }

    @PostMapping("/add-item")
    public ResponseEntity<ProductEntity> createProduct(@RequestBody ProductRequest productRequest){
        ProductEntity createdProduct = productService.createProduct(productRequest);
        return new ResponseEntity<>(createdProduct, new HttpHeaders(), HttpStatus.OK);
    }

    @GetMapping("/items/user")
    public ResponseEntity<List<ProductEntity>> getAllActiveProductsFromUser(@RequestParam long userId,
                                                                            @RequestParam String type){

        List<ProductEntity> products = productService.getProductsFromUser(userId, type);

        return new ResponseEntity<>(products, new HttpHeaders(), HttpStatus.OK);
    }
}

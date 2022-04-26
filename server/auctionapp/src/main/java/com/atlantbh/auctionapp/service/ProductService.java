package com.atlantbh.auctionapp.service;

import com.atlantbh.auctionapp.exceptions.BadRequestException;
import com.atlantbh.auctionapp.exceptions.NotFoundException;
import com.atlantbh.auctionapp.model.CategoryEntity;
import com.atlantbh.auctionapp.model.ProductEntity;
import com.atlantbh.auctionapp.model.enums.SortBy;
import com.atlantbh.auctionapp.projections.PriceRangeProj;
import com.atlantbh.auctionapp.projections.ProductNameProj;
import com.atlantbh.auctionapp.repository.CategoryRepository;
import com.atlantbh.auctionapp.repository.ProductRepository;
import com.atlantbh.auctionapp.request.PaymentRequest;
import com.atlantbh.auctionapp.request.ProductRequest;
import com.atlantbh.auctionapp.response.ProductResponse;
import com.atlantbh.auctionapp.utilities.CalculateSimilarity;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private String secretKey;

    @Value("${STRIPE.SECRET_KEY}")
    public void setSecretKey(String secretKey) {
        this.secretKey = secretKey;
    }

    @PostConstruct
    public void init() {
        Stripe.apiKey = secretKey;
    }

    @Autowired
    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    Logger logger = LoggerFactory.getLogger(ProductService.class);

    public Page<ProductEntity> getAllProducts(Integer pageNumber, Integer pageSize, String sortBy){
        Sort sortOrder;
        LocalDateTime time = LocalDateTime.now();
        if (sortBy.equals(SortBy.START_DATE.getSort())) {
            sortOrder = Sort.by(sortBy).descending();
        } else {
            sortOrder = Sort.by(sortBy);
        }
        Pageable paging = PageRequest.of(pageNumber, pageSize, sortOrder);

        return productRepository.findAllByEndDateIsAfterAndStartDateIsBefore(time, time, paging);

    }

    public ProductResponse getAllProductsFromCategory(Integer pageNumber, Integer pageSize, ArrayList<Long> categoryId, double lowPrice, double highPrice, String searchTerm, Sort sortBy, String sort){
        LocalDateTime time = LocalDateTime.now();
        if (categoryId == null) {
            categoryId = new ArrayList<>();
            long countOfCategories = categoryRepository.count();
            for(long i = 1; i <= countOfCategories; i++){
                categoryId.add(i);
            }
        }

        if (sortBy == Sort.unsorted()) {
            sortBy = Sort.by(sort).ascending();
        }

        Pageable paging = PageRequest.of(pageNumber, pageSize, sortBy);
        Page<ProductEntity> products = productRepository.findAllByCategoryIdInAndStartPriceBetweenAndEndDateIsAfterAndStartDateIsBeforeAndProductNameContainingIgnoreCase(categoryId, lowPrice, highPrice, time, time, searchTerm, paging );

        String suggestion = "";
        if (products.getNumberOfElements() == 0 && !searchTerm.isEmpty()) {
           List<ProductNameProj> listOfProductNames = productRepository.findAllByEndDateIsAfterAndStartDateIsBefore(time, time);
           Double editDistance = null;
           for (ProductNameProj productNameProj : listOfProductNames) {
                double newEditDistance = CalculateSimilarity.calculate(productNameProj.getProductName(), searchTerm);
                if (editDistance == null){
                    editDistance = newEditDistance;
                }
                if(newEditDistance > editDistance){
                    editDistance = newEditDistance;
                    suggestion = productNameProj.getProductName();
                }
           }
        }

        return new ProductResponse(products, suggestion);
    }

    public ProductEntity getProductById(long id){
        ProductEntity product = productRepository.findProductById(id);
        if (product == null) {
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
        if (productRequest.getEndDate().isBefore(LocalDateTime.now())) {
            logger.error("End date can't be before current date");
            throw new BadRequestException("End date can't be before current date");
        }
        if (productRequest.getEndDate().isBefore(productRequest.getStartDate())) {
            logger.error("End date must be after start date");
            throw new BadRequestException("End date must be after start date");
        }

        return productRepository.save(product);
    }

    public List<ProductEntity> getProductsFromUser(long userId, String type) {
        LocalDateTime time = LocalDateTime.now();
        List<ProductEntity> products;
        if (type.equals(SortBy.SOLD.getSort())) {
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

    public List<ProductEntity> getRelatedProducts(long productId) {
        ProductEntity product = productRepository.findProductById(productId);
        if (product == null) {
            logger.error("Product with id: " + productId + " not found");
            throw new NotFoundException("Product with id: " + productId + " not found");
        }

        List<ProductEntity> relatedProducts = productRepository.findTop3ByCategoryIdAndIdNotAndEndDateIsAfterAndStartDateIsBefore(product.getCategory().getId(), productId, LocalDateTime.now(), LocalDateTime.now());
        if (relatedProducts.isEmpty()) {
            logger.error("Related products from category with id: " + product.getCategory().getId() + " not found");
            throw new NotFoundException("Related products from category with id: " + product.getCategory().getId() + " not found");
        }
        return relatedProducts;
    }

    public ProductEntity payForProduct(PaymentRequest paymentRequest) throws StripeException {
        Map<String, Object> chargeParams = new HashMap<>();

        ProductEntity product = productRepository.findProductById(paymentRequest.getProductId());
        if(product.isSold()){
            logger.error("Product is already sold");
            throw new BadRequestException("Product is already sold");
        }

        chargeParams.put("amount", product.getHighestBid().multiply(BigDecimal.valueOf(100)).intValue());
        chargeParams.put("currency", "usd");
        chargeParams.put("source", paymentRequest.getId());

        Charge.create(chargeParams);
        product.setSold(true);
        productRepository.save(product);

        return product;
    }
}

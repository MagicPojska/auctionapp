package com.atlantbh.auctionapp.service;

import com.atlantbh.auctionapp.exceptions.BadRequestException;
import com.atlantbh.auctionapp.exceptions.NotFoundException;
import com.atlantbh.auctionapp.model.BidsEntity;
import com.atlantbh.auctionapp.model.CategoryEntity;
import com.atlantbh.auctionapp.model.ProductEntity;
import com.atlantbh.auctionapp.model.UserEntity;
import com.atlantbh.auctionapp.repository.BidRepository;
import com.atlantbh.auctionapp.repository.ProductRepository;
import com.atlantbh.auctionapp.repository.UserRepository;
import com.atlantbh.auctionapp.request.BidRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;

@ExtendWith(MockitoExtension.class)
public class BidServiceUnitTest {

    @Mock
    private BidRepository bidRepository;
    @Mock
    private ProductRepository productRepository;
    @Mock
    private UserRepository userRepository;

    @Test
    @DisplayName("Return NotFoundException when bids for product are not found")
    void expectNotFoundExceptionForNonExistingBidsForProductId() {
        BidService bidService = new BidService(bidRepository, null, null);

        assertThatThrownBy(() -> {
            bidService.getBidsForProduct(1L);
        }).isInstanceOf(NotFoundException.class);
    }

    @Test
    @DisplayName("Pass all the validation when adding a bid for a product and save bid to database")
    void passAllTheValidationForAddingBid() {
        BidService bidService = new BidService(bidRepository, productRepository, userRepository);
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime future = LocalDateTime.of(2055, 1, 1, 0, 0);

        BidRequest bidRequest = new BidRequest(1L, 1L, 55);
        ProductEntity product = new ProductEntity("productName", "description", 20, now, future, "images", "address", "city", "5555", "country", "+38766666666", 1, new CategoryEntity());
        product.setId(1L);
        product.setNumberOfBids(3);
        UserEntity user = new UserEntity("firstName", "lastName", "email@gmail.com", "password");
        user.setId(2L);
        Double highestBid = 40.0;

        Mockito.when(productRepository.findProductById(bidRequest.getProductId())).thenReturn(product);
        Mockito.when(userRepository.getById(bidRequest.getUserId())).thenReturn(user);
        Mockito.when(bidRepository.getMaxBidFromProduct(product.getId())).thenReturn(highestBid);

        bidService.add(bidRequest);
        Mockito.verify(bidRepository, Mockito.times(1)).save(ArgumentMatchers.any(BidsEntity.class));
    }

    @Test
    @DisplayName("Return BadRequestException when user bids on his own product")
    void returnBadRequestException() {
        BidService bidService = new BidService(bidRepository, productRepository, userRepository);
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime future = LocalDateTime.of(2055, 1, 1, 0, 0);

        BidRequest bidRequest = new BidRequest(1L, 1L, 55);
        ProductEntity product = new ProductEntity("productName", "description", 20, now, future, "images", "address", "city", "5555", "country", "+38766666666", 1, new CategoryEntity());
        product.setId(1L);
        product.setNumberOfBids(3);
        UserEntity user = new UserEntity("firstName", "lastName", "email@gmail.com", "password");
        user.setId(1L);

        Mockito.when(productRepository.findProductById(bidRequest.getProductId())).thenReturn(product);
        Mockito.when(userRepository.getById(bidRequest.getUserId())).thenReturn(user);

        assertThatThrownBy(() -> {
            bidService.add(bidRequest);
        }).isInstanceOf(BadRequestException.class);
    }

    @Test
    @DisplayName("Return BadRequestException when user bids expired product")
    void returnBadRequestExceptionForExpiredProduct() {
        BidService bidService = new BidService(bidRepository, productRepository, null);
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime future = LocalDateTime.of(2019, 1, 1, 0, 0);

        BidRequest bidRequest = new BidRequest(1L, 1L, 55);
        ProductEntity product = new ProductEntity("productName", "description", 20, now, future, "images", "address", "city", "5555", "country", "+38766666666", 1, new CategoryEntity());
        product.setId(1L);
        product.setNumberOfBids(3);

        Mockito.when(productRepository.findProductById(bidRequest.getProductId())).thenReturn(product);

        assertThatThrownBy(() -> {
            bidService.add(bidRequest);
        }).isInstanceOf(BadRequestException.class);
    }

    @Test
    @DisplayName("Return BadRequestException when user bids with price lower than star price")
    void returnBadRequestExceptionForBidLowerThanStartPrice() {
        BidService bidService = new BidService(null, productRepository, null);
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime future = LocalDateTime.of(2055, 1, 1, 0, 0);

        BidRequest bidRequest = new BidRequest(1L, 1L, 15);
        ProductEntity product = new ProductEntity("productName", "description", 20, now, future, "images", "address", "city", "5555", "country", "+38766666666", 1, new CategoryEntity());
        product.setId(2L);
        product.setNumberOfBids(3);

        Mockito.when(productRepository.findProductById(bidRequest.getProductId())).thenReturn(product);


        assertThatThrownBy(() -> {
            bidService.add(bidRequest);
        }).isInstanceOf(BadRequestException.class);
    }

    @Test
    @DisplayName("Return BadRequestException when user bids with bid lower than highest bid")
    void returnBadRequestExceptionForBidLowerThanHighestBid() {
        BidService bidService = new BidService(bidRepository, productRepository, userRepository);
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime future = LocalDateTime.of(2055, 1, 1, 0, 0);

        BidRequest bidRequest = new BidRequest(1L, 1L, 30);
        ProductEntity product = new ProductEntity("productName", "description", 20, now, future, "images", "address", "city", "5555", "country", "+38766666666", 1, new CategoryEntity());
        product.setId(1L);
        product.setNumberOfBids(3);
        UserEntity user = new UserEntity("firstName", "lastName", "email@gmail.com", "password");
        user.setId(2L);
        Double highestBid = 40.0;

        Mockito.when(productRepository.findProductById(bidRequest.getProductId())).thenReturn(product);
        Mockito.when(userRepository.getById(bidRequest.getUserId())).thenReturn(user);
        Mockito.when(bidRepository.getMaxBidFromProduct(product.getId())).thenReturn(highestBid);

        assertThatThrownBy(() -> {
            bidService.add(bidRequest);
        }).isInstanceOf(BadRequestException.class);
    }

}
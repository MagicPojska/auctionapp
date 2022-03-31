package com.atlantbh.auctionapp.service;

import com.atlantbh.auctionapp.exceptions.NotFoundException;
import com.atlantbh.auctionapp.model.CategoryEntity;
import com.atlantbh.auctionapp.model.ProductEntity;
import com.atlantbh.auctionapp.projections.PriceRangeProj;
import com.atlantbh.auctionapp.repository.CategoryRepository;
import com.atlantbh.auctionapp.repository.ProductRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.*;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Matchers.isA;

@ExtendWith(MockitoExtension.class)
class ProductServiceUnitTest {

    @Mock
    private ProductRepository productRepository;
    @Mock
    private CategoryRepository categoryRepository;

    @Test
    @DisplayName("Test should return Page object of products")
    void getAllProducts() {
        ProductService productService = new ProductService(productRepository, null);

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime future = LocalDateTime.of(2019, 1, 1, 0, 0);
        Sort sortOrder = Sort.by("startDate").descending();
        Pageable paging = PageRequest.of(0, 9, sortOrder);
        ProductEntity product1 = new ProductEntity("productName", "description", 20, now, future, "images", "address", "city", "5555", "country", "+38766666666", 1, new CategoryEntity());
        ProductEntity product2 = new ProductEntity("productName", "description", 20, now, future, "images", "address", "city", "5555", "country", "+38766666666", 1, new CategoryEntity());
        final Page<ProductEntity> expectedResult = new PageImpl<>(List.of(product1, product2));

        Mockito.when(productRepository.findAllByEndDateIsAfter(isA(LocalDateTime.class), eq(paging))).thenReturn(expectedResult);

        Page<ProductEntity> list = productService.getAllProducts(0, 9, "startDate");
        assertThat(list.getContent()).isEqualTo(expectedResult.getContent());
    }

    @Test
    @DisplayName("Test should return product by id")
    void getProductById() {
        ProductService productService = new ProductService(productRepository, null);
        ProductEntity expectedResult = new ProductEntity("productName", "description", 20, LocalDateTime.now(), LocalDateTime.now(), "images", "address", "city", "5555", "country", "+38766666666", 1, new CategoryEntity());
        expectedResult.setId(1L);
        Mockito.when(productRepository.findProductById(1L)).thenReturn(expectedResult);
        ProductEntity product = productService.getProductById(1L);
        assertThat(product).isEqualTo(expectedResult);
    }

    @Test
    @DisplayName("Test should return NotFoundException when product is not found")
    void findProductByIdAndExpectNotFoundException() {
        ProductService productService = new ProductService(productRepository, null);

        assertThatThrownBy(() -> productService.getProductById(1L)).isInstanceOf(NotFoundException.class);
    }

    @Test
    @DisplayName("Test should return product price range")
    void getPriceRange() {
        ProductService productService = new ProductService(productRepository, null);
        PriceRangeProj expectedResult = Mockito.mock(PriceRangeProj.class);
        Mockito.when(productRepository.getPriceRange()).thenReturn(expectedResult);

        assertThat(productService.getPriceRange()).isEqualTo(expectedResult);
    }
}
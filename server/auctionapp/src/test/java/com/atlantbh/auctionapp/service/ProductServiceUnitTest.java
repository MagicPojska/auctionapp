package com.atlantbh.auctionapp.service;

import com.atlantbh.auctionapp.exceptions.NotFoundException;
import com.atlantbh.auctionapp.model.CategoryEntity;
import com.atlantbh.auctionapp.model.ProductEntity;
import com.atlantbh.auctionapp.model.UserEntity;
import com.atlantbh.auctionapp.projections.PriceRangeProj;
import com.atlantbh.auctionapp.repository.BidRepository;
import com.atlantbh.auctionapp.repository.CategoryRepository;
import com.atlantbh.auctionapp.repository.ProductRepository;
import com.atlantbh.auctionapp.repository.UserRepository;
import com.atlantbh.auctionapp.request.ProductRequest;
import com.atlantbh.auctionapp.request.UpdateCardRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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
    @Mock
    private UserRepository userRepository;
    @Mock
    private BidRepository bidRepository;
    @Mock
    private StripeService stripeService;
    @Mock
    private UserService userService;

    ProductService productService;

    @BeforeEach
    void setUp() {
        productService = new ProductService(productRepository, categoryRepository, userRepository, userService, bidRepository, stripeService);
    }

    @Test
    @DisplayName("Test should return Page object of products")
    void getAllProducts() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime future = LocalDateTime.of(2019, 1, 1, 0, 0);
        Sort sortOrder = Sort.by("startDate").descending();
        Pageable paging = PageRequest.of(0, 9, sortOrder);
        ProductEntity product1 = new ProductEntity("productName", "description", 20, now, future, "images", "address", "city", "5555", "country", "+38766666666", 1, new CategoryEntity());
        ProductEntity product2 = new ProductEntity("productName", "description", 20, now, future, "images", "address", "city", "5555", "country", "+38766666666", 1, new CategoryEntity());
        final Page<ProductEntity> expectedResult = new PageImpl<>(List.of(product1, product2));

        Mockito.when(productRepository.findAllByEndDateIsAfterAndStartDateIsBefore(isA(LocalDateTime.class), isA(LocalDateTime.class), eq(paging))).thenReturn(expectedResult);

        Page<ProductEntity> list = productService.getAllProducts(0, 9, "startDate");
        assertThat(list.getContent()).isEqualTo(expectedResult.getContent());
    }

    @Test
    @DisplayName("Test should return product by id")
    void getProductById() {
        ProductEntity expectedResult = new ProductEntity("productName", "description", 20, LocalDateTime.now(), LocalDateTime.now(), "images", "address", "city", "5555", "country", "+38766666666", 1, new CategoryEntity());
        expectedResult.setId(1L);
        Mockito.when(productRepository.findProductById(1L)).thenReturn(expectedResult);
        ProductEntity product = productService.getProductById(1L);
        assertThat(product).isEqualTo(expectedResult);
    }

    @Test
    @DisplayName("Test should return NotFoundException when product is not found")
    void findProductByIdAndExpectNotFoundException() {
        assertThatThrownBy(() -> productService.getProductById(1L)).isInstanceOf(NotFoundException.class);
    }

    @Test
    @DisplayName("Test should return product price range")
    void getPriceRange() {
        PriceRangeProj expectedResult = Mockito.mock(PriceRangeProj.class);
        Mockito.when(productRepository.getPriceRange()).thenReturn(expectedResult);

        assertThat(productService.getPriceRange()).isEqualTo(expectedResult);
    }

    @Test
    @DisplayName("Test should save product to a database")
    void createProduct() {
        UpdateCardRequest updateCardRequest = new UpdateCardRequest("Holder Name", "4111111111111111", 2025, 123, 123);
        ProductRequest productRequest = new ProductRequest("productName", "description", 20, LocalDateTime.now(), LocalDateTime.now().plusDays(10), "images", "address", "city", "5555", "country", "+38766666666", 1, 1, updateCardRequest);

        Mockito.when(categoryRepository.findById(1L)).thenReturn(Optional.of(new CategoryEntity()));
        Mockito.when(userRepository.findById(1L)).thenReturn(Optional.of(new UserEntity()));

        productService.createProduct(productRequest);

        Mockito.verify(productRepository, Mockito.times(1)).save(ArgumentMatchers.any(ProductEntity.class));
    }

    @Test
    @DisplayName("Test should return NotFoundException for nonexisting category")
    void testCreateProduct() {
        UpdateCardRequest updateCardRequest = new UpdateCardRequest("Holder Name", "4111111111111111", 2025, 123, 123);
        ProductRequest productRequest = new ProductRequest("productName", "description", 20, LocalDateTime.now(), LocalDateTime.now(), "images", "address", "city", "5555", "country", "+38766666666", 1, 1, updateCardRequest);

        assertThatThrownBy(() -> productService.createProduct(productRequest)).isInstanceOf(NotFoundException.class);
    }

    @Test
    @DisplayName("Test should return all products posted by a user")
    void testGetProductsFromUser() {
        LocalDateTime time = LocalDateTime.now();
        ProductEntity product1 = new ProductEntity("productName", "description", 20, time, time, "images", "address", "city", "5555", "country", "+38766666666", 1, new CategoryEntity());
        ProductEntity product2 = new ProductEntity("productName", "description", 20, time, time, "images", "address", "city", "5555", "country", "+38766666666", 1, new CategoryEntity());
        List<ProductEntity> expectedResult = List.of(product1, product2);

        Mockito.when(productRepository.findAllByUserIdAndEndDateIsBefore(eq(1L), isA(LocalDateTime.class), eq(Sort.by(Sort.Direction.DESC, "endDate")))).thenReturn(expectedResult);

        assertThat(productService.getProductsFromUser(1L, "sold")).isEqualTo(expectedResult);
    }

    @Test
    @DisplayName("Test should NotFoundException for nonexisting items that user owns")
    void testGetProductsFromUserAndReturnNotFoundException() {
        assertThatThrownBy(() -> productService.getProductsFromUser(1L, "sold")).isInstanceOf(NotFoundException.class);
    }

}
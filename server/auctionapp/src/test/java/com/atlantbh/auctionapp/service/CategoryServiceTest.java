package com.atlantbh.auctionapp.service;

import com.atlantbh.auctionapp.model.CategoryEntity;
import com.atlantbh.auctionapp.repository.CategoryRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

@ExtendWith(MockitoExtension.class)
class CategoryServiceTest {

    @Mock
    CategoryRepository categoryRepository;

    @Test
    void excpectAllCategoriesList() {
        CategoryService categoryService = new CategoryService(categoryRepository);
        CategoryEntity categoryEntity1 = new CategoryEntity("test1 category", "test description", 1);
        CategoryEntity categoryEntity2 = new CategoryEntity("test2 category", "test description", 2);
        CategoryEntity categoryEntity3 = new CategoryEntity("test3 category", "test description", 3);
        CategoryEntity categoryEntity4 = new CategoryEntity("test4 category", "test description", 4);

        List<CategoryEntity> categoryEntities = List.of(categoryEntity1, categoryEntity2, categoryEntity3, categoryEntity4);

        Mockito.when(categoryRepository.findAll()).thenReturn(categoryEntities);
        List<CategoryEntity> actualResult = categoryService.getAllCategories();

        Assertions.assertEquals(actualResult.size(), categoryEntities.size());
    }
}
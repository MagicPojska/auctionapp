package com.atlantbh.auctionapp.service;

import com.atlantbh.auctionapp.domain.model.User;
import com.atlantbh.auctionapp.exceptions.NotFoundException;
import com.atlantbh.auctionapp.model.UserEntity;
import com.atlantbh.auctionapp.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;


@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Test
    @DisplayName("Test if UserEntity is returned if user is found by email")
    void loadUserByUsername() {
        UserService userService = new UserService(userRepository);
        UserEntity userEntity = new UserEntity("Safet", "Pojskic", "test@gmail.com", "testPassword");
        User expectedUserResult = new User(1L, "Safet", "Pojskic", "test@gmail.com", "testPassword");

        Mockito.when(userRepository.findByEmail("test@gmail.com")).thenReturn(userEntity);

        UserDetails actualUserResult = userService.loadUserByUsername("test@gmail.com");

        Assertions.assertEquals(actualUserResult.getUsername(),expectedUserResult.getUsername());
    }

    @Test
    @DisplayName("Test if NotFoundException is returned if user is not found by email")
    void returnExceptionNotFoundOnFindByEmail() {
        UserService userService = new UserService(userRepository);

        Assertions.assertThrows(UsernameNotFoundException.class, () -> {
            userService.loadUserByUsername("test@gmail.com");
        });
    }
}
package com.atlantbh.auctionapp.service;

import com.atlantbh.auctionapp.domain.model.User;
import com.atlantbh.auctionapp.model.UserEntity;
import com.atlantbh.auctionapp.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;


@ExtendWith(MockitoExtension.class)
public class UserServiceUnitTest {

    @Mock
    private UserRepository userRepository;

    @Test
    @DisplayName("Test if User is returned if user is found by email")
    void loadUserByUsername() {
        UserService userService = new UserService(userRepository);
        UserEntity userEntity = new UserEntity("Safet", "Pojskic", "test@gmail.com", "testPassword");
        User expectedUserResult = new User(1L, "Safet", "Pojskic", "test@gmail.com", "testPassword");

        Mockito.when(userRepository.findByEmail("test@gmail.com")).thenReturn(userEntity);

        assertThat(userService.loadUserByUsername("test@gmail.com").getUsername()).isEqualTo(expectedUserResult.getUsername());
    }

    @Test
    @DisplayName("Test if NotFoundException is returned if user is not found by email")
    void returnExceptionNotFoundOnFindByEmail() {
        UserService userService = new UserService(userRepository);

        assertThatThrownBy(() -> {
            userService.loadUserByUsername("test@gmail.com");
        }).isInstanceOf(UsernameNotFoundException.class);
    }
}
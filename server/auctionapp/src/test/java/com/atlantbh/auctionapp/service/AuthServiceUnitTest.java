package com.atlantbh.auctionapp.service;

import com.atlantbh.auctionapp.domain.model.User;
import com.atlantbh.auctionapp.exceptions.ConflictException;
import com.atlantbh.auctionapp.model.UserEntity;
import com.atlantbh.auctionapp.repository.UserRepository;
import com.atlantbh.auctionapp.request.LoginRequest;
import com.atlantbh.auctionapp.request.RegisterRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;


@ExtendWith(MockitoExtension.class)
class AuthServiceUnitTest {
    @Mock
    private UserRepository userRepository;
    @Mock
    private PasswordEncoder passwordEncoder;

    AuthService authService;

    @BeforeEach
    void setUp() {
        authService = new AuthService(userRepository, passwordEncoder, null, null);
    }

    @Test
    @DisplayName("Test if register service will save user in database")
    void register() {
        RegisterRequest registerRequest = new RegisterRequest("username", "password", "email", "password");

        Mockito.when(userRepository.existsByEmail(registerRequest.getEmail())).thenReturn(false);

        authService.register(registerRequest);
        Mockito.verify(userRepository, Mockito.times(1)).save(ArgumentMatchers.any(UserEntity.class));

    }

    @Test
    @DisplayName("Test if an existing user can be found by email and return ConflictException")
    void whenUserRegistersExpectConflictException() {
        RegisterRequest registerRequest = new RegisterRequest("username", "password", "email", "password");
        Mockito.when(userRepository.existsByEmail(registerRequest.getEmail())).thenReturn(true);

        assertThatThrownBy(() -> authService.register(registerRequest)).isInstanceOf(ConflictException.class);
    }

    @Test
    @DisplayName("Test if user can be found by email and return user")
    void login() {
        LoginRequest loginRequest = new LoginRequest("test@gmail.com", "password");
        UserEntity userEntity = new UserEntity("Safet", "Pojskic", "test@gmail.com", "testPassword");
        User expectedUserResult = new User(1L, "Safet", "Pojskic", "test@gmail.com", "testPassword");

        Mockito.when(userRepository.findByEmail(loginRequest.getEmail())).thenReturn(userEntity);
        UserDetails actualResult = authService.login(loginRequest);

        assertThat(actualResult.getUsername()).isEqualTo(expectedUserResult.getUsername());
    }
}
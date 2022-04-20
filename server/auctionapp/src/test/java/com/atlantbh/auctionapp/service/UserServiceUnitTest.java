package com.atlantbh.auctionapp.service;

import com.atlantbh.auctionapp.domain.model.User;
import com.atlantbh.auctionapp.model.UserEntity;
import com.atlantbh.auctionapp.repository.UserRepository;
import com.atlantbh.auctionapp.request.UpdateUserRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Date;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;


@ExtendWith(MockitoExtension.class)
public class UserServiceUnitTest {

    @Mock
    private UserRepository userRepository;

    UserService userService;

    @BeforeEach
    void setUp() {
        userService = new UserService(userRepository);
    }

    @Test
    @DisplayName("Test if User is returned if user is found by email")
    void loadUserByUsername() {
        UserEntity userEntity = new UserEntity("Safet", "Pojskic", "test@gmail.com", "testPassword");
        User expectedUserResult = new User(1L, "Safet", "Pojskic", "test@gmail.com", "testPassword");

        Mockito.when(userRepository.findByEmail("test@gmail.com")).thenReturn(userEntity);
        UserDetails actualResult = userService.loadUserByUsername("test@gmail.com");

        assertThat(actualResult.getUsername()).isEqualTo(expectedUserResult.getUsername());
    }

    @Test
    @DisplayName("Test if NotFoundException is returned if user is not found by email")
    void returnExceptionNotFoundOnFindByEmail() {
        assertThatThrownBy(() -> userService.loadUserByUsername("test@gmail.com")).isInstanceOf(UsernameNotFoundException.class);
    }

    @Test
    @DisplayName("Update user test should return UserNotFoundException if user is not found by email")
    void testUpdateUserShouldReturnException() {
        UpdateUserRequest updateUserRequest = new UpdateUserRequest("Safet", "Pojskic", "email@gmail.com", "+123123123", new Date(), "address", "city", "72000", "state", "country", "image");
        assertThatThrownBy(() -> userService.updateUser(updateUserRequest)).isInstanceOf(UsernameNotFoundException.class);
    }

    @Test
    @DisplayName("Update user successfully")
    void testUpdateUserShouldSaveUser() {
        UpdateUserRequest updateUserRequest = new UpdateUserRequest("Safet", "Pojskic", "email@gmail.com", "+123123123", new Date(), "address", "city", "72000", "state", "country", "image");
        UserEntity userEntity = new UserEntity("Safet", "Pojskic", "email@gmail.com", "testPassword");

        Mockito.when(userRepository.findByEmail("email@gmail.com")).thenReturn(userEntity);

        userService.updateUser(updateUserRequest);
        Mockito.verify(userRepository, Mockito.times(1)).save(ArgumentMatchers.any(UserEntity.class));
    }

    @Test
    @DisplayName("Deactivate user and save it to database")
    void testDeactivateUser() {
        UserEntity userEntity = new UserEntity("Safet", "Pojskic", "email@gmail.com", "pw", new Date(), true, "state", "address", "city", "72000",  "country", "+123123", "image", null, null);

        userEntity.setId(1L);

        Mockito.when(userRepository.findById(1L)).thenReturn(java.util.Optional.of(userEntity));

        userService.deactivateUser(1L);
        Mockito.verify(userRepository, Mockito.times(1)).save(ArgumentMatchers.any(UserEntity.class));
    }

    @Test
    @DisplayName("Deactivate user service should throw exception for nonexisting user")
    void testDeactivateUserAndReturnException() {
        assertThatThrownBy(() -> userService.deactivateUser(1L)).isInstanceOf(UsernameNotFoundException.class);
    }
}

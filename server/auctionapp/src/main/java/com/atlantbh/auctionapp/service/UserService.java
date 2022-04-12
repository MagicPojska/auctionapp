package com.atlantbh.auctionapp.service;

import com.atlantbh.auctionapp.domain.model.User;
import com.atlantbh.auctionapp.model.UserEntity;
import com.atlantbh.auctionapp.repository.UserRepository;
import com.atlantbh.auctionapp.request.UpdateUserRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        UserEntity userRes = userRepository.findByEmail(email);
        if(userRes == null){
            logger.error("User with email: " + email + " not found");
            throw new UsernameNotFoundException("Could not findUser with email = " + email);
        }
        return User.createFromEntity(userRes);
    }

    public UserEntity updateUser(UpdateUserRequest updateUserRequest) {
        UserEntity existingUser = userRepository.findByEmail(updateUserRequest.getEmail());
        if(existingUser == null){
            logger.error("User with email: " + updateUserRequest.getEmail() + " not found");
            throw new UsernameNotFoundException("Could not findUser with email = " + updateUserRequest.getEmail());
        }
        existingUser.setFirstName(updateUserRequest.getFirstName());
        existingUser.setLastName(updateUserRequest.getLastName());
        existingUser.setDateOfBirth(updateUserRequest.getDateOfBirth());
        existingUser.setPhone(updateUserRequest.getPhone());
        existingUser.setAddress(updateUserRequest.getAddress());
        existingUser.setCity(updateUserRequest.getCity());
        existingUser.setState(updateUserRequest.getState());
        existingUser.setCountry(updateUserRequest.getCountry());
        existingUser.setZipCode(updateUserRequest.getZipCode());
        existingUser.setProfileImage(updateUserRequest.getProfileImage());

        return userRepository.save(existingUser);
    }

    public void deactivateUser(Long userId) {
        UserEntity existingUser = userRepository.findById(userId).orElse(null);
        if(existingUser == null){
            logger.error("User with id: " + userId + " not found");
            throw new UsernameNotFoundException("Could not findUser with id = " + userId);
        }
        existingUser.setActive(false);
        userRepository.save(existingUser);
    }
}





package com.atlantbh.auctionapp.service;

import com.atlantbh.auctionapp.model.User;
import com.atlantbh.auctionapp.repository.UserRepository;
import com.atlantbh.auctionapp.request.LoginRequest;
import com.atlantbh.auctionapp.request.RegisterRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User register(RegisterRequest registerRequest){
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email is already in use");
        }
        User user = userRepository.save(new User(
                registerRequest.getFirstName(),
                registerRequest.getLastName(),
                registerRequest.getEmail(),
                passwordEncoder.encode(registerRequest.getPassword())
        ));
        user.setPassword(null);
        return user;
    }

    public User login(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail());
        if (user == null || !passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("The email address or password you entered is not valid");
        }
        user.setPassword(null);
        return user;
    }
}

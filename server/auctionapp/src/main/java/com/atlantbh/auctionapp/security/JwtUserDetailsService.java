package com.atlantbh.auctionapp.security;

import com.atlantbh.auctionapp.model.User;
import com.atlantbh.auctionapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class JwtUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User userRes = userRepository.findByEmail(email);
        if(userRes == null){
            throw new UsernameNotFoundException("Could not findUser with email = " + email);
        }
        return new org.springframework.security.core.userdetails.User(userRes.getEmail(), userRes.getPassword(),
                new ArrayList<>());
    }
}

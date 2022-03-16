package com.atlantbh.auctionapp.service;

import com.atlantbh.auctionapp.domain.model.User;
import com.atlantbh.auctionapp.exceptions.ConflictException;
import com.atlantbh.auctionapp.model.UserEntity;
import com.atlantbh.auctionapp.repository.UserRepository;
import com.atlantbh.auctionapp.request.LoginRequest;
import com.atlantbh.auctionapp.request.RegisterRequest;
import com.atlantbh.auctionapp.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jsonWebToken;
    @Autowired
    private AuthenticationManager authenticationManager;

    public final String AUTHORIZATION = "Authorization";
    public final String BEARER = "Bearer ";

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User register(RegisterRequest registerRequest) throws ConflictException {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new ConflictException("Email is already in use.");
        }
        UserEntity entity = new UserEntity(
                registerRequest.getFirstName(),
                registerRequest.getLastName(),
                registerRequest.getEmail(),
                passwordEncoder.encode(registerRequest.getPassword()));
        userRepository.save(entity);

        entity.setPassword(null);
        return User.createFromEntity(entity);
    }

    public User login(LoginRequest loginRequest) {
        UserEntity entity = userRepository.findByEmail(loginRequest.getEmail());
        entity.setPassword(null);

        return User.createFromEntity(entity);
    }

    public String logout(HttpServletRequest request){
        final String requestTokenHeader = request.getHeader(AUTHORIZATION);
        String token = null;

        if (requestTokenHeader != null && requestTokenHeader.startsWith(BEARER)) {
            token = requestTokenHeader.substring(BEARER.length());
        }

        jsonWebToken.invalidateToken(token);
        return "User has been logged out!";
    }

    public void authenticate(String email, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        UserEntity userRes = userRepository.findByEmail(email);
        if(userRes == null){
            throw new UsernameNotFoundException("Could not findUser with email = " + email);
        }
        return User.createFromEntity(userRes);
    }
}





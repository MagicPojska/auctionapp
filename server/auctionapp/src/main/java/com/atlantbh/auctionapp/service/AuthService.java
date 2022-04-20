package com.atlantbh.auctionapp.service;

import com.atlantbh.auctionapp.domain.model.User;
import com.atlantbh.auctionapp.exceptions.BadRequestException;
import com.atlantbh.auctionapp.exceptions.ConflictException;
import com.atlantbh.auctionapp.exceptions.NotFoundException;
import com.atlantbh.auctionapp.exceptions.UnathorizedException;
import com.atlantbh.auctionapp.model.UserEntity;
import com.atlantbh.auctionapp.repository.UserRepository;
import com.atlantbh.auctionapp.request.LoginRequest;
import com.atlantbh.auctionapp.request.RegisterRequest;
import com.atlantbh.auctionapp.request.ResetPasswordRequest;
import com.atlantbh.auctionapp.security.JwtUtil;
import net.bytebuddy.utility.RandomString;
import com.atlantbh.auctionapp.utilities.PasswordValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jsonWebToken;
    private final AuthenticationManager authenticationManager;
    private final JavaMailSender mailSender;

    private static String allowedURL;
    @Value("${app.cors.allowed-domain}")
    public void setAllowedURL(String allowedURL) {
        AuthService.allowedURL = allowedURL;
    }

    Logger logger = LoggerFactory.getLogger(AuthService.class);

    public final String AUTHORIZATION = "Authorization";
    public final String BEARER = "Bearer ";

    @Autowired
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jsonWebToken, AuthenticationManager authenticationManager, JavaMailSender mailSender) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jsonWebToken = jsonWebToken;
        this.authenticationManager = authenticationManager;
        this.mailSender = mailSender;
    }

    public User register(RegisterRequest registerRequest) throws ConflictException {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            logger.error("User with email: " + registerRequest.getEmail() + " already exists");
            throw new ConflictException("Email is already in use.");
        }
        if(!PasswordValidator.isValid(registerRequest.getPassword())) {
            logger.error("Invalid password");
            throw new BadRequestException("Invalid password");
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
        if(!entity.isActive()) {
            logger.error("User with email: " + loginRequest.getEmail() + " is deactivated");
            throw new UnathorizedException("User is deactivated.");
        }

        entity.setPassword(null);

        return User.createFromEntity(entity);
    }

    public void logout(HttpServletRequest request){
        final String requestTokenHeader = request.getHeader(AUTHORIZATION);
        String token = null;

        if (requestTokenHeader != null && requestTokenHeader.startsWith(BEARER)) {
            token = requestTokenHeader.substring(BEARER.length());
        }

        jsonWebToken.invalidateToken(token);
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

    public String updateResetPasswordToken(String email) throws MessagingException, UnsupportedEncodingException {
        UserEntity userEntity = userRepository.findByEmail(email);
        String token = RandomString.make(30);
        String url = allowedURL + "/reset-password/" + token;
        if (userEntity != null) {
            userEntity.setResetPasswordToken(token);
            userEntity.setResetPasswordTokenCreatedAt(LocalDateTime.now());
            userRepository.save(userEntity);
            sendEmail(email, url);
        } else {
            logger.error("User with email: " + email + " does not exist.");
            throw new NotFoundException("User with email: " + email + " does not exist.");
        }

        return "Please check your email for the reset password link.";
    }

    public String updatePassword(ResetPasswordRequest resetPasswordRequest) {
        UserEntity userEntity = userRepository.findByResetPasswordToken(resetPasswordRequest.getToken());
        if (userEntity == null) {
            logger.error("User with token: " + resetPasswordRequest.getToken() + " does not exist.");
            throw new NotFoundException("User with token: " + resetPasswordRequest.getToken() + " does not exist.");
        }
        if(!LocalDateTime.now().isBefore(userEntity.getResetPasswordTokenCreatedAt().plusMinutes(30))) {
            logger.error("Token: " + resetPasswordRequest.getToken() + " is expired.");
            throw new UnathorizedException("Token is expired.");
        }

        
        String encodedPassword = passwordEncoder.encode(resetPasswordRequest.getPassword());
        userEntity.setPassword(encodedPassword);

        userEntity.setResetPasswordToken(null);
        userEntity.setResetPasswordTokenCreatedAt(null);
        userRepository.save(userEntity);

        return "User password updated successfully.";
    }

    public void sendEmail(String recipientEmail, String link) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom("auctionapptest123@gmail.com", "Auctionapp Support");
        helper.setTo(recipientEmail);

        String subject = "Here's the link to reset your password";

        String content = "<p>Hello,</p>"
                + "<p>You have requested to reset your password.</p>"
                + "<p>Click the link below to change your password:</p>"
                + "<p><a href=\"" + link + "\">Change my password</a></p>"
                + "<br>"
                + "<p>Ignore this email if you do remember your password, "
                + "or you have not made the request.</p>";

        helper.setSubject(subject);
        helper.setText(content, true);
        mailSender.send(message);
    }

}

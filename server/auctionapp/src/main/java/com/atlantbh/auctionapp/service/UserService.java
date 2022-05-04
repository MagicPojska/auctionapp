package com.atlantbh.auctionapp.service;

import com.atlantbh.auctionapp.domain.model.User;
import com.atlantbh.auctionapp.exceptions.BadRequestException;
import com.atlantbh.auctionapp.model.CardEntity;
import com.atlantbh.auctionapp.model.UserEntity;
import com.atlantbh.auctionapp.repository.CardRepository;
import com.atlantbh.auctionapp.repository.UserRepository;
import com.atlantbh.auctionapp.request.UpdateCardRequest;
import com.atlantbh.auctionapp.request.UpdateUserRequest;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final CardRepository cardRepository;
    private final StripeService stripeService;
    Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    public UserService(UserRepository userRepository, CardRepository cardRepository, StripeService stripeService) {
        this.userRepository = userRepository;
        this.cardRepository = cardRepository;
        this.stripeService = stripeService;
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
        if(updateUserRequest.getDateOfBirth().after(new Date())){
            logger.error("Date of birth can not be in the future");
            throw new IllegalArgumentException("Date of birth can not be in the future");
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

        if(updateUserRequest.getCard() != null) {
            updateCard(existingUser, updateUserRequest.getCard());
        }

        try {
            stripeService.updateCustomer(existingUser);
        } catch (StripeException ignore) {
        }

        return userRepository.save(existingUser);
    }

    public CardEntity updateCard(UserEntity existingUser, UpdateCardRequest card) {
        CardEntity existingCard = cardRepository.findByUserId(existingUser.getId());
        if (!card.getCardNumber().matches("^(\\d*)$")) {
            logger.error("Card number is not valid");
            throw new BadRequestException("Card number can only contain digits");
        }
        if(existingCard == null){
            existingCard = new CardEntity(card.getCardNumber(), card.getCardHolderName(), card.getExpirationMonth(), card.getExpirationYear(), card.getCvc(), existingUser);
            String stripeCardId;
            try {
                stripeCardId = stripeService.saveCard(existingCard, existingUser, true);
            } catch (StripeException e) {
                throw new BadRequestException(e.getStripeError().getMessage());
            }
            existingCard.setStripeCardId(stripeCardId);
            cardRepository.save(existingCard);
        } else {
            existingCard.setCardNumber(card.getCardNumber());
            existingCard.setCardHolderName(card.getCardHolderName());
            existingCard.setExpirationMonth(card.getExpirationMonth());
            existingCard.setExpirationYear(card.getExpirationYear());
            existingCard.setCvc(card.getCvc());
            try {
                stripeService.updateCard(existingCard, existingUser);
            } catch (StripeException e) {
                throw new BadRequestException(e.getStripeError().getMessage());
            }

            cardRepository.save(existingCard);
        }

        return existingCard;
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





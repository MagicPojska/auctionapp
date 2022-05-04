package com.atlantbh.auctionapp.service;

import com.atlantbh.auctionapp.model.CardEntity;
import com.atlantbh.auctionapp.model.UserEntity;
import com.atlantbh.auctionapp.repository.BidRepository;
import com.atlantbh.auctionapp.repository.CategoryRepository;
import com.atlantbh.auctionapp.repository.ProductRepository;
import com.atlantbh.auctionapp.repository.UserRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Card;
import com.stripe.model.Charge;
import com.stripe.model.Customer;
import com.stripe.model.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StripeService {
    private String stripeApiKey;
    private final UserRepository userRepository;

    @Value("${STRIPE.SECRET_KEY}")
    public void setSecretKey(String secretKey) {
        this.stripeApiKey = secretKey;
    }

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeApiKey;
    }

    @Autowired
    public StripeService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String pay(Integer amount, String stripeCustomerId, String stripeCardId, String description, String stripeSellerId) throws StripeException {
        Stripe.apiKey = stripeApiKey;

        Map<String, Object> params = new HashMap<>();
        params.put("amount", amount);
        params.put("currency", "usd");
        params.put("customer", stripeCustomerId);
        params.put("source", stripeCardId);
        params.put("description", description);

        Map<String, Object> transferDataParams = new HashMap<>();
        transferDataParams.put("destination", stripeSellerId);
        params.put("transfer_data", transferDataParams);

        Charge charge = Charge.create(params);
        return charge.getId();
    }

    public String saveCustomer(UserEntity user) throws StripeException {
        Stripe.apiKey = stripeApiKey;

        Map<String, Object> params = new HashMap<>();
        params.put("name", user.getFirstName() + " " + user.getLastName());
        params.put("email", user.getEmail());
        params.put("description", user.getId());

        Customer customer = Customer.create(params);
        return customer.getId();
    }

    public String updateCustomer(UserEntity user) throws StripeException {
        Stripe.apiKey = stripeApiKey;

        Customer customer = Customer.retrieve(user.getStripeCustomerId());

        Map<String, Object> params = new HashMap<>();
        params.put("email", user.getEmail());

        Customer updatedCustomer = customer.update(params);

        return updatedCustomer.getId();
    }

    public String updateCard(CardEntity newCard, UserEntity user) throws StripeException {
        Stripe.apiKey = stripeApiKey;

        Map<String, Object> retrieveParams = new HashMap<>();
        List<String> expandList = new ArrayList<>();
        expandList.add("sources");
        retrieveParams.put("expand", expandList);
        Customer customer = Customer.retrieve(user.getStripeCustomerId(), retrieveParams, null);

        Card card = (Card) customer.getSources().retrieve(newCard.getStripeCardId());

        Map<String, Object> params = new HashMap<>();
        params.put("exp_month", newCard.getExpirationMonth());
        params.put("exp_year", newCard.getExpirationYear());
        params.put("name", newCard.getCardHolderName());

        Card updatedCard = card.update(params);
        return updatedCard.getId();
    }

    public String saveCard(CardEntity newCard, UserEntity user, Boolean newDefault) throws StripeException {
        Stripe.apiKey = stripeApiKey;

        String stripeCustomerId = user.getStripeCustomerId();

        if (stripeCustomerId == null) {
            stripeCustomerId = saveCustomer(user);
            user.setStripeCustomerId(stripeCustomerId);
            userRepository.save(user);
        }

        Map<String, Object> retrieveParams = new HashMap<>();
        List<String> expandList = new ArrayList<>();
        expandList.add("sources");
        retrieveParams.put("expand", expandList);
        Customer customer = Customer.retrieve(stripeCustomerId, retrieveParams, null);

        Map<String, Object> params = new HashMap<>();
        Token token = generateCardToken(newCard, user);
        params.put("source", token.getId());

        Card card = (Card) customer.getSources().create(params);
        String cardId = card.getId();

        if (newDefault) {
            Map<String, Object> customerParams = new HashMap<>();
            customerParams.put("default_source", cardId);
            customer.update(customerParams);
        }

        return cardId;
    }

    private Token generateCardToken(CardEntity newCard, UserEntity user) throws StripeException {
        Map<String, Object> params = new HashMap<>();

        Map<String, Object> card = new HashMap<>();
        card.put("number", newCard.getCardNumber());
        card.put("exp_month", newCard.getExpirationMonth());
        card.put("exp_year", newCard.getExpirationYear());
        card.put("cvc", newCard.getCvc());
        card.put("name", newCard.getCardHolderName());
        params.put("card", card);

        return Token.create(params);
    }


}

package com.atlantbh.auctionapp.domain.model;

import com.atlantbh.auctionapp.model.UserEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class Card {
    private Long id;

    private String cardNumber;

    private String cardHolderName;

    private Integer expirationMonth;

    private Integer expirationYear;

    private Integer cvc;

    private String stripeCardId;

    private UserEntity user;

    public Card(String cardNumber, String cardHolderName, Integer expirationMonth, Integer expirationYear, Integer cvc, String stripeCardId, UserEntity user) {
        this.cardNumber = cardNumber;
        this.cardHolderName = cardHolderName;
        this.expirationMonth = expirationMonth;
        this.expirationYear = expirationYear;
        this.cvc = cvc;
        this.stripeCardId = stripeCardId;
        this.user = user;
    }

    public Card(String cardNumber, String cardHolderName, Integer expirationMonth, Integer expirationYear, Integer cvc, UserEntity user) {
        this.cardNumber = cardNumber;
        this.cardHolderName = cardHolderName;
        this.expirationMonth = expirationMonth;
        this.expirationYear = expirationYear;
        this.cvc = cvc;
        this.user = user;
    }
}

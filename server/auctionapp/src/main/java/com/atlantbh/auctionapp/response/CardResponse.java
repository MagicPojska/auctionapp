package com.atlantbh.auctionapp.response;

import com.atlantbh.auctionapp.model.CardEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class CardResponse {
    private String cardHolderName;
    private String cardNumber;
    private Long userId;

    public CardResponse(CardEntity cardEntity) {
        this.cardHolderName = cardEntity.getCardHolderName();
        this.cardNumber = cardEntity.getCardNumber();
        this.userId = cardEntity.getUser().getId();
    }
}

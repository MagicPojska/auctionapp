package com.atlantbh.auctionapp.service;

import com.atlantbh.auctionapp.exceptions.NotFoundException;
import com.atlantbh.auctionapp.model.CardEntity;
import com.atlantbh.auctionapp.repository.CardRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CardService {

    CardRepository cardRepository;

    Logger logger = LoggerFactory.getLogger(ProductService.class);

    @Autowired
    public CardService(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    public CardEntity getCard(long userId) {
        CardEntity card = cardRepository.findByUserId(userId);
        if (card == null) {
            logger.error("Card not found for user with id: " + userId);
            throw new NotFoundException("Card not found for user with id: " + userId);
        }
        return card;
    }
}

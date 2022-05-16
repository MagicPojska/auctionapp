package com.atlantbh.auctionapp.controllers;

import com.atlantbh.auctionapp.model.CardEntity;
import com.atlantbh.auctionapp.response.CardResponse;
import com.atlantbh.auctionapp.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/card")
public class CardController {

    private final CardService cardService;

    @Autowired
    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @GetMapping
    public ResponseEntity<CardResponse> getCard(@RequestParam long userId) {
        return new ResponseEntity<>(new CardResponse(cardService.getCard(userId)), new HttpHeaders(), HttpStatus.OK) ;
    }
}

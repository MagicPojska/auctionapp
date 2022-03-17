package com.atlantbh.auctionapp.controllers;

import com.atlantbh.auctionapp.projections.BidProj;
import com.atlantbh.auctionapp.service.BidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bids")
public class BidController {
    @Autowired
    private BidService bidService;

    @GetMapping("/product")
    public ResponseEntity<List<BidProj>> getBidsForProduct(@RequestParam long id){
        return ResponseEntity.ok(bidService.getBidsForProduct(id));
    }
}

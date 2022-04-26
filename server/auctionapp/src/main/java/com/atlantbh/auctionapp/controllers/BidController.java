package com.atlantbh.auctionapp.controllers;

import com.atlantbh.auctionapp.model.BidsEntity;
import com.atlantbh.auctionapp.projections.BidProj;
import com.atlantbh.auctionapp.request.BidRequest;
import com.atlantbh.auctionapp.response.BidResponse;
import com.atlantbh.auctionapp.service.BidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bids")
public class BidController {

    private final BidService bidService;

    @Autowired
    public BidController(BidService bidService) {
        this.bidService = bidService;
    }

    @GetMapping("/product")
    public ResponseEntity<Page<BidProj>> getBidsForProduct(@RequestParam long id, @RequestParam(defaultValue = "0") Integer pageNumber){
        return ResponseEntity.ok(bidService.getBidsForProduct(id, pageNumber));
    }

    @PostMapping("/add")
    public ResponseEntity<BidResponse> addBid(@RequestBody BidRequest bidRequest){
        BidResponse bid = bidService.add(bidRequest);

        return new ResponseEntity<>(bid, new HttpHeaders(), HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<List<BidsEntity>> getBidsForUser(@RequestParam long id){
        List<BidsEntity> bids = bidService.getBidsForUserById(id);

        return new ResponseEntity<>(bids, new HttpHeaders(), HttpStatus.OK);
    }

    @GetMapping("/highest-bidder")
    public ResponseEntity<Object> getHighestBidder(@RequestParam long productId){
        return ResponseEntity.ok(bidService.getHighestBidder(productId));
    }
}

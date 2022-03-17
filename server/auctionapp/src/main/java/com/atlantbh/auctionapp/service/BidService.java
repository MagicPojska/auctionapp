package com.atlantbh.auctionapp.service;

import com.atlantbh.auctionapp.exceptions.NotFoundException;
import com.atlantbh.auctionapp.model.BidsEntity;
import com.atlantbh.auctionapp.repository.BidRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BidService {
    @Autowired
    private BidRepository bidRepository;

    public List<BidsEntity> getBidsForProduct(long id){
        List<BidsEntity> bids = bidRepository.findAllByUserId(id);
        if(bids.isEmpty()){
            throw new NotFoundException("Bids for product with id:" + id + " do not exist");
        }
        return bids;
    }
}

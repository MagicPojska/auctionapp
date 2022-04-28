package com.atlantbh.auctionapp.service;

import com.atlantbh.auctionapp.exceptions.BadRequestException;
import com.atlantbh.auctionapp.exceptions.NotFoundException;
import com.atlantbh.auctionapp.model.BidsEntity;
import com.atlantbh.auctionapp.model.ProductEntity;
import com.atlantbh.auctionapp.model.UserEntity;
import com.atlantbh.auctionapp.projections.BidProj;
import com.atlantbh.auctionapp.projections.HighestBidderProj;
import com.atlantbh.auctionapp.repository.BidRepository;
import com.atlantbh.auctionapp.repository.ProductRepository;
import com.atlantbh.auctionapp.repository.UserRepository;
import com.atlantbh.auctionapp.request.BidRequest;
import com.atlantbh.auctionapp.response.BidResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BidService {

    private final BidRepository bidRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    Logger logger = LoggerFactory.getLogger(BidService.class);

    @Autowired
    public BidService(BidRepository bidRepository, ProductRepository productRepository, UserRepository userRepository) {
        this.bidRepository = bidRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    public Page<BidProj> getBidsForProduct(long id, Integer pageNumber){
        Page<BidProj> bids = bidRepository.findAllByProductId(id, PageRequest.of(pageNumber, 5, Sort.by(Sort.Direction.DESC, "bidDate")));
        if(bids.isEmpty()) {
            logger.error("No bids found for product with id: " + id);
            throw new NotFoundException("Bids for product with id:" + id + " do not exist");
        }

        return bids;
    }

    public BidResponse add(BidRequest bidRequest){
        ProductEntity product = productRepository.findProductById(bidRequest.getProductId());
        if (product.getStartPrice() >= bidRequest.getPrice()) {
            logger.error("Bid price is lower than start price");
            throw new BadRequestException("Price can't be lower than the product start price");
        }
        if (product.getEndDate().isBefore(LocalDateTime.now())) {
            logger.error("Bid can't be placed for a product that has already ended");
            throw new BadRequestException("Auction ended for this product");
        }

        UserEntity user = userRepository.getById(bidRequest.getUserId());
        if (product.getUserId() == user.getId()) {
            logger.error("User can't bid on his own product");
            throw new BadRequestException("You can't bid on your own product");
        }

        Double maxBid = bidRepository.getMaxBidFromProduct(product.getId());
        if (maxBid != null && maxBid >= bidRequest.getPrice()) {
            logger.error("Bid price is lower than current max bid");
            throw new BadRequestException("Price can't be lower than highest bid of $" + maxBid);
        }
        bidRepository.save(new BidsEntity(bidRequest.getPrice(), user, product));

        return new BidResponse(bidRequest.getPrice(), product.getNumberOfBids() + 1);
    }

    public List<BidsEntity> getBidsForUserById(long id) {
        List<BidsEntity> bids = bidRepository.findAllByUserId(id, Sort.by(Sort.Direction.DESC, "bidDate"));
        if(bids.isEmpty()) {
            throw new NotFoundException("Bids from user with id: " + id + " not found");
        }
        return bids;
    }
}

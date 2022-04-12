package com.atlantbh.auctionapp.response;

import com.atlantbh.auctionapp.model.ProductEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ProductResponse {
    Page<ProductEntity> products;
    String suggestion;
}

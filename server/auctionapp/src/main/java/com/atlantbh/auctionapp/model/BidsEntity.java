package com.atlantbh.auctionapp.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.Positive;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "Bids", schema="auction")
public class BidsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Positive(message = "value must be positive")
    @Column(nullable = false)
    private BigDecimal price;

    @CreationTimestamp
    @Column(nullable = false)
    private LocalDateTime bidDate;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "productId", nullable = false)
    private ProductEntity product;

    public BidsEntity(BigDecimal price, UserEntity user, ProductEntity product) {
        this.price = price;
        this.user = user;
        this.product = product;
    }
}

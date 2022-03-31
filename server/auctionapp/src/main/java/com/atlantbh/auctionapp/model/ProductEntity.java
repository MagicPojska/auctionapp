package com.atlantbh.auctionapp.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "Product", schema="auction")
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 100)
    @Column(nullable = false)
    private String productName;

    @Size(max = 700)
    @Column(nullable = false, columnDefinition="TEXT")
    private String description;

    @Positive
    @Column(nullable = false, precision = 10, scale = 2)
    private double startPrice;

    @Column(nullable = false)
    private LocalDateTime startDate;

    @NotBlank
    @Column(nullable = false)
    private LocalDateTime endDate;

    @NotBlank
    @Column(nullable = false, columnDefinition="TEXT")
    private String images;

    @NotBlank
    @Column(nullable = false)
    private String address;

    @NotBlank
    @Column(nullable = false)
    private String city;

    @NotBlank
    @Column(nullable = false)
    @javax.validation.constraints.Size(max = 32)
    private String zipCode;

    @NotBlank
    @Column(nullable = false)
    private String country;

    @NotBlank
    @Column(nullable = false)
    @javax.validation.constraints.Size(max = 32)
    private String phone;

    @NotBlank
    @Column(nullable = false)
    private long userId;

    @Formula("(SELECT b.price FROM auction.bids b INNER JOIN auction.product p on p.id = b.product_id " +
            "WHERE b.product_id = id ORDER BY b.price DESC LIMIT 1)")
    private BigDecimal highestBid;

    @Formula("(SELECT COUNT(*) FROM auction.bids b INNER JOIN auction.product p on p.id = b.product_id " +
            "WHERE b.product_id = id)")
    private Integer numberOfBids;

    @ManyToOne
    @JoinColumn(name = "categoryId", nullable = false)
    private CategoryEntity category;

    public ProductEntity(String productName, String description, double startPrice, LocalDateTime startDate, LocalDateTime endDate, String images, String address, String city, String zipCode, String country, String phone, long userId, CategoryEntity category) {
        this.productName = productName;
        this.description = description;
        this.startPrice = startPrice;
        this.startDate = startDate;
        this.endDate = endDate;
        this.images = images;
        this.address = address;
        this.city = city;
        this.zipCode = zipCode;
        this.country = country;
        this.phone = phone;
        this.userId = userId;
        this.category = category;
    }
}

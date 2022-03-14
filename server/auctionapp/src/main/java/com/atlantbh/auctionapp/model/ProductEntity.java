package com.atlantbh.auctionapp.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@NoArgsConstructor
@Setter
@Getter
@Entity
//This line of code doesn't work in production, so it needs to be removed
@Table(name = "Product", schema="auction")
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 100)
    @Column(nullable = false)
    private String productName;

    @Size(max = 255)
    @Column(nullable = false)
    private String description;

    @Positive
    @Column(nullable = false)
    private Float startPrice;

    @Column(nullable = false)
    private LocalDateTime startDate;

    @Column(nullable = false)
    private LocalDateTime endDate;

    @Column(nullable = false)
    private String images;

    @Column(nullable = false)
    private long userId;

    @ManyToOne
    @JoinColumn(name = "categoryId", nullable = false)
    private CategoryEntity category;

    public ProductEntity(String productName, String description, Float startPrice, LocalDateTime startDate, LocalDateTime endDate, String images, long userId, CategoryEntity category) {
        this.productName = productName;
        this.description = description;
        this.startPrice = startPrice;
        this.startDate = startDate;
        this.endDate = endDate;
        this.images = images;
        this.userId = userId;
        this.category = category;
    }
}

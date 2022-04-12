package com.atlantbh.auctionapp.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "Category", schema="auction")
public class CategoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 50)
    @Column(nullable = false)
    private String categoryName;

    @Column(nullable = false)
    private String description;

    @Column(nullable = true)
    private Integer supercategoryId;

    @Formula("(SELECT COUNT(*) FROM auction.product p WHERE p.category_id = id AND p.end_date > NOW() AND p.start_date < NOW())")
    private Integer numberOfProducts;

    public CategoryEntity(String categoryName, String description, Integer supercategoryId) {
        this.categoryName = categoryName;
        this.description = description;
        this.supercategoryId = supercategoryId;
    }
}

package com.atlantbh.auctionapp.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@NoArgsConstructor
@Setter
@Getter
@Entity
//This line of code doesn't work in production, so it needs to be removed
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

    public CategoryEntity(String categoryName, String description, Integer supercategoryId) {
        this.categoryName = categoryName;
        this.description = description;
        this.supercategoryId = supercategoryId;
    }
}

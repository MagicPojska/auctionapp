package com.atlantbh.auctionapp.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Collections;

@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "Card", schema="auction")
public class CardEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    @Size(max = 19)
    @Size(min = 13)
    private String cardNumber;

    @NotBlank
    @Column(nullable = false)
    private String cardHolderName;

    @Column(nullable = false)
    @Min(1)
    @Max(12)
    private Integer expirationMonth;

    @Column(nullable = false)
    @Min(2000)
    @Max(9999)
    private Integer expirationYear;

    @Column(nullable = false)
    @Min(100)
    @Max(9999)
    private Integer cvc;

    @Column(nullable = false)
    private String stripeCardId;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private UserEntity user;

    public CardEntity(String cardNumber, String cardHolderName, Integer expirationMonth, Integer expirationYear, Integer cvc, UserEntity user) {
        this.cardNumber = cardNumber;
        this.cardHolderName = cardHolderName;
        this.expirationMonth = expirationMonth;
        this.expirationYear = expirationYear;
        this.cvc = cvc;
        this.user = user;
    }

    public String getMaskedCardNumber() {
        if (cardNumber == null)
            return null;
        return String.join("", Collections.nCopies(cardNumber.length() - 4, "*")) + cardNumber.substring(cardNumber.length() - 4);
    }
}

package com.atlantbh.auctionapp.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.Date;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "User", schema="auction")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank
    @Column(nullable = false)
    private String firstName;

    @NotBlank
    @Column(nullable = false)
    private String lastName;

    @NotBlank
    @Email(regexp = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}")
    @Column(nullable = false, unique = true)
    private String email;

    @NotBlank
    @Column(nullable = false)
    @Size(max = 255)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private Date dateOfBirth;

    private boolean isActive = true;

    private String state;

    private String address;

    private String city;

    @javax.validation.constraints.Size(max = 32)
    private String zipCode;

    private String country;

    @javax.validation.constraints.Size(max = 32)
    private String phone;

    private String profileImage;

    @javax.validation.constraints.Size(max = 32)
    private String resetPasswordToken;

    private LocalDateTime resetPasswordTokenCreatedAt;

    public UserEntity(String firstName, String lastName, String email, String password, Date dateOfBirth, boolean isActive, String state, String address, String city, String zipCode, String country, String phone, String profileImage, String resetPasswordToken, LocalDateTime resetPasswordTokenCreatedAt) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.isActive = isActive;
        this.state = state;
        this.address = address;
        this.city = city;
        this.zipCode = zipCode;
        this.country = country;
        this.phone = phone;
        this.profileImage = profileImage;
        this.resetPasswordToken = resetPasswordToken;
        this.resetPasswordTokenCreatedAt = resetPasswordTokenCreatedAt;
    }

    public UserEntity(String firstName, String lastName, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}

package com.atlantbh.auctionapp.domain.model;


import com.atlantbh.auctionapp.model.UserEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class User implements UserDetails {

    private long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String address;
    private String city;
    private String country;
    private String phone;
    private String zipCode;

    public User(long id, String firstName, String lastName, String email, String password, String address, String city, String country, String phone, String zipCode) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.address = address;
        this.city = city;
        this.country = country;
        this.phone = phone;
        this.zipCode = zipCode;
    }

    public static User createFromEntity(UserEntity entity) {
        return new User(entity.getId(), entity.getFirstName(), entity.getLastName(), entity.getEmail(), entity.getPassword(), entity.getAddress(), entity.getCity(), entity.getCountry(), entity.getPhone(), entity.getZipCode());
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setUsername(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


}

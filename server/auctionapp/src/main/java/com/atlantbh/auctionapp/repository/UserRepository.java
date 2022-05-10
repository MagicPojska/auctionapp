package com.atlantbh.auctionapp.repository;

import com.atlantbh.auctionapp.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByEmail(String email);
    boolean existsByEmail(String email);
    UserEntity findByResetPasswordToken(String resetPasswordToken);
}

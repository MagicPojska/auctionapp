package com.atlantbh.auctionapp.repository;

import com.atlantbh.auctionapp.model.NotificationEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<NotificationEntity, Long> {
    List<NotificationEntity> findByUserId(Long userId, Sort sort);
    Integer countByUserIdAndCheckedFalse(Long userId);
}

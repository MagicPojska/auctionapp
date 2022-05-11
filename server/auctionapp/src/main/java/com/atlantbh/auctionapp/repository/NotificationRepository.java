package com.atlantbh.auctionapp.repository;

import com.atlantbh.auctionapp.model.NotificationEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<NotificationEntity, Long> {
    Page<NotificationEntity> findByUserId(Long userId, Pageable pageable);
    List<NotificationEntity> findAllByUserId(Long userId, Sort sort);
    Integer countByUserIdAndCheckedFalse(Long userId);

}

package com.atlantbh.auctionapp.service;

import com.atlantbh.auctionapp.exceptions.NotFoundException;
import com.atlantbh.auctionapp.model.NotificationEntity;
import com.atlantbh.auctionapp.repository.NotificationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final EmitterService emitterService;
    Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    public NotificationService(NotificationRepository notificationRepository, EmitterService emitterService) {
        this.notificationRepository = notificationRepository;
        this.emitterService = emitterService;
    }


    public List<NotificationEntity> getNotifications(Long userId) {
        List<NotificationEntity> notifications = notificationRepository.findByUserId(userId, Sort.by(Sort.Direction.DESC, "date"));
        if(notifications.isEmpty()) {
            logger.error("Notifications not found for user with id: " + userId);
            throw new NotFoundException("Notifications not found for user with id: " + userId);
        }
        return notifications;
    }

    public Integer getNumberOfNotifications(long userId) {
        return notificationRepository.countByUserIdAndCheckedFalse(userId);
    }


    public List<NotificationEntity> clearNotifications(long userId) {
        List<NotificationEntity> notifications = notificationRepository.findByUserId(userId, Sort.by(Sort.Direction.DESC, "date"));
        for(NotificationEntity notification : notifications) {
            notification.setChecked(true);
        }
        notificationRepository.saveAll(notifications);

        emitterService.pushNotification(notificationRepository.countByUserIdAndCheckedFalse(userId), userId);
        return notifications;
    }

    public void clearNotification(long userId, long notificationId) {
        NotificationEntity notification = notificationRepository.findById(notificationId).orElseThrow(() -> new NotFoundException("Notification not found with id: " + notificationId));
        notification.setChecked(true);
        notificationRepository.save(notification);

        emitterService.pushNotification(notificationRepository.countByUserIdAndCheckedFalse(userId), userId);
    }
}

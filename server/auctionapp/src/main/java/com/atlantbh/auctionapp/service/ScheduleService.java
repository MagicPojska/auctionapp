package com.atlantbh.auctionapp.service;

import com.atlantbh.auctionapp.model.NotificationEntity;
import com.atlantbh.auctionapp.model.ProductEntity;
import com.atlantbh.auctionapp.model.UserEntity;
import com.atlantbh.auctionapp.repository.NotificationRepository;
import com.atlantbh.auctionapp.repository.ProductRepository;
import com.atlantbh.auctionapp.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@EnableScheduling
public class ScheduleService {
    private final ProductRepository productRepository;
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final EmitterService emitterService;

    Logger logger = LoggerFactory.getLogger(UserService.class);

    public ScheduleService(ProductRepository productRepository, NotificationRepository notificationRepository, UserRepository userRepository, EmitterService emitterService) {
        this.productRepository = productRepository;
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
        this.emitterService = emitterService;
    }

    @Scheduled(fixedRate = 30 * 60000)
    public void notifyHighestBidder() {
        logger.info("Scheduled task started");
        LocalDateTime now = LocalDateTime.now();
        List<ProductEntity> expiredProducts = productRepository.findAllByEndDateBeforeAndEndDateAfterAndSoldFalse(now, now.minusMinutes(30));
        for (ProductEntity product : expiredProducts) {
            if (product.getHighestBidder() != null) {
                UserEntity user = userRepository.getById(product.getHighestBidder());
                notificationRepository.save(new NotificationEntity("success", product, user));

                emitterService.pushNotification(notificationRepository.countByUserIdAndCheckedFalse(product.getHighestBidder()), user.getId(), null, null);
            }
        }
    }
}

package com.atlantbh.auctionapp.controllers;

import com.atlantbh.auctionapp.model.NotificationEntity;
import com.atlantbh.auctionapp.service.EmitterService;
import com.atlantbh.auctionapp.service.NotificationService;
import com.atlantbh.auctionapp.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

@RestController
@RequestMapping("/notifications")
public class NotificationController {
    private final NotificationService notificationService;
    private final EmitterService emitterService;
    Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    public NotificationController(NotificationService notificationService, EmitterService emitterService) {
        this.notificationService = notificationService;
        this.emitterService = emitterService;
    }

    @GetMapping("/subscribe")
    public SseEmitter subsribe() {
        logger.info("subscribing...");

        SseEmitter sseEmitter = new SseEmitter(24 * 60 * 60 * 1000L);
        emitterService.addEmitter(sseEmitter);

        logger.info("subscribed");
        return sseEmitter;
    }

    @GetMapping()
    public ResponseEntity<List<NotificationEntity>> getNotifications(@RequestParam long userId) {
        List<NotificationEntity> notifications = notificationService.getNotifications(userId);
        return new ResponseEntity<>(notifications, new HttpHeaders(), HttpStatus.OK);
    }

    @GetMapping("/number-of-notifications")
    public ResponseEntity<Integer> getNumberOfNotifications(@RequestParam long userId) {
        Integer numberOfNotifications = notificationService.getNumberOfNotifications(userId);
        return new ResponseEntity<>(numberOfNotifications, new HttpHeaders(), HttpStatus.OK);
    }

    @GetMapping("/clear-notifications")
    public ResponseEntity<List<NotificationEntity>> clearNotifications(@RequestParam long userId) {
        List<NotificationEntity> notifications = notificationService.clearNotifications(userId);
        return new ResponseEntity<>(notifications, new HttpHeaders(), HttpStatus.OK);
    }

    @GetMapping("/clear-notification")
    public ResponseEntity clearNotification(@RequestParam long userId, @RequestParam long notificationId) {
        notificationService.clearNotification(userId, notificationId);
        return new ResponseEntity<>( new HttpHeaders(), HttpStatus.OK);
    }

}

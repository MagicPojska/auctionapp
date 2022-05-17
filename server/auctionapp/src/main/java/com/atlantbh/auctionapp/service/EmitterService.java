package com.atlantbh.auctionapp.service;

import com.atlantbh.auctionapp.model.ProductEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class EmitterService {
    List<SseEmitter> emitters = new ArrayList<>();

    public void addEmitter(SseEmitter emitter) {
        emitter.onCompletion(() -> emitters.remove(emitter));
        emitter.onTimeout(() -> emitters.remove(emitter));
        emitters.add(emitter);
    }

    public void pushNotification(Integer numberOfNotifications, Long userId) {
        List<SseEmitter> deadEmitters = new ArrayList<>();

        emitters.forEach(emitter -> {
            try {
                emitter.send(SseEmitter
                        .event()
                        .name(userId.toString())
                        .data(numberOfNotifications));

            } catch (IOException e) {
                deadEmitters.add(emitter);
            }
        });

        emitters.removeAll(deadEmitters);
    }

    public void pushProductInfo(Double maxBid, ProductEntity product){
        List<SseEmitter> deadEmitters = new ArrayList<>();

        product.setHighestBid(BigDecimal.valueOf(maxBid));
        product.setNumberOfBids(product.getNumberOfBids() + 1);

        emitters.forEach(emitter -> {
            try {
                emitter.send(SseEmitter
                        .event()
                        .name(product.getId() + " " + product.getProductName())
                        .data(product));

            } catch (IOException e) {
                deadEmitters.add(emitter);
            }
        });

        emitters.removeAll(deadEmitters);

    }
}

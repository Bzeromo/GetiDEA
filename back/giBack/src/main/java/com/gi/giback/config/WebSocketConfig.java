package com.gi.giback.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.AbstractWebSocketMessage;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    private static final Logger logger = LoggerFactory.getLogger(WebSocketConfig.class);

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic"); // broker url 설정
        config.setApplicationDestinationPrefixes("/app"); // send url 설정
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        try {
            registry.addEndpoint("/signaling")// webSocket 접속시 endpoint 설정
                    .setAllowedOriginPatterns("*") // cors 에 따른 설정 ( * 는 모두 허용 )
                    .withSockJS(); // 브라우저에서 WebSocket 을 지원하지 않는 경우에 대안으로 어플리케이션의 코드를 변경할 필요 없이 런타임에 필요할 때 대체하기 위해 설정

            logger.info("Endpoint 설정 성공");
        } catch (Exception e) {
            logger.error("Endpoint 설정 실패 ", e);
        }



    }
}
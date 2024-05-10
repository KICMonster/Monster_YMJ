package com.eyy.test.config.rest;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class RestTemplateConfig {

    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder
                .rootUri("https://localhost:9092")
                .defaultHeader("apiKey","ff186d351034c6d3db268df03e7c596a")
        .build();
    }
}

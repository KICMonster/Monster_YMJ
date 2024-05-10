package com.eyy.test.service;

import com.eyy.test.Enumeration.Role;
import com.eyy.test.dto.JwtTokenDTO;
import com.eyy.test.dto.KakaoUserInfo;
import com.eyy.test.dto.UserInfo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.eyy.test.config.rest.RestTemplateConfig;

import java.util.Arrays;
import java.util.Collections;


@Service
public class SocialLoginService {

    private final RestTemplate restTemplate;
    private final SocialLoginSuccessHandler socialLoginSuccessHandler; // 필드 추가


    @Value("${spring.security.oauth2.client.provider.kakao.user-info-uri}")
    private String kakaoUserInfoUrl;

    @Value("${spring.security.oauth2.client.provider.naver.user-info-uri}")
    private String naverUserInfoUrl;

    @Value("${spring.security.oauth2.client.provider.google.user-info-uri}")
    private String googleUserInfoUrl;

    public SocialLoginService(RestTemplate restTemplate , SocialLoginSuccessHandler socialLoginSuccessHandler) {
        this.restTemplate = restTemplate;
        this.socialLoginSuccessHandler = socialLoginSuccessHandler; // 주입
    }

    public UserInfo getUserInfoFromKakao(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        HttpEntity<String> entity = new HttpEntity<>(null, headers); // 오타 수정 및 본문 변경

        ResponseEntity<KakaoUserInfo> response = restTemplate.exchange(
                kakaoUserInfoUrl, HttpMethod.GET, entity, KakaoUserInfo.class);
        System.out.println("response: " + response);
        KakaoUserInfo kakaoUserInfo = response.getBody();
        System.out.println("KakaoUserInfo: " + kakaoUserInfo);
        System.out.println("kakaoUserInfo: " + kakaoUserInfo.getKakao_account().getEmail());
        System.out.println("kakaoUserInfo: " + kakaoUserInfo.getKakao_account().getProfile().getNickname());
        if (kakaoUserInfo != null) {
            // KakaoUserInfo에서 UserInfo로 변환
            UserInfo userInfo = UserInfo.mapKakaoUserInfoToUserInfo(kakaoUserInfo);
            // 권한 정보 설정 (예시: KAKAO_USER 권한 부여)
            userInfo.setRoles(Arrays.asList(Role.USER)); // Role 열거형 상수를 List에 추가


            return userInfo;
        }

        return null; // 또는 적절한 예외 처리
    }
}
//    public UserInfo getUserInfoFromNaver(String accessToken) {
//        String url = naverUserInfoUrl;
//
//        // Naver API 호출 및 유저 정보 가져오기
//        NaverUserInfo userInfo = restTemplate.getForObject(url, NaverUserInfo.class);
//        return mapNaverUserInfoToUserInfo(userInfo);
//    }
//
//    public UserInfo getUserInfoFromGoogle(String accessToken) {
//        String url = googleUserInfoUrl;
//
//        // Google API 호출 및 유저 정보 가져오기
//        GoogleUserInfo userInfo = restTemplate.getForObject(url, GoogleUserInfo.class);
//        return mapGoogleUserInfoToUserInfo(userInfo);
//    }

//    private UserInfo mapKakaoUserInfoToUserInfo(KakaoUserInfo kakaoUserInfo) {
//        // KakaoUserInfo를 UserInfo로 매핑하는 로직 구현
//        return null;
//    }



//    private UserInfo mapNaverUserInfoToUserInfo(NaverUserInfo naverUserInfo) {
//        // NaverUserInfo를 UserInfo로 매핑하는 로직 구현
//        return null;
//    }
//
//    private UserInfo mapGoogleUserInfoToUserInfo(GoogleUserInfo googleUserInfo) {
//        // GoogleUserInfo를 UserInfo로 매핑하는 로직 구현
//        return null;
//    }
//}
package com.eyy.test.controller;

import com.eyy.test.dto.JwtTokenDTO;
import com.eyy.test.dto.SocialLoginRequest;
import com.eyy.test.dto.UserInfo;
import com.eyy.test.jwt.JWTProvider;
import com.eyy.test.service.SocialLoginService;
import com.eyy.test.service.SocialLoginSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "https://localhost:5174")
@RequestMapping("/api") // 고유한 경로로 수정
public class AuthenticationController {

    private final JWTProvider jwtProvider;
    private final SocialLoginService socialLoginService;
    private SocialLoginSuccessHandler socialLoginSuccessHandler;

    @Autowired
    public AuthenticationController(JWTProvider jwtProvider,SocialLoginService socialLoginService,SocialLoginSuccessHandler socialLoginSuccessHandler) {
        this.jwtProvider = jwtProvider;
        this.socialLoginService = socialLoginService;
        this.socialLoginSuccessHandler = socialLoginSuccessHandler;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<JwtTokenDTO> handleSocialLogin(@RequestBody SocialLoginRequest request) {
        String accessToken = request.getAccessToken();
        System.out.println(accessToken);
        UserInfo userInfo = socialLoginService.getUserInfoFromKakao(accessToken);
        System.out.println(userInfo);
        // 여기서 받은 액세스 토큰을 사용하여 JWT 토큰을 생성
        Authentication authentication = jwtProvider.getAuthentication(userInfo);
        System.out.println("토큰로직 권한확인");

        // JWT 토큰 생성 및 응답
        JwtTokenDTO jwtToken = jwtProvider.generateToken(authentication);
        System.out.println(jwtToken);

        // 소셜 로그인 성공 핸들러 로직 추가
        socialLoginSuccessHandler.handleSuccess(userInfo, jwtToken);
        return ResponseEntity.ok(jwtToken);
    }
}



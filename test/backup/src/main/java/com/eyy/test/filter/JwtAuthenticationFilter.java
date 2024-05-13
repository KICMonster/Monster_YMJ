package com.eyy.test.filter;

import com.eyy.test.dto.UserInfo;
import com.eyy.test.jwt.JWTProvider;
import com.eyy.test.repository.MemberRepository;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final MemberRepository memberRepository;
    private final JWTProvider jwtProvider;

    private String parseBearerToken(HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");
        if (authorization != null && authorization.startsWith("Bearer ")) {
            return authorization.substring(7);
        }
        return null;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String token = parseBearerToken(request);

            if (token != null && jwtProvider.validateToken(token)) {
                // 토큰을 파싱하여 사용자 정보 추출
                Claims claims = jwtProvider.parseClaims(token);

                if (claims != null) {
                    // 사용자 정보를 UserInfo 객체로 변환 (예시)
                    UserInfo userInfo = extractUserInfoFromClaims(claims);

                    // UserInfo 객체를 사용하여 Authentication 객체 생성
                    Authentication auth = jwtProvider.getAuthentication(userInfo);

                    // SecurityContextHolder에 Authentication 설정
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            }

            filterChain.doFilter(request, response);
        } catch (Exception exception) {
            log.error("Authentication error", exception);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 인증 실패 시 응답 코드 설정
        }
    }

    // 토큰에서 사용자 정보를 추출하는 메서드 (예시)
    private UserInfo extractUserInfoFromClaims(Claims claims) {
        UserInfo userInfo = new UserInfo();
        userInfo.setEmail(claims.get("email", String.class));
        userInfo.setRoles(Arrays.asList(claims.get("roles", com.eyy.test.Enumeration.Role.class)));
        // 필요한 사용자 정보를 Claims에서 추출하여 UserInfo 객체에 설정
        return userInfo;
    }
}
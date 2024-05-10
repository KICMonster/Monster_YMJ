package com.eyy.test.dto;

import com.eyy.test.Enumeration.Role;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserInfo {
    private String email;
    private String name;
    private Long id;
    private List<Role> roles; // 사용자 권한 정보를 저장하는 필드 추가

    // 기본 생성자, Getter 및 Setter 생략

    public static UserInfo mapKakaoUserInfoToUserInfo(KakaoUserInfo kakaoUserInfo) {
        UserInfo userInfo = new UserInfo();
        if (kakaoUserInfo.getKakao_account() != null) {
            userInfo.setEmail(kakaoUserInfo.getKakao_account().getEmail());
            // 프로필 닉네임 정보 설정
            if (kakaoUserInfo.getKakao_account().getProfile() != null) {
                userInfo.setName(kakaoUserInfo.getKakao_account().getProfile().getNickname());
            }
        }
        userInfo.setId(kakaoUserInfo.getId());
        // 다른 필드 설정
        return userInfo;
    }
}


//    public static UserInfo mapNaverUserInfoToUserInfo(NaverUserInfo naverUserInfo) {
//        UserInfo userInfo = new UserInfo();
//        userInfo.setName(naverUserInfo.getName());       // 네이버 유저 이름을 사용
//        userInfo.setEmail(naverUserInfo.getEmail());     // 네이버 유저 이메일을 사용
//        userInfo.setProfileImageUrl(naverUserInfo.getProfileImageUrl());  // 네이버 프로필 이미지 URL을 사용
//        return userInfo;
//    }
//
//    public static UserInfo mapGoogleUserInfoToUserInfo(GoogleUserInfo googleUserInfo) {
//        UserInfo userInfo = new UserInfo();
//        userInfo.setName(googleUserInfo.getName());      // 구글 유저 이름을 사용
//        userInfo.setEmail(googleUserInfo.getEmail());    // 구글 유저 이메일을 사용
//        userInfo.setProfileImageUrl(googleUserInfo.getProfileImageUrl());  // 구글 프로필 이미지 URL을 사용
//        return userInfo;
//    }



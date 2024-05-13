package com.eyy.test.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eyy.test.dto.JwtTokenDTO;
import com.eyy.test.dto.UserInfo;
import com.eyy.test.service.BaiscLoginService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("")
public class BasicLoginController {
	private final BaiscLoginService baiscLoginService;

//	 @GetMapping("{id}")					//로그인?
//	    public UserInfo getUserById(@PathVariable("id") Long id) {
//	        return baiscLoginService.login(id);
//	    }
	 @GetMapping("/api/authenticate")					//로그인?
	    public JwtTokenDTO getUserById(@PathVariable("id") Long id) {
	        return baiscLoginService.login(id);
	    }

	    @PostMapping("/join/submit")		//회원가입
	    public JwtTokenDTO register(@RequestBody UserInfo info) {
	    	log.info("userinfo : " + info);
	    	JwtTokenDTO response = baiscLoginService.register(info);
	    	return response;
	    }

	    @PutMapping("/mypage/{id}")			//회원수정
	    public Map<String, String> modify(@PathVariable("id") Long id, 
	    								 @RequestBody UserInfo info) {
	    	
	        // id에 해당하는 사용자 정보를 업데이트하고 반환 mypage 
	    	
	    	return Map.of("RESULT", "SUCCESS");
	    }

	    @DeleteMapping("/mypage/{id}")  	//회원탈퇴
	    public Map<String, String> remove(@PathVariable Long id) {
	        baiscLoginService.remove(id);
	        return Map.of("RESULT", "SUCCESS");
	    }
	
	
	
	
	
	
    /*
    명준 작업_기본로그인 구현
    로컬 DB연결 - 테스트 계정 insert해서 작업
    프론트에서 로그인 요청 보내는 방법 자유.
    대신 계정없을경우 회원가입페이지로 보내는 로직과 jwt토큰 방식을 사용하므로 jwt프로바이더 클래스와 필터클래스는 로그인 과정에서 연결해야함.
    추가 로직 필요시 JWTProvider클래스에 기본 로직을 추가하거나 DTO를 따로 사용해도 상관없음.
    but 최종적으로는 member테이블에 저장된 정보를 가져와서 로그인을 진행해야함.
    보안설정 문제있을시 sequrityconfig클래스에서 formLogin부분에 보안설정 추가.
    로그인 성공시 jwt토큰을 프론트로 반환해주고 반환해준 jwt토큰을 프론트에서 로컬스토리지에 저장하는 로직 추가.
    
    토큰에는 2가지가 있다.
    access Token : 용도 : 인증. validateToken(accessToken) 을 할 때 사용
    refresh Token : 용도 : accessToken의 재발급. (accessToken은 수명이 짧기 때문에, 수명이 긴 refreshToken 으로 accessToken 을 재발급 받아야함)

     */
}

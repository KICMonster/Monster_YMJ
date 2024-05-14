package com.eyy.test.service;

import java.util.Arrays;

import org.springframework.http.ResponseEntity;

import com.eyy.test.dto.JwtTokenDTO;
import com.eyy.test.dto.LocalLoginRequest;
import com.eyy.test.dto.UserInfo;
import com.eyy.test.entity.Member;

public interface BaiscLoginService {
	//조회 
//	UserInfo login(Long id);
	JwtTokenDTO login(LocalLoginRequest request);
	

	//수정
	void modify(UserInfo dto);
	
	//회원삭제
	void remove(Long id);
	
	//Entity to DTO
	default UserInfo entityToDto(Member member) {
		UserInfo info = new UserInfo();
		
		info.setId		  (member.getMember_id());
		info.setEmail	   (member.getEmail());
		info.setPassword   (member.getPassword());
		info.setName	   (member.getName());
		info.setBirth	   (member.getBirth());
		info.setLoginTypes (Arrays.asList(member.getLoginType()));
		info.setRoles	   (Arrays.asList(member.getRole()));
		return info;
	}
	
	//DTO to Entity
	default Member dtoToEntity(UserInfo info) {
		Member member = new Member();
		
		member.setMember_id(info.getId());
		member.setEmail	   (info.getEmail());
		member.setPassword (info.getPassword());
		member.setName	   (info.getName());
		member.setBirth	   (info.getBirth());
		member.setLoginType(info.getLoginTypes().get(1));
		member.setRole	   (info.getRoles().get(0)); 
		return member;
	}
}

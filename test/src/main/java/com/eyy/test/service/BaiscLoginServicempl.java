package com.eyy.test.service;

import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.eyy.test.dto.JwtTokenDTO;
import com.eyy.test.dto.LocalLoginRequest;
import com.eyy.test.dto.UserInfo;
import com.eyy.test.entity.Member;
import com.eyy.test.jwt.JWTProvider;
import com.eyy.test.repository.MemberRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Transactional
@Log4j2
@RequiredArgsConstructor
public class BaiscLoginServicempl implements BaiscLoginService {
	private final MemberRepository memberRepository;
	private final JWTProvider jwtProvider;

//	@Override
//	// 회원정보 찾기(로그인?)
//	public UserInfo get(Long id) {
//		Optional<Member> result = memberRepository.findById(id);
//		Member m = result.orElseThrow();
//		UserInfo user = entityToDto(m);
//		Authentication authentication = jwtProvider.getAuthentication(user);
//		JwtTokenDTO jwtToken = jwtProvider.generateToken(authentication);
//
//		return user;
//	}
	@Override
	// 회원정보 찾기(로그인?)
	public JwtTokenDTO login(LocalLoginRequest request) {
		Optional<Member> resulte = memberRepository.findByEmail(request.getEmail());
		Member m = resulte .orElseThrow();
		UserInfo user = entityToDto(m);
		
		Authentication authentication = jwtProvider.getAuthentication(user);
		JwtTokenDTO jwtToken = jwtProvider.generateToken(authentication);
		
		
		return jwtToken;
	}


	@Override
	// 회원정보 수정
	public void modify(UserInfo dto) {
		// TODO Auto-generated method stub
		// 추후에 프로필 수정시 만들겠음
	}

	@Override
	// 회원탈퇴
	public void remove(Long id) {
		memberRepository.deleteById(id);

	}

}

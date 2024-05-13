package com.eyy.test.service;

import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.eyy.test.dto.JwtTokenDTO;
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
	public JwtTokenDTO login(Long id) {
		Optional<Member> result = memberRepository.findById(id);
		Member m = result.orElseThrow();
		UserInfo user = entityToDto(m);
		Authentication authentication = jwtProvider.getAuthentication(user);
		JwtTokenDTO jwtToken = jwtProvider.generateToken(authentication);
		
		return jwtToken;
	}

	@Override
	// 회원가입
//	public ResponseEntity<String> register(UserInfo dto) {
	public JwtTokenDTO register(UserInfo dto) {
		Member member = dtoToEntity(dto);
		memberRepository.save(member);

		JwtTokenDTO userInfo = login(member.getMember_id());
//		Authentication authentication = jwtProvider.getAuthentication(userInfo);
//		JwtTokenDTO jwtToken = jwtProvider.generateToken(authentication);

//		HttpHeaders headers = new HttpHeaders();
		// 완료된 작업 : 회원가입한 유저의 정보로 로그인이 됨. + JWT 토큰이 발급이 됨
		// 해야하는 작업 : JWT를 프론트로 넘기기
		// header로넘김 로그인 성공시 jwt토큰을 프론트로 반환해주고 반환해준 jwt토큰을 프론트에서 로컬스토리지에 저장하는 로직 추가.

//		return new ResponseEntity<>("User registered successfully", headers, HttpStatus.OK);
		return userInfo;

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

package com.eyy.test.repository;

import java.time.LocalDate;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.eyy.test.entity.Member;
import com.eyy.test.repository.MemberRepository;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class UserRepositoryTest {

	@Autowired
	private MemberRepository memberRepository;
	
//	@Test
	public void test1() {
		log.info("-------------------------------------------------");
		log.info(memberRepository);
	}

	@Test 
	public void adduser() {
		Member member =new Member();
		member.setEmail("dbaudwns24@naver.com");
		member.setPassword("yuyu1212");
		member.setName("유씨");
		member.setBirth("2004-03-30");
		member.setLoginType(null);
		member.setRole(null);
		memberRepository.save(member);
		
	}
//	@Test
	public void finduser() {
		Long id = 1l;
		Optional<Member> memberOptional = memberRepository.findById(id);
		Member member = memberOptional.get();
		log.info("-------------------------------------------------");
		log.info("member	: "	+ member);
		log.info("ID		: " + member.getMember_id());
		log.info("email		: " + member.getEmail());
		log.info("password	: " + member.getPassword());
		log.info("name		: " + member.getName());
		log.info("birth	    : " + member.getBirth());
		log.info("logintype : " + member.getLoginType());
		log.info("role	    : " + member.getRole());
		
		
	}
}

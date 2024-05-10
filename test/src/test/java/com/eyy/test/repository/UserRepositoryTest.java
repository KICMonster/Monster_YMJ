package com.eyy.test.repository;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.eyy.test.entity.Member;

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
		member.setEmail("ymj");
		member.setPassword("yuyu1212");
		member.setName("유씨");
		member.setBirth("2004-03-30");
		member.setLoginType(null);
		member.setRole(null);
		memberRepository.save(member);
		
	}
}

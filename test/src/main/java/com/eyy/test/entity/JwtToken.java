package com.eyy.test.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@SequenceGenerator(name = "token_seq", sequenceName = "token_seq", allocationSize = 1)
public class JwtToken {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "token_seq")
    private Long tokenId; // 소문자로 변경: Java 카멜 케이스 규칙을 따름

    private String grantType;
    private String jwtAccessToken;
    private String refreshToken;

    @ManyToOne // Member와의 ManyToOne 관계를 나타냄
    @JoinColumn(name = "member_id") // 외래 키의 이름 지정
    private Member member;

    // 생성자, Getter, Setter 메서드는 @Data 어노테이션으로 인해 자동으로 생성됩니다.
}
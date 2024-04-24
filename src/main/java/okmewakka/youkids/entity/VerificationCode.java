package okmewakka.youkids.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

@Entity
public class VerificationCode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code; // 인증 코드를 저장할 필드
    private LocalDateTime expirationTime; // 만료 시간을 저장할 필드

    // 기본 생성자
    public VerificationCode() {
    }

    // code 필드에 대한 getter 메서드
    public String getCode() {
        return code;
    }

    // code 필드에 대한 setter 메서드
    public void setCode(String code) {
        this.code = code;
    }

    // expirationTime 필드에 대한 getter 메서드
    public LocalDateTime getExpirationTime() {
        return expirationTime;
    }

    // expirationTime 필드에 대한 setter 메서드
    public void setExpirationTime(LocalDateTime expirationTime) {
        this.expirationTime = expirationTime;
    }
}

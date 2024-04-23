package okmewakka.youkids.Controller;

import okmewakka.youkids.Service.VerificationCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PhotoController {

    @Autowired
    private VerificationCodeService verificationCodeService;

    @PostMapping("/verifyCode")
    public ResponseEntity<?> verifyCode(@RequestParam String code) {
        boolean isValidCode = verificationCodeService.enterVerificationCode(code);
        if (verificationCodeService.verifyCode(code)) {
            // 인증 성공 시 사진 전송 로직
            // 예시로는 단순 문자열 반환
            return ResponseEntity.ok("인증 성공! 여기 사진을 보내드립니다.");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("인증 실패");
        }
    }

    @PostMapping("/createCode")
    public ResponseEntity<String> createVerificationCode() {
        String code = verificationCodeService.createVerificationCode();
        return ResponseEntity.ok("Verification code created: " + code);
    }
}

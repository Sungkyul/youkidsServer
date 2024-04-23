package okmewakka.youkids.Service;

import okmewakka.youkids.entity.VerificationCode;
import okmewakka.youkids.Repository.VerificationCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;

@Service
public class VerificationCodeService {

    @Autowired
    private VerificationCodeRepository verificationCodeRepository;

    public String createVerificationCode() {
        // 6자리 숫자 코드 생성
        String code = generateNumericCode(6);
        LocalDateTime expirationTime = LocalDateTime.now().plusMinutes(10); // 10분 후 만료

        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setCode(code);
        verificationCode.setExpirationTime(expirationTime);

        verificationCodeRepository.save(verificationCode);

        return code;
    }

    private String generateNumericCode(int length) {
        SecureRandom random = new SecureRandom();
        StringBuilder code = new StringBuilder();
        for (int i = 0; i < length; i++) {
            code.append(random.nextInt(10)); // 0부터 9까지의 숫자를 추가
        }
        return code.toString();
    }

    public boolean verifyCode(String code) {
        return verificationCodeRepository.findByCode(code)
                .map(verificationCode ->
                        verificationCode.getExpirationTime().isAfter(LocalDateTime.now()))
                .orElse(false);
    }

    public boolean enterVerificationCode(String codeEnteredByUser) {
        boolean isValidCode = verifyCode(codeEnteredByUser);
        if (isValidCode) {
            verificationCodeRepository.deleteByCode(codeEnteredByUser);
        }
        return isValidCode;
    }
}

package okmewakka.youkids.Service;
import okmewakka.youkids.Repository.UserRepository;
import okmewakka.youkids.entity.user;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired(required = true)
    private UserRepository userRepository;


    public String userPNPlus(String phoneNumber) {
        // 전화번호 중복 체크

        if (userRepository.findByuserIdPhone(phoneNumber) != null) {
            throw new IllegalArgumentException("전화번호가 이미 등록되어 있습니다.");
        }
        ;
        return phoneNumber;
        // 회원 정보 저장
        //return memberRepository.save(member);
    }

}
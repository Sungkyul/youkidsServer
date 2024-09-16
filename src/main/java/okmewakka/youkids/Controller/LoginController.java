package okmewakka.youkids.Controller;


import jakarta.servlet.http.HttpSession;
import okmewakka.youkids.DTO.LoginRequest;
import okmewakka.youkids.Repository.UserRepository;
import okmewakka.youkids.Service.UserService;
import okmewakka.youkids.entity.user;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;

@Tag(name = "로그인 API", description = "로그인 API")
@Controller
public class LoginController {


    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;


     @Operation(summary = "로그인", description = "입력 받은 전화번호, 비밀번호로 로그인.")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpSession session) {
        String phoneNumber = loginRequest.getPhoneNumber();
        String password = loginRequest.getPassword();

        if (userService.authenticate(phoneNumber, password)) {
            user user = userRepository.findByUserIdPhone(phoneNumber);
            String username = user.getUserName();
            session.setAttribute("username", username);
            return ResponseEntity.ok().build(); // 성공 응답
        } else {
            return ResponseEntity.status(401).body("Invalid username or password"); // 인증 실패 응답
        }
    }


}

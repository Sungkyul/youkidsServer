package okmewakka.youkids.Controller;


import jakarta.servlet.http.HttpSession;
import okmewakka.youkids.Repository.UserRepository;
import okmewakka.youkids.Service.UserService;
import okmewakka.youkids.entity.user;

import java.util.Map;
import java.util.HashMap;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "로그인 API", description = "로그인 API")
@Controller
public class LoginController {


    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;


   @Operation(summary = "로그인", description = "입력 받은 전화번호, 비밀번호로 로그인.")
@PostMapping("/login")
public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> loginData, HttpSession session) {
    String phoneNumber = loginData.get("phoneNumber");
    String password = loginData.get("password");

    if (userService.authenticate(phoneNumber, password)) {
        user user = userRepository.findByUserIdPhone(phoneNumber); // 주의: User 대문자로 시작
        String username = user.getUserName();
        String userId = user.getId();
        String profilePicture = user.getUserProfileFilePath();

        // 세션에 사용자 정보 저장
        session.setAttribute("username", username);
        session.setAttribute("phonenumber", phoneNumber);
        session.setAttribute("userid", userId);
        session.setAttribute("profilePicture", profilePicture); // 변경: key 값을 "profilePicture"로 수정

        // 사용자 정보를 반환
        Map<String, String> response = new HashMap<>();
        response.put("username", username);
        response.put("profilePicture", profilePicture); // 프로필 사진 반환
        return ResponseEntity.ok(response);
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("error", "Invalid username or password"));
    }
}



    @Operation(summary = "로그아웃", description = "로그아웃하면 로그인 페이지로 리다이렉트")
    @GetMapping("/logout")
    public String logout(HttpSession session) {
    session.invalidate();  // 세션 무효화
    return "redirect:/index";  // 로그인 페이지로 리다이렉트

}


}
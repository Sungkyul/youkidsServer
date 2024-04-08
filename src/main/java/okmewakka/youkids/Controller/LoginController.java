package okmewakka.youkids.Controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {
    // 로그인 페이지를 보여주는 메소드
    @GetMapping("/login")
    public String showLoginPage() {
        return "login"; // login.html 뷰 페이지를 반환
    }


}

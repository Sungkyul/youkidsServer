package okmewakka.youkids.Controller;


import jakarta.servlet.http.HttpSession;
import okmewakka.youkids.Repository.UserRepository;
import okmewakka.youkids.Service.UserService;
import okmewakka.youkids.entity.user;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.ui.Model;

@Tag(name = "로그인 API", description = "로그인 API")
@Controller
public class LoginController {


    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;


    @Operation(summary = "로그인", description = "입력 받은 전화번호, 비밀번호로 로그인.")
    @Parameter(name = "phoneNumber", description = "입력한 전화번호")
    @Parameter(name = "password", description = "입력한 비밀번호")
    @PostMapping("/login")
    public String login(@RequestParam String phoneNumber, @RequestParam String password, HttpSession session, Model model) {
        if (userService.authenticate(phoneNumber, password)) {
            user user = userRepository.findByUserIdPhone(phoneNumber);
            String username=user.getUserName();
            String phonenumber= user.getUserIdPhone();
            String userid=user.getId();

            session.setAttribute("username", username);
            session.setAttribute("phonenumber", phonenumber);
            session.setAttribute(userid, userid);
            
            return "redirect:/dashboard";
        } else {
            model.addAttribute("error", "Invalid username or password");
            return "index"; // 로그인 페이지
        }
    }

    @Operation(summary = "로그아웃", description = "로그아웃하면 로그인 페이지로 리다이렉트")
    @GetMapping("/logout")
    public String logout(HttpSession session) {
    session.invalidate();  // 세션 무효화
    return "redirect:/index";  // 로그인 페이지로 리다이렉트

}


}
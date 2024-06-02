package okmewakka.youkids.Controller;


import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.ui.Model;

@Tag(name = "대시보드 API", description = "대시보드  API")
@Controller
public class DashboardController {
    
    @Operation(summary = "대시보드(홈)로드", description = "로그인 후 성공 시 대시보드 불러오기, 실패 경우 로그인 화면 로드")
    @GetMapping("/dashboard")
    public String dashboard(HttpSession session, Model model) {
        String username = (String) session.getAttribute("username");
        if (username != null) {
            model.addAttribute("username", username);
            return "dashboard";
        } else {
            return "login";
        }
    }
}


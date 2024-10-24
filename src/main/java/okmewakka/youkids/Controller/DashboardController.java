package okmewakka.youkids.Controller;


import jakarta.servlet.http.HttpSession;

import java.util.Map;
import java.util.HashMap;
import org.springframework.http.HttpStatus;


import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;


@Tag(name = "대시보드 API", description = "대시보드  API")
@Controller
public class DashboardController {
    
    @Operation(summary = "대시보드(홈)로드", description = "로그인 후 성공 시 대시보드 불러오기, 실패 경우 로그인 화면 로드")
    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, String>> dashboard(HttpSession session) {
        String username = (String) session.getAttribute("username");
        String profilePicture = (String) session.getAttribute("profilePicture");
        String phoneNumber = (String) session.getAttribute("phoneNumber");

        if (username != null) {
            Map<String, String> response = new HashMap<>();
            response.put("username", username);
            response.put("profilePicture", profilePicture != null ? profilePicture : "defaultProfilePath.jpg"); // 기본 프로필 경로
            response.put("phoneNumber", phoneNumber != null ? phoneNumber : "defaultPhoneNumber");

            return ResponseEntity.ok(response); // 사용자 정보 반환
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 권한 없음
        }
    }
}


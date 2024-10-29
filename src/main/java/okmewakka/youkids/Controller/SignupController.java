package okmewakka.youkids.Controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import okmewakka.youkids.Repository.UserRepository;
import okmewakka.youkids.Service.UserService;
import okmewakka.youkids.entity.user;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.io.IOException;
import java.io.UnsupportedEncodingException;

@Tag(name = "회원가입 API", description = "회원가입 API")
@Controller
public class SignupController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    private user user = new user();

    @Operation(summary = "회원가입 페이지 보기", description = "회원가입 페이지를 보여줍니다.")
    @GetMapping("/signup")
    public String showSignUpPage(Model model) throws IOException {
        model.addAttribute("user", user);
        return "name";
    }

    @Operation(summary = "이름 입력", description = "사용자의 이름을 입력합니다.")
    @Parameter(name = "name")
    @PostMapping("/name")
    public String saveName(Model model, HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
        model.addAttribute("user", user);
        request.setCharacterEncoding("utf-8");
        String name = request.getParameter("name");
        user.setUserName(name);

        return "phoneNumber";
    }

    @Operation(summary = "패스워드 입력", description = "사용자의 패스워드를 입력합니다.")
    @Parameter(name = "password")
    @PostMapping("/password")
    public String submitPassword(Model model, HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
        model.addAttribute("user", user);
        request.setCharacterEncoding("utf-8");
        String password = request.getParameter("password");
        user.setUserPassword(password);

        return "profilePicture";
    }

    @Operation(summary = "휴대폰 번호 입력", description = "사용자의 휴대폰 번호를 입력합니다.")
    @Parameter(name = "phoneNumber")
    @PostMapping("/phoneNumber")
    public String submitPhoneNumber(Model model, HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
        model.addAttribute("user", user);
        request.setCharacterEncoding("utf-8");
        String phoneNumber = request.getParameter("phoneNumber");
        String phoneNum = userService.userPNPlus(phoneNumber);
        user.setUserIdPhone(phoneNum);
        return "/password";
    }

    @Operation(summary = "프로필 사진 업로드", description = "사용자의 프로필 사진을 업로드합니다.")
@PostMapping("/profilePicture")
public String submitProfilePicture(Model model, @RequestParam("profile") MultipartFile profile, HttpServletRequest request, HttpServletResponse response) throws Exception {
    model.addAttribute("user", user);
    userService.profileUpload(user, profile);
    return "terms";
}


    @Operation(summary = "약관 동의 후 회원가입 완료", description = "약관 동의 후 사용자 정보를 데이터베이스에 저장합니다.")
    @PostMapping("/complete")
    public String completeSignUp(Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {
        model.addAttribute("user", user);
        userRepository.save(user);

        String name = user.getUserName();
        String password = user.getUserPassword();
        String pn = user.getUserIdPhone();
        System.out.println(name + password + pn);

        return "index";
    }
}
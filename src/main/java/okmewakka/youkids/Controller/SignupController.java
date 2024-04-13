package okmewakka.youkids.Controller;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import okmewakka.youkids.Repository.UserRepository;
import okmewakka.youkids.Service.UserService;
import okmewakka.youkids.entity.user;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.io.UnsupportedEncodingException;

@Controller
public class SignupController<request> extends HttpServlet {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    private user user = new user();

    // 회원가입 페이지로 이동하는 메소드
    @GetMapping("/signup")
    public String showSignUpPage(Model model) throws IOException {
        model.addAttribute("user", user);
        return "name";
    }
    //이름 입력
    @PostMapping("/name")
    public String saveName(Model model, HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
        model.addAttribute("user", user);
        request.setCharacterEncoding("utf-8");
        String name=request.getParameter("name");
        user.setUserName(name);

        return "phoneNumber";
    }
    //패스워드 입력
    @PostMapping("/password")
    public String submitPassword(Model model, HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
        model.addAttribute("user", user);
        request.setCharacterEncoding("utf-8");
        String password=request.getParameter("password");
        user.setUserPassword(password);

        return "profilePicture";
    }

    //휴대폰 번호 입력
    @PostMapping("/phoneNumber")
    public String submitphoneNumber(Model model, HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
        model.addAttribute("user", user);
        request.setCharacterEncoding("utf-8");
        String phoneNumber=request.getParameter("phoneNumber");
        String phoneNum=userService.userPNPlus(phoneNumber);
        user.setUserIdPhone(phoneNum);
        return "password";
    }

    //프로필 사진 업로드
    @PostMapping("/profilePicture")
    public String submitprofilePicture( Model model, MultipartFile profile, HttpServletRequest request, HttpServletResponse response) throws Exception {
        model.addAttribute("user", user);
        userService.profileUpload(user,profile);
       return "terms";
    }
    // 약관 동의 후 user 데이터 베이스에 저장
    @PostMapping("/complete")
    public void completeSignUp( Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {
        model.addAttribute("user", user);
        userRepository.save(user);

        String name= user.getUserName();
        String password= user.getUserPassword();
        String pn= user.getUserIdPhone();
        System.out.println(name+password+pn);

    }


        /* public void print(@ModelAttribute user user,Model model, HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
        model.addAttribute("user", user);
        String name= user.getUserName();
        String password= user.getUserPassword();
        String pn= user.getUserIdPhone();
        System.out.println(name+password+pn);
    }*/
}

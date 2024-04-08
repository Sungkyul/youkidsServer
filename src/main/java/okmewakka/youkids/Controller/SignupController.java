package okmewakka.youkids.Controller;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import okmewakka.youkids.Service.UserService;
import okmewakka.youkids.entity.user;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import java.io.IOException;
import java.io.UnsupportedEncodingException;

@Controller
public class SignupController<request> extends HttpServlet {

    @Autowired
    private UserService userService;


    // 회원가입 페이지로 이동하는 메소드
    @GetMapping("/signup")
    public String showSignUpPage(Model model) throws IOException {
        model.addAttribute("user", new user());
        return "name";
    }
    @PostMapping("/name")
    public String saveName(@ModelAttribute user user, Model model, HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
        model.addAttribute("user", user);
        request.setCharacterEncoding("utf-8");
        String name=request.getParameter("name");
        user.setUserName(name);

        return "password";
    }
    @PostMapping("/password")
    public String submitPassword(@ModelAttribute user user,Model model, HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
        model.addAttribute("user", user);
        request.setCharacterEncoding("utf-8");
        String password=request.getParameter("password");
        user.setUserPassword(password);

        return "phoneNumber";
    }

    @PostMapping("/phoneNumber")
    public String submitphoneNumber(@ModelAttribute user user,Model model, HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
        model.addAttribute("user", user);
        request.setCharacterEncoding("utf-8");
        String phoneNumber=request.getParameter("phoneNumber");
        user.setUserIdPhone(userService.userPNPlus(phoneNumber));

        return "profilePicture";
    }
   /* public void print(@ModelAttribute user user,Model model, HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
        model.addAttribute("user", user);
        String name= user.getUserName();
        String password= user.getUserPassword();
        String pn= user.getUserIdPhone();
        System.out.println(name+password+pn);
    }*/
    @PostMapping("/profilePicture")
    public String submitprofilePicture(@ModelAttribute user user,Model model, HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
        model.addAttribute("user", user);


       return "profilePicture";
    }


}

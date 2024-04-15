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
import org.springframework.ui.Model;

@Controller
public class LoginController {


    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;


    @PostMapping("/login")
    public String login(@RequestParam String phoneNumber, @RequestParam String password, HttpSession session, Model model) {
        if (userService.authenticate(phoneNumber, password)) {
            user user = userRepository.findByUserIdPhone(phoneNumber);
            String username=user.getUserName();
            session.setAttribute("username", username);
            return "redirect:/dashboard";
        } else {
            model.addAttribute("error", "Invalid username or password");
            return "index";
        }
    }


}

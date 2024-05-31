package okmewakka.youkids.Controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.stereotype.Controller;


@Controller
public class UserController {

    @GetMapping("/login")
    public String showSignUpPage() {
        
        return "index";
    }

}

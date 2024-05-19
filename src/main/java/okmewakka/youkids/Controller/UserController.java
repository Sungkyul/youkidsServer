package okmewakka.youkids.Controller;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import okmewakka.youkids.Repository.UserRepository;
import okmewakka.youkids.Service.UserService;
import okmewakka.youkids.entity.user;


@Controller
public class UserController {

    @Autowired
    UserService userService;
    @Autowired 
    UserRepository userRepository;

    @GetMapping("/")
    public String showLoginPage() {
        
        return "index";
    }
    //유저 네임 수정 
    @PutMapping("/{phone}/name")
    public ResponseEntity<String> updateUserName(@PathVariable String phone, @RequestBody String newUserName) {
        user updatedUser = userService.updateUserName(phone, newUserName);
        if (updatedUser != null) {
            return ResponseEntity.ok().body("회원 이름이 성공적으로 업데이트되었습니다.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //유저 비밀번호 수정 
    @PutMapping("/{phone}/password")
    public ResponseEntity<String> updateUserPassword(@PathVariable String phone, @RequestBody String newPassword) {
        Optional<user> userOptional = Optional.ofNullable(userRepository.findByUserIdPhone(phone));
        if (userOptional.isPresent()) {
            user user = userOptional.get();
            user.setUserPassword(newPassword);
            userRepository.save(user);
            return ResponseEntity.ok("비밀번호가 성공적으로 업데이트되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당하는 사용자를 찾을 수 없습니다.");
        }
    }
    @PutMapping("/{phone}/phoneNumber")
    public ResponseEntity<String> updateUserPhoneNumber(@PathVariable String phone, @RequestBody String newPhoneNumber) {
        Optional<user> userOptional = Optional.ofNullable(userRepository.findByUserIdPhone(phone));
        if (userOptional.isPresent()) {
            user user = userOptional.get();

            // 새로운 전화번호가 이미 등록되어 있는지 확인
            if (userRepository.findByUserIdPhone(newPhoneNumber) != null) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("새로운 전화번호가 이미 등록되어 있습니다.");
            }

            user.setUserIdPhone(newPhoneNumber);
            userRepository.save(user);
            return ResponseEntity.ok("전화번호가 성공적으로 업데이트되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당하는 사용자를 찾을 수 없습니다.");
        }
    }
    //유저 프로필 사진 수정 
    @PutMapping("/{phone}/profile")
    public ResponseEntity<String> updateProfile(@PathVariable String phone, @RequestParam MultipartFile profile) {
        try {
            Optional<user> userOptional = Optional.ofNullable(userRepository.findByUserIdPhone(phone));
            if (userOptional.isPresent()) {
                user user = userOptional.get();
                userService.profileUpload(user, profile);
                return ResponseEntity.ok("프로필 사진이 업데이트되었습니다.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자를 찾을 수 없습니다.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("프로필 사진 업데이트에 실패했습니다.");
        }
    }
    
}


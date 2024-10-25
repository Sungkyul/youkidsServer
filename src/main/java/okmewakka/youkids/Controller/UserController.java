package okmewakka.youkids.Controller;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import okmewakka.youkids.Repository.UserRepository;
import okmewakka.youkids.Service.UserService;
import okmewakka.youkids.entity.user;


@Controller
public class UserController {

    @Autowired
    UserService userService;

    @Autowired 
    UserRepository userRepository;



    @Operation(summary = "유저 이름 수정", description = "유저의 이름을 수정합니다.")
    @PutMapping("/{phone}/name")
    public ResponseEntity<String> updateUserName(
            @Parameter(description = "유저 전화번호") @PathVariable String phone,
            @Parameter(description = "새로운 유저 이름") @RequestBody String newUserName) {
            // JSON 문자열에서 따옴표 제거
        newUserName = newUserName.replaceAll("^\"|\"$", "");
        user updatedUser = userService.updateUserName(phone, newUserName);
        if (updatedUser != null) {
            return ResponseEntity.ok().body("회원 이름이 성공적으로 업데이트되었습니다.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "유저 비밀번호 수정", description = "유저의 비밀번호를 수정합니다.")
    @PutMapping("/{phone}/password")
    public ResponseEntity<String> updateUserPassword(
            @Parameter(description = "유저 전화번호") @PathVariable String phone,
            @Parameter(description = "새로운 비밀번호") @RequestBody String newPassword) {
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

    @Operation(summary = "유저 전화번호 수정", description = "유저의 전화번호를 수정합니다.")
    @PutMapping("/{phone}/phoneNumber")
    public ResponseEntity<String> updateUserPhoneNumber(
            @Parameter(description = "유저 전화번호") @PathVariable String phone,
            @Parameter(description = "새로운 전화번호") @RequestBody String newPhoneNumber) {
        Optional<user> userOptional = Optional.ofNullable(userRepository.findByUserIdPhone(phone));
        if (userOptional.isPresent()) {
            user user = userOptional.get();
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

    @Operation(summary = "유저 프로필 사진 수정", description = "유저의 프로필 사진을 수정합니다.")
    @PutMapping("/{phone}/profile")
    public ResponseEntity<String> updateProfile(
            @Parameter(description = "유저 전화번호") @PathVariable String phone,
            @Parameter(description = "프로필 사진") @RequestParam MultipartFile profile) {
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


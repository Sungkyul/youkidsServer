package okmewakka.youkids.Controller;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import okmewakka.youkids.Repository.PhotoRepository;
import okmewakka.youkids.entity.Photo;


@Tag(name = "입력코드 API", description = "입력코드 체크 API")
@Controller
public class PasswordController {

    @Autowired
    PhotoRepository photoRepository;

    @Operation(summary = "코드 입력창 보기", description = "코드 입력 페이지를 보여줍니다.")
    @GetMapping("/codeinput")
    public String showCodeInputPage() {
        return "codeinput"; 
    }

    
 
    @Operation(summary = "코드 확인", description = "사진을 전송 받을 때 입력한 코드 확인.")
    @Parameter(name = "password", description = "입력한 코드")
    @PostMapping("/checkPassword")
    public ResponseEntity<List<Photo>> checkPassword(@RequestBody Map<String, String> requestBody) {
        String password = requestBody.get("password");
        List<Photo> photos = photoRepository.findByUuid(password);
        if (!photos.isEmpty()) {
            return ResponseEntity.ok().body(photos);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    
    

}

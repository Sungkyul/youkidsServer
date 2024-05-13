package okmewakka.youkids.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import okmewakka.youkids.Repository.PhotoRepository;
import okmewakka.youkids.entity.Photo;



@Controller
public class PasswordController {

    @Autowired
    PhotoRepository photoRepository;

    

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

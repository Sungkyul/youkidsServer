package okmewakka.youkids.Controller;

import okmewakka.youkids.entity.Photo;
import okmewakka.youkids.Repository.PhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
@Controller
public class PhotoSaveController {
    @Autowired
    private PhotoRepository photoRepository;

    @PostMapping("/api/photos")
    public ResponseEntity<?> uploadPhoto(@RequestParam("title") String title, @RequestParam("file") MultipartFile file) throws IOException {
        Photo photo = new Photo();
        photo.setTitle(title);
        photo.setImage(file.getBytes());

        photoRepository.save(photo);

        return ResponseEntity.ok("File uploaded successfully");
    }
}

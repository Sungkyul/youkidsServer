package okmewakka.youkids.Controller;

import okmewakka.youkids.Repository.PhotoRepository;
import okmewakka.youkids.Service.VerificationCodeService;
import okmewakka.youkids.entity.Photo;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;

@Controller
public class PhotoController {

    @Autowired
    private VerificationCodeService verificationCodeService;

    @Autowired
    private PhotoRepository photoRepository;

    private Photo photo = new Photo();

    @GetMapping("/uploadpage")
    public String showUploadPage() {
        return "photoUpload"; 
    }
    @GetMapping("/codeinputpage")
    public String codeinputpage() {
        return "codeinput";
    }
    
    @PostMapping("/upload")
    public String uploadPhotos(Model model, @RequestParam("files") List<MultipartFile> files) {
        try {
            String commonUUID = UUID.randomUUID().toString(); // 여러 파일에 동일한 UUID 생성
            String code = verificationCodeService.createVerificationCode();
    
            for (MultipartFile file : files) {
                // UUID를 사용하여 파일명을 고유하게 생성
                String originalFileName = StringUtils.cleanPath(file.getOriginalFilename());
                String fileName = commonUUID + "_" + originalFileName;
    
                // 파일을 업로드할 디렉토리 경로 설정
                String uploadDir = "src/main/resources/static/files";
                String filePath = uploadDir + File.separator + fileName;
    
                // 파일 저장
                Path path = Paths.get(filePath);
                Files.write(path, file.getBytes());
    
                // 새로운 Photo 객체 생성 및 속성 설정
                Photo photo = new Photo();
                photo.setFileName(fileName);
                photo.setFilePath("/files/" + fileName);
                photo.setUuid(code); // 모든 파일에 동일한 UUID 설정
    
                // 데이터베이스에 Photo 객체 저장
                photoRepository.save(photo);
    
                // 코드를 모델에 추가하여 뷰로 전달
                model.addAttribute("code", code);
            }
        } catch (IOException e) {
            e.printStackTrace();
            // 예외 처리
        }
        return "verificationCodeView";
    }
    
    
    // @PostMapping("/verifyCode")
    // public ResponseEntity<?> verifyCode(@RequestParam String code) {
    //     boolean isValidCode = verificationCodeService.enterVerificationCode(code);
    //     if (verificationCodeService.verifyCode(code)) {
    //         // 인증 성공 시 사진 전송 로직
    //         // 예시로는 단순 문자열 반환
    //         return ResponseEntity.ok("인증 성공! 여기 사진을 보내드립니다.");
    //     } else {
    //         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("인증 실패");
    //     }
    // }

    @GetMapping("/codeView")
    public String ViewVerificationCode(Model model) {
        model.addAttribute("photo", photo);
        String code = photo.getUuid();
        model.addAttribute("code",code);
        return "verificationCodeView";
    }
    @GetMapping("/getImages")
    public ResponseEntity<List<String>> getImagePaths(@RequestParam String password) {
    List<Photo> photos = photoRepository.findByUuid(password);
    List<String> imagePaths = new ArrayList<>();
    for (Photo photo : photos) {
        imagePaths.add(photo.getFilePath());
    }
    return ResponseEntity.ok().body(imagePaths);
    }
    
    @GetMapping("/photoview")
    public String showPhotoViewPage() {
    return "photoview"; // 이 경우에는 photoview.html 파일의 경로를 반환하는 것이 아니라 뷰의 이름을 반환합니다.
}


    

    // @GetMapping("/photoview")
    // public String showPhotoView(@RequestParam String imagePath, Model model) {
    //     // 이미지 경로를 모델에 추가하여 템플릿으로 전달
    //     model.addAttribute("imagePath", imagePath);
    //     return "photoview"; // 렌더링할 템플릿 이름 반환
    // }

}

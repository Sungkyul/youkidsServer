package okmewakka.youkids.Controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
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

@CrossOrigin(origins = "http://localhost:3000") // React 앱이 실행되는 주소
@Tag(name = "사진 API", description = "사진 API")
@Controller
public class PhotoController {

    @Autowired
    private VerificationCodeService verificationCodeService;

    @Autowired
    private PhotoRepository photoRepository;

    private Photo photo = new Photo();

    @Operation(summary = "Upload Page 보기", description = "파일 업로드 페이지를 보여줍니다.")
    @GetMapping("/uploadpage")
    public String showUploadPage() {
        return "photoUpload"; 
    }

    @Operation(summary = "Code Input Page 보기", description = "코드 입력 페이지를 보여줍니다.")
    @GetMapping("/codeinputpage")
    public String codeinputpage() {
        return "codeinput";
    }
    
    @Operation(summary = "사진 업로드", description = "사진을 업로드합니다.")
    @Parameter(name = "files", description = "업로드 사진")
    @PostMapping("/upload")
    public ResponseEntity<String> uploadPhotos(@RequestParam("files") List<MultipartFile> files) {
        try {
            String commonUUID = UUID.randomUUID().toString();
            String code = verificationCodeService.createVerificationCode();

            for (MultipartFile file : files) {
                String originalFileName = StringUtils.cleanPath(file.getOriginalFilename());
                String fileName = commonUUID + "_" + originalFileName;

                String uploadDir = "src/main/resources/static/files";
                String filePath = uploadDir + File.separator + fileName;

                Path path = Paths.get(filePath);
                Files.write(path, file.getBytes());

                Photo photo = new Photo();
                photo.setFileName(fileName);
                photo.setFilePath("/files/" + fileName);
                photo.setUuid(code);
                LocalDateTime localDateTime = LocalDateTime.now();
                photo.setUploadDate(localDateTime);

                photoRepository.save(photo);
            }

            return ResponseEntity.ok(code); // 검증 코드 반환
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("File upload failed.");
        }
    }

    
    
    @Operation(summary = "코드 보기", description = "코드를 보여줍니다.")
    @GetMapping("/codeView")
    public String ViewVerificationCode(Model model) {
        model.addAttribute("photo", photo);
        String code = photo.getUuid();
        model.addAttribute("code",code);
        return "verificationCodeView";
    }
    
    @Operation(summary = "이미지 경로 가져오기", description = "이미지 경로를 가져옵니다.")
    @GetMapping("/getImages")
    public ResponseEntity<List<String>> getImagePaths(@Parameter(description = "비밀번호") @RequestParam String password) {
        List<Photo> photos = photoRepository.findByUuid(password);
        List<String> imagePaths = new ArrayList<>();
        for (Photo photo : photos) {
            imagePaths.add(photo.getFilePath());
        }
        return ResponseEntity.ok().body(imagePaths);
    }
    
    @Operation(summary = "사진 보기", description = "사진 보기 페이지를 보여줍니다.")
    @GetMapping("/photoview")
    public String showPhotoViewPage() {
        return "photoview";
    }
}

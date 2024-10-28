package okmewakka.youkids.Controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.time.LocalDateTime;

//import org.hibernate.mapping.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import okmewakka.youkids.Repository.PhotoRepository;
import okmewakka.youkids.Service.PhotoService;
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
import java.util.Map;
import java.util.HashMap;

import com.fasterxml.jackson.core.type.TypeReference;


@CrossOrigin(origins = "http://localhost:3000") // React 앱이 실행되는 주소
@Tag(name = "사진 API", description = "사진 API")
@Controller
public class PhotoController {
    @Autowired
    private PhotoService photoService;

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
public ResponseEntity<String> uploadPhotos(
    @RequestParam("files") List<MultipartFile> files,
    @RequestParam("groupData") String groupDataJson) {

    try {
        // groupDataJson을 파싱하여 그룹 정보를 처리
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, List<String>> groupData = objectMapper.readValue(groupDataJson, new TypeReference<Map<String, List<String>>>() {});

        String commonUUID = UUID.randomUUID().toString();
        String code = verificationCodeService.createVerificationCode();

        for (MultipartFile file : files) {
            String originalFileName = StringUtils.cleanPath(file.getOriginalFilename());
            String fileName = commonUUID + "_" + originalFileName;

            String uploadDir = "src/main/resources/static/files";
            String filePath = uploadDir + File.separator + fileName;

            Path path = Paths.get(filePath);
            Files.write(path, file.getBytes());

            // 파일 이름을 기반으로 해당 파일의 그룹을 찾음
            String groupId = null;
            for (Map.Entry<String, List<String>> entry : groupData.entrySet()) {
                if (entry.getValue().contains(originalFileName)) {
                    groupId = entry.getKey();  // 해당 파일이 속한 그룹 ID를 찾음
                    break;
                }
            }

            Photo photo = new Photo();
            photo.setFileName(fileName);
            photo.setFilePath("/files/" + fileName);
            photo.setUuid(code);
            photo.setGroupId(Integer.parseInt(groupId));  // 그룹 ID를 int로 변환하여 저장
            LocalDateTime localDateTime = LocalDateTime.now();
            photo.setUploadDate(localDateTime);

            photoRepository.save(photo);
        }

        return ResponseEntity.ok(code); // 검증 코드 반환
    } catch (IOException e) {
        e.printStackTrace(); // 발생한 예외를 출력
        return ResponseEntity.status(500).body("File upload failed: " + e.getMessage());
    } catch (Exception e) {
        e.printStackTrace(); // 다른 예외 처리
        return ResponseEntity.status(500).body("An error occurred: " + e.getMessage());
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
    public ResponseEntity<List<String>> getImagePaths(
        @Parameter(description = "비밀번호") @RequestParam("password") String password) {
        List<Photo> photos = photoRepository.findByUuid(password);
        List<String> imagePaths = new ArrayList<>();
        for (Photo photo : photos) {
            imagePaths.add(photo.getFilePath());
        }
        return ResponseEntity.ok().body(imagePaths);
    }

    
    @Operation(summary = "그룹별 이미지 경로 가져오기", description = "비밀번호로 그룹별 이미지 경로를 가져옵니다.")
    @GetMapping("/getImagesByGroup")
    public ResponseEntity<Map<String, List<String>>> getImagesByGroup(
        @Parameter(description = "비밀번호") @RequestParam("verificationCode") String verificationCode) {
        
        List<Photo> photos = photoRepository.findByUuid(verificationCode);
        Map<String, List<String>> groupedImages = new HashMap<>();
        
        for (Photo photo : photos) {
            String groupId = String.valueOf(photo.getGroupId());  // int를 String으로 변환

            if (!groupedImages.containsKey(groupId)) {
                groupedImages.put(groupId, new ArrayList<>());
            }
            
            groupedImages.get(groupId).add(photo.getFilePath());
        }
        
        return ResponseEntity.ok(groupedImages);
    }

    

    @Operation(summary = "사진 보기", description = "사진 보기 페이지를 보여줍니다.")
    @GetMapping("/photoview")
    public String showPhotoViewPage() {
        return "photoview";
    }


    @Operation(summary = "사진 목록을 반환", description = "오늘 전송된 사진 목록을 반환.")
     @GetMapping("/today/sent-list")
     public ResponseEntity<List<String>> getTodaySentList() {
     List<String> sentList = photoService.getTodaySentPhotos();
         return ResponseEntity.ok(sentList);
    }
}

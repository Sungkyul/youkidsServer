package okmewakka.youkids.Service;
import okmewakka.youkids.Repository.UserRepository;
import okmewakka.youkids.entity.user;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.UUID;

@Service
public class UserService {

    @Autowired(required = true)
    private UserRepository userRepository;



    public String userPNPlus(String phoneNumber) {
        // 전화번호 중복 체크
       if (userRepository.findByUserIdPhone(phoneNumber) != null) {
            throw new IllegalArgumentException("전화번호가 이미 등록되어 있습니다.");
        }

        return phoneNumber;

    }

    public void profileUpload(user user, MultipartFile profile) throws Exception {
        String projectPath = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\files";

        UUID uuid = UUID.randomUUID();

        String fileName = uuid + "_" + profile.getOriginalFilename();

        File saveFile = new File(projectPath, fileName);

        profile.transferTo(saveFile);

        user.setUserProfileFileName(fileName);
        user.setUserProfileFilePath("/files" + fileName);


    }


}
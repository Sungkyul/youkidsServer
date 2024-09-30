package okmewakka.youkids.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import okmewakka.youkids.Repository.PhotoRepository;
import okmewakka.youkids.entity.Photo;

@Service
public class PhotoService {
    @Autowired
    private PhotoRepository photoRepository;

    // 오늘 전송된 사진의 UUID와 전송 목록 생성 (중복 UUID 제거)
    public List<String> getTodaySentPhotos() {
        
            LocalDate today = LocalDate.now();
            
            // 오늘 날짜로 업로드된 사진 필터링
            List<Photo> todayPhotos = photoRepository.findByUploadDateBetween(
                today.atStartOfDay(),
                today.plusDays(1).atStartOfDay()
            );
        
            // 중복된 UUID 제거를 위한 Set 사용
            Set<String> uniqueUuids = new HashSet<>();
            List<String> sentList = new ArrayList<>();
        
            for (Photo photo : todayPhotos) {
                String uuid = photo.getUuid();
                // UUID가 null이 아닌 경우에만 추가
                if (uuid != null && uniqueUuids.add(uuid)) { // Set에 추가하면서 중복 확인
                    String entry = (sentList.size() + 1) + ". " + uuid + " 전송 완료";
                    sentList.add(entry);
                }
            }
        
            return sentList;
        }


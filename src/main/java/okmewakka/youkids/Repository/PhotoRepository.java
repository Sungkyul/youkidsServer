package okmewakka.youkids.Repository;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import okmewakka.youkids.entity.Photo;


@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {
    List<Photo> findByUuid(String uuid);

    // 업로드 날짜가 주어진 범위에 속하는 사진 찾기
    List<Photo> findByUploadDateBetween(LocalDateTime start, LocalDateTime end);
    
}
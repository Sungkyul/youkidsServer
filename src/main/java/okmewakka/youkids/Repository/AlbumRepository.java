package okmewakka.youkids.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import okmewakka.youkids.entity.Album;

@Repository
public interface AlbumRepository extends JpaRepository<Album, Long> {
    
    // 제목을 기준으로 앨범 검색 (제목이 정확히 일치하는 경우)
    List<Album> findByTitleAndUserUserIdPhone(String title, String userIdPhone);

    // 제목이 포함된 앨범 검색 (제목이 일치하지 않고 일부만 포함되는 경우)
    List<Album> findByTitleContainingAndUserUserIdPhone(String title, String userIdPhone);
}
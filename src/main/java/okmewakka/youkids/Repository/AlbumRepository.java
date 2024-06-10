package com.okmewakka.youkids.repository;

import com.okmewakka.youkids.entity.Album;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlbumRepository extends JpaRepository<Album, Long> {
    // 검색어에 해당하는 앨범 제목을 조회하는 메소드
    List<Album> findByTitleContaining(String title);
}
package com.okmewakka.youkids.service;

import com.okmewakka.youkids.entity.Album;
import com.okmewakka.youkids.repository.AlbumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlbumService {

    private final AlbumRepository albumRepository;

    @Autowired
    public AlbumService(AlbumRepository albumRepository) {
        this.albumRepository = albumRepository;
    }

    // 검색어에 해당하는 앨범을 조회하는 메소드
    public List<Album> searchAlbums(String title) {
        return albumRepository.findByTitleContaining(title);
    }
}
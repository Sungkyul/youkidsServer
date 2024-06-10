package com.okmewakka.youkids.controller;

import com.okmewakka.youkids.entity.Album;
import com.okmewakka.youkids.service.AlbumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/albums")
public class AlbumController {

    private final AlbumService albumService;

    @Autowired
    public AlbumController(AlbumService albumService) {
        this.albumService = albumService;
    }

    // 검색어에 따른 앨범 정보 조회
    @GetMapping("/search")
    public List<Album> searchAlbums(@RequestParam String title) {
        return albumService.searchAlbums(title);
    }
}
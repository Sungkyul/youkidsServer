package okmewakka.youkids.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import okmewakka.youkids.Service.AlbumService;
import okmewakka.youkids.entity.Album;

@Controller
@RequestMapping("/albums")
public class AlbumController {

    @Autowired
    private AlbumService albumService;

    // 앨범 생성
    @PostMapping("/create")
    public ResponseEntity<Album> createAlbum(@RequestParam String userIdPhone,
                                             @RequestParam String title,
                                             @RequestBody List<String> photoUrls) {
        Album album = albumService.createAlbum(userIdPhone, title, photoUrls);
        return ResponseEntity.ok(album);
    }

    // 대표 사진 변경
    @PutMapping("/{albumId}/cover-photo")
    public ResponseEntity<Album> changeCoverPhoto(@PathVariable Long albumId,
                                                  @RequestParam Long photoId) {
        Album album = albumService.changeCoverPhoto(albumId, photoId);
        return ResponseEntity.ok(album);
    }

    // 앨범 속 사진 갯수 반환
    @GetMapping("/{albumId}/photo-count")
    public ResponseEntity<Integer> getPhotoCount(@PathVariable Long albumId) {
        int count = albumService.getPhotoCount(albumId);
        return ResponseEntity.ok(count);
    }
}
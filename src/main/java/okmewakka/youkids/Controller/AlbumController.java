package okmewakka.youkids.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import okmewakka.youkids.Service.AlbumService;
import okmewakka.youkids.entity.Album;

@Tag(name = "앨범 API", description = "앨범 API")
@Controller
@RequestMapping("/albums")
public class AlbumController {

    @Autowired
    private AlbumService albumService;

    // 앨범 생성
    @Operation(summary = "앨범 생성", description = "사용자 폰 번호(아이디), 앨범 제목, 사진들 경로로 앨범 생성, 엘범 객체 반환")
    @Parameter(name = "userIdPhone", description = "사용자 폰 번호(아이디)")
    @Parameter(name = "title", description = "앨범 제목")
    @Parameter(name = "photoUrls", description = "사진 경로들(List)")
    @PostMapping("/create")
    public ResponseEntity<Album> createAlbum(@RequestParam String userIdPhone,
                                             @RequestParam String title,
                                             @RequestBody List<String> photoUrls) {
        Album album = albumService.createAlbum(userIdPhone, title, photoUrls);
        return ResponseEntity.ok(album);
    }

    // 대표 사진 변경
    @Operation(summary = "대표 사진 변경", description = "앨범 대표사진을 변경, 앨범 객체 반환")
    @Parameter(name = "albumId", description = "앨범 고유 번호(아이디)")
    @Parameter(name = "photoId", description = "사진 고유 번호")
    @PutMapping("/{albumId}/cover-photo")
    public ResponseEntity<Album> changeCoverPhoto(@PathVariable Long albumId,
                                                  @RequestParam Long photoId) {
        Album album = albumService.changeCoverPhoto(albumId, photoId);
        return ResponseEntity.ok(album);
    }

    // 앨범 속 사진 갯수 반환
    @Operation(summary = "앨범 속 사진 갯수 반환", description = "앨범 속 사진 갯수 반환")
    @Parameter(name = "albumId", description = "앨범 고유 번호(아이디)")
    @GetMapping("/{albumId}/photo-count")
    public ResponseEntity<Integer> getPhotoCount(@PathVariable Long albumId) {
        int count = albumService.getPhotoCount(albumId);
        return ResponseEntity.ok(count);
    }

     // 앨범 제목으로 검색 (정확한 일치)
     @Operation(summary = "앨범 제목으로 검색", description = "사용자 ID와 앨범 제목을 이용해 검색")
     @Parameter(name = "userIdPhone", description = "사용자 폰 번호(아이디)")
    @Parameter(name = "title", description = "앨범 제목")
     @GetMapping("/search")
     public ResponseEntity<List<Album>> searchAlbumByTitle(@RequestParam String userIdPhone,
                                                           @RequestParam String title) {
         List<Album> albums = albumService.searchAlbumByTitle(userIdPhone, title);
         return ResponseEntity.ok(albums);
     }
 
     // 앨범 제목의 일부로 검색 (포함된 제목 검색)
     @Operation(summary = "앨범 제목 일부로 검색", description = "사용자 ID와 앨범 제목의 일부로 검색")
     @Parameter(name = "userIdPhone", description = "사용자 폰 번호(아이디)")
     @Parameter(name = "title", description = "앨범 제목")
     @GetMapping("/search/containing")
     public ResponseEntity<List<Album>> searchAlbumByTitleContaining(@RequestParam String userIdPhone,
                                                                     @RequestParam String title) {
         List<Album> albums = albumService.searchAlbumByTitleContaining(userIdPhone, title);
         return ResponseEntity.ok(albums);
     }
     // 앨범 삭제
    @Operation(summary = "앨범 삭제", description = "앨범 고유 번호로 앨범을 삭제합니다.")
    @Parameter(name = "albumId", description = "앨범 고유 번호(아이디)")
    @DeleteMapping("/{albumId}")
    public ResponseEntity<String> deleteAlbum(@PathVariable Long albumId) {
        albumService.deleteAlbum(albumId);
        return ResponseEntity.ok("앨범이 삭제되었습니다.");
    }

    //앨범 수정 등등등 


}
package okmewakka.youkids.Service;

import okmewakka.youkids.Repository.AlbumRepository;
import okmewakka.youkids.Repository.PhotoRepository;
import okmewakka.youkids.Repository.UserRepository;
import okmewakka.youkids.entity.Album;
import okmewakka.youkids.entity.Photo;
import okmewakka.youkids.entity.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;


@Service
public class AlbumService {

    @Autowired
    private AlbumRepository albumRepository;

    @Autowired
    private PhotoRepository photoRepository;

    @Autowired
    private UserRepository userRepository;

    // 앨범 생성
    public Album createAlbum( String userIdPhone, String title, List<String> photoUrls) {
        user user = userRepository.findByUserIdPhone(userIdPhone);

        Album album = new Album();
        album.setTitle(title);
        album.setUser(user);

        // 앨범에 사진 추가
        List<Photo> photos = new ArrayList<>();
        for (String url : photoUrls) {
            Photo photo = new Photo();
            photo.setFilePath(url);
            photo.setAlbum(album);
            photos.add(photo);
        }

        // 첫 번째 사진을 대표 사진으로 설정
        if (!photos.isEmpty()) {
            album.setCoverPhoto(photos.get(0));
        }

        album.setPhotos(photos);
        albumRepository.save(album);

        return album;
    }

    // 앨범의 사진 갯수 가져오기
    public int getPhotoCount(Long albumId) {
        Album album = albumRepository.findById(albumId).orElseThrow(() -> new RuntimeException("Album not found"));
        return album.getPhotoCount();
    }

    // 대표 사진 변경
    public Album changeCoverPhoto(Long albumId, Long photoId) {
        Album album = albumRepository.findById(albumId).orElseThrow(() -> new RuntimeException("Album not found"));
        Photo photo = photoRepository.findById(photoId).orElseThrow(() -> new RuntimeException("Photo not found"));

        album.setCoverPhoto(photo);
        return albumRepository.save(album);
    }

     // 앨범 제목으로 검색 (정확한 일치)
     public List<Album> searchAlbumByTitle(String userIdPhone, String title) {
        return albumRepository.findByTitleAndUserUserIdPhone(title, userIdPhone);
    }

    // 앨범 제목의 일부로 검색 (포함된 제목 검색)
    public List<Album> searchAlbumByTitleContaining(String userIdPhone, String title) {
        return albumRepository.findByTitleContainingAndUserUserIdPhone(title, userIdPhone);
    }

      // 앨범 삭제
    @Transactional
    public void deleteAlbum(Long albumId) {
        // 앨범이 존재하는지 확인
        Album album = albumRepository.findById(albumId)
                .orElseThrow(() -> new IllegalArgumentException("해당 앨범이 존재하지 않습니다. ID: " + albumId));
        
        // 앨범 삭제
        albumRepository.deleteById(albumId);
    }

}

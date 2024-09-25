package okmewakka.youkids.Service;

import okmewakka.youkids.Repository.AlbumRepository;
import okmewakka.youkids.Repository.PhotoRepository;
import okmewakka.youkids.Repository.UserRepository;
import okmewakka.youkids.entity.Album;
import okmewakka.youkids.entity.Photo;
import okmewakka.youkids.entity.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}

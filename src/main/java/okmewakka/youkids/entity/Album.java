package okmewakka.youkids.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Getter
@Setter
@Entity
@Table(name = "albums")
public class Album {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @ManyToOne
    @JsonIgnore  // 직렬화 시 이 필드를 무시하여 순환 참조 방지
    @JoinColumn(name = "user_id", nullable = false)
    private user user;

    @OneToMany(mappedBy = "album", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference  // photos 필드에서 직렬화 관리 역할 수행
    private List<Photo> photos = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "cover_photo_id")
    private Photo coverPhoto;

    @Column(name = "create_date")
    private LocalDateTime createDate;

    // 앨범에 추가된 사진의 갯수 반환 메서드
    public int getPhotoCount() {
        return photos.size();
    }

    // 앨범 생성 시 createDate를 현재 시간으로 설정
    @PrePersist
    protected void onCreate() {
        this.createDate = LocalDateTime.now();
    }
}


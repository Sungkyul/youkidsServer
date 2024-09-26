package okmewakka.youkids.entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;


@Getter@Setter
@Entity
@Table(name = "photos")
@Schema(description = "사진 전송 정보")
public class Photo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "아이디")
    private Long id;

    @Column(name="file_name")
    @Schema(description = "파일 이름")
    private String fileName;

    
    @Column(name="uuid")
    @Schema(description = "파일에 해당하는 코드")
    private String uuid;

    @Column(name="file_path")
    @Schema(description = "파일 이름")
    private String filePath;

    @Column(name="upload_date")
    @Schema(description = "파일 저장 날짜")
    private LocalDateTime uploadDate;

    @Column(name="group_id")
    @Schema(description = "얼굴 인식 동일 그룹")
    private int groupId;
    

    // Setters
    public void setUploadDate(LocalDateTime localDateTime) {
        this.uploadDate = localDateTime;
    }
 
    @ManyToOne
    @JoinColumn(name = "album_id")
    @JsonBackReference  // album 필드에서 직렬화 제외, 순환 참조 방지
    private Album album;

    @PrePersist
    protected void onUpload() {
        this.uploadDate = LocalDateTime.now();
    }
}


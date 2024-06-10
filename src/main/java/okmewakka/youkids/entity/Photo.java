package okmewakka.youkids.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;



import lombok.Getter;
import lombok.Setter;


@Getter@Setter
@Entity
@Table(name = "photos")
@Schema(description = "사진 전송 정보")
public class Photo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "사용자 아이디")
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

    @OneToMany(mappedBy = "photo", cascade = CascadeType.ALL)
    private List<Face> faces = new ArrayList<>();

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date uploadDate = new Date(); // 업로드 날짜

 
}


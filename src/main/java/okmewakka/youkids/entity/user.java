package okmewakka.youkids.entity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.GenericGenerator;
import io.swagger.v3.oas.annotations.media.Schema;


    @Data
    @Getter @Setter
    @NoArgsConstructor // Lombok 어노테이션 : 기본 생성자 자동 추가
    @Entity
    @Schema(description = "사용자 정보")
    public class user {



        @Id
        @GeneratedValue(generator = "UUID")
        @GenericGenerator(
                name = "UUID",
                strategy = "org.hibernate.id.UUIDGenerator"
        )
        @Column(name = "id", updatable = false, nullable = false)
        @Schema(description = "사용자 ID")
        private String id;

        @Column(name = "user_id_phone")
        @Schema(description = "사용자 전화번호")
        private String userIdPhone;

        @Column(name = "user_name")
        @Schema(description = "사용자 이름")
        private String userName;

        @Column(name = "user_password")
        @Schema(description = "사용자 비밀번호")
        private String userPassword;

        @Column(name = "user_profile_file_name")
        @Schema(description = "사용자 프로필 사진 파일 이름")
        private String userProfileFileName;

        @Column(name = "user_profile_file_path")
        @Schema(description = "사용자 프로필 사진 파일 경로")
        private String userProfileFilePath;

        @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
        private List<Album> albums = new ArrayList<>();

        public user orElseThrow(Object object) {
            // TODO Auto-generated method stub
            throw new UnsupportedOperationException("Unimplemented method 'orElseThrow'");
        }







    }
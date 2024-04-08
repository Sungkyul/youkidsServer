package okmewakka.youkids.entity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Blob;



    @Data
    @Getter @Setter
    @NoArgsConstructor // Lombok 어노테이션 : 기본 생성자 자동 추가
    @Entity
    public class user {


        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int id;
        private String userIdPhone;
        private String userName;
        private String userPassword;
        private Blob userProfile;




    }

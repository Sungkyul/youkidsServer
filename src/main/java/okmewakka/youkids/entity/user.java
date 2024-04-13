package okmewakka.youkids.entity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;


@Data
    @Getter @Setter
    @NoArgsConstructor // Lombok 어노테이션 : 기본 생성자 자동 추가
    @Entity
    public class user {



        @Id
        @GeneratedValue(generator = "UUID")
        @GenericGenerator(
                name = "UUID",
                strategy = "org.hibernate.id.UUIDGenerator"
        )
        @Column(name = "id", updatable = false, nullable = false)
        private String id;
        @Column(name = "user_id_phone")
        private String userIdPhone;
        @Column(name = "user_name")
        private String userName;
        @Column(name = "user_password")
        private String userPassword;
        @Column(name = "user_profile_file_name")
        private String userProfileFileName;
        @Column(name = "user_profile_file_path")
        private String userProfileFilePath;







    }

package okmewakka.youkids.entity;

import jakarta.persistence.*;

@Entity
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Lob
    private byte[] image;

    public void setTitle(String title) {
    }

    public void setImage(byte[] bytes) {
    }
}

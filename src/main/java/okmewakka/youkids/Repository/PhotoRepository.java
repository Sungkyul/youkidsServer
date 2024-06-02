package okmewakka.youkids.Repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import okmewakka.youkids.entity.Photo;


@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {
    List<Photo> findByUuid(String uuid);

    
}
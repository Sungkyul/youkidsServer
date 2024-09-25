package okmewakka.youkids.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import okmewakka.youkids.entity.Album;

@Repository
public interface AlbumRepository extends JpaRepository<Album, Long> {}
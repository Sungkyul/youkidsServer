package okmewakka.youkids.Repository;

import okmewakka.youkids.entity.user;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<user, Long> {
    List<user> findByuserIdPhone(String phoneNumber);

    }

package okmewakka.youkids.Repository;

import okmewakka.youkids.entity.user;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<user, Long> {

    user findByUserIdPhone(String userIdPhone);

    }

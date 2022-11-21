package emonets.backend.models;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface AppUserRepo extends JpaRepository<AppUser, Long>{

    Optional<AppUser> findByEmail(String email);
    void deleteByEmail(String email);
    
    @Transactional
    @Modifying
    @Query("UPDATE AppUser a "+
            "SET a.enabled = TRUE "+
            "WHERE a.email = ?1"
    )
    int enableAppUser(String email);
}

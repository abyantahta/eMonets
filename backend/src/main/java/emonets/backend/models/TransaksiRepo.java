package emonets.backend.models;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TransaksiRepo extends JpaRepository<Transaksi, Long>{
    
    @Query("SELECT t FROM Transaksi t WHERE t.appUser.email = ?1")
    List<Transaksi> findAllByEmail(String email);
}

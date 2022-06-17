package com.example.gmaoapp.repository.otRepository;

import com.example.gmaoapp.models.ot.LigneOtPreventif;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LigneOtPreventifRepository extends JpaRepository<LigneOtPreventif, Long> {

}
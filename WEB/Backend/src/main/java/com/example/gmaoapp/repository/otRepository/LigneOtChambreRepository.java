package com.example.gmaoapp.repository.otRepository;

import com.example.gmaoapp.models.ot.LigneOtChambre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LigneOtChambreRepository extends JpaRepository<LigneOtChambre, Long> {
    LigneOtChambre findLigneOtChambreById(long id);

}
package com.example.gmaoapp.repository.otRepository;

import com.example.gmaoapp.models.ot.OTReclamationChambre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OTReclamationChambreRepository extends JpaRepository<OTReclamationChambre, Long> {
    OTReclamationChambre findOTReclamationChambreById(Long id);
}
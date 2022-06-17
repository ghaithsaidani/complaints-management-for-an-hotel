package com.example.gmaoapp.repository.otRepository;

import com.example.gmaoapp.models.ot.OTReclamtionEquipement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OTReclamtionEquipementRepository extends JpaRepository<OTReclamtionEquipement, Long> {
}
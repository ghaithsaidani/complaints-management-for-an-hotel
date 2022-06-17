package com.example.gmaoapp.repository;

import com.example.gmaoapp.models.ot.LigneOtEquipement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LigneOtEquipementRepository extends JpaRepository<LigneOtEquipement, Long> {
}
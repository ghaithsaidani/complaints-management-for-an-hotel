package com.example.gmaoapp.repository;


import com.example.gmaoapp.models.Equipement;
import com.example.gmaoapp.models.ot.OT;
import com.example.gmaoapp.models.reclamations.Reclamation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface EquipementRepository extends JpaRepository<Equipement,Long> {

    @Transactional
    @Modifying
    @Query("UPDATE Equipement e " +
            "SET e.etat = TRUE WHERE e.id = ?1")
    int enableEquipement(Long id);


    @Transactional
    @Modifying
    @Query("UPDATE Equipement e " +
            "SET e.etat = FALSE WHERE e.id = ?1")
    int disableEquipement(Long id);


    @Query(value = "select * from mydatabase.disponibilite",nativeQuery = true)
    List<Object> disponibilite_equipements();

    @Query(value = "select truncate(avg(disponibilite),2) from mydatabase.disponibilite",nativeQuery = true)
    Object average_disponibilite();

    @Query(value = "select e from Equipement e order by e.etat_equipement,e.createdAt")
    List<Equipement> getAllOrderedByEtat();

    @Query(value = "select e from Equipement e where e.etat=true")
    List<Equipement> getActive();
}

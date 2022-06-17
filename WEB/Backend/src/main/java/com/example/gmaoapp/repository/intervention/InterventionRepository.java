package com.example.gmaoapp.repository.intervention;

import com.example.gmaoapp.models.intervention.Intervention;
import com.example.gmaoapp.models.ot.OT;
import com.example.gmaoapp.models.reclamations.Reclamation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface InterventionRepository extends JpaRepository<Intervention, Long> {

    @Transactional
    @Modifying
    @Query("UPDATE Intervention i " +
            "SET i.etat = FALSE WHERE i.id = ?1")
    int disableIntervention(Long id);

    @Transactional
    @Modifying
    @Query("UPDATE Intervention i " +
            "SET i.etat = TRUE WHERE i.id = ?1")
    int enableIntervention(Long id);

    @Query(value = "select i from Intervention i order by i.dateCloture desc")
    List<Intervention> getAllOrderedByDate();


    @Query(value = "select i from Intervention i where i.etat=true")
    List<Intervention> getActive();
}
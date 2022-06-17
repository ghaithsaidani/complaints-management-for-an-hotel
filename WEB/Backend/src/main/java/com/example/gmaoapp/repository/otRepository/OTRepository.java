package com.example.gmaoapp.repository.otRepository;

import com.example.gmaoapp.models.ot.OT;
import com.example.gmaoapp.models.reclamations.Reclamation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface  OTRepository extends JpaRepository<OT, Long> {
    @Transactional
    @Modifying
    @Query("UPDATE OT ot " +
            "SET ot.etat = TRUE WHERE ot.id = ?1")
    int enableOT(Long id);

    @Transactional
    @Modifying
    @Query("UPDATE OT ot " +
            "SET ot.etat = FALSE WHERE ot.id = ?1")
    int disableOT(Long id);

    @Query(value = "select o from OT o order by o.cloturage,o.dateLancement desc")
    List<OT> getAllOrderedByCloture();

    @Query(value = "select o from OT o where  o.cloturage =0")
    List<OT> getAllOtEnCours();

    @Query(value = "select count(ot) from OT ot where ot.cloturage=0 and ot.etat=true")
    long count_ots_en_cours();


    @Query(value = "select o from OT o where o.etat=true")
    List<OT> getActive();
}
package com.example.gmaoapp.repository;

import com.example.gmaoapp.models.Equipement;
import com.example.gmaoapp.models.Intervenant;
import com.example.gmaoapp.models.ot.OT;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface IntervenantRepository extends JpaRepository<Intervenant, Long> {

    /*@Query(value = "select * from intervenant  where etat = true"
            ,nativeQuery = true)
    List<Intervenant> loadValidIntervenant();*/

    /*@Query(value = "select * from intervenant  where id like '%'+:keyword+'%' or nom like '%'+:keyword+'%'"+
            "or prenom like '%'+:keyword+'%' or tel like '%'+:keyword+'%' or profession like '%'+:keyword+'%'"
            ,nativeQuery = true)
    List<Intervenant> chercherIntervenant(@Param("keyword") String keyword);*/

    Intervenant findIntervenantById(Long id);

    @Transactional
    @Modifying
    @Query("UPDATE Intervenant i " +
            "SET i.etat = TRUE WHERE i.id = ?1")
    int enableIntervenant(Long id);


    @Transactional
    @Modifying
    @Query("UPDATE Intervenant i " +
            "SET i.etat = FALSE WHERE i.id = ?1")
    int disableIntervenant(Long id);


    @Query(value = "select * from mydatabase.nombre_ot_par_intervenant",nativeQuery = true)
    List<Object> getNb_Ot_par_Intevenant();


    @Query(value = "select i from Intervenant i order by i.disponibilite desc")
    List<Intervenant> getAllOrderedByDisponibilte();

    @Query(value = "select i from Intervenant i where i.etat=true")
    List<Intervenant> getActive();

}

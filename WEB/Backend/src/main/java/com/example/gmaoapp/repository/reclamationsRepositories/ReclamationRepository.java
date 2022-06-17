package com.example.gmaoapp.repository.reclamationsRepositories;

import com.example.gmaoapp.models.reclamations.Reclamation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;
import java.util.List;

public interface ReclamationRepository extends JpaRepository<Reclamation,Long> {
    @Transactional
    @Modifying
    @Query("UPDATE Reclamation r " +
            "SET r.etat = TRUE WHERE r.id = ?1")
    int enableReclamation(Long id);


    @Query(value = "select mydatabase.get_difference(created_at,updated_at) from reclamations",nativeQuery = true)
    List<Object> countreclamations_switch_equipement();


    @Query(value = "call mydatabase.get_reclamations_by_day(:firstDate ,:secondDate)",nativeQuery = true)
    List<Object> ReclamationBetweenTwoDatesGroupedByDay(@RequestParam("firstDate") Date firstDate, @RequestParam("secondDate") Date secondDate);

    @Query(value = "call mydatabase.get_reclamations_by_month(:firstDate ,:secondDate)",nativeQuery = true)
    List<Object> ReclamationBetweenTwoDatesGroupedByMonth(@RequestParam("firstDate") Date firstDate, @RequestParam("secondDate") Date secondDate);

    @Query(value = "call mydatabase.get_reclamations_by_year(:firstDate ,:secondDate)",nativeQuery = true)
    List<Object> ReclamationBetweenTwoDatesGroupedByYear(@RequestParam("firstDate") Date firstDate, @RequestParam("secondDate") Date secondDate);



    @Transactional
    @Modifying
    @Query("UPDATE Reclamation r " +
            "SET r.etat = FALSE WHERE r.id = ?1")
    int disableReclamation(Long id);

    @Query(value = "select r from Reclamation r order by r.avancement,r.updatedAt desc,r.priorite")
    List<Reclamation> getAllOrderedByAvancement();

    @Query(value = "select r from Reclamation r where r.avancement=0  order by r.createdAt,r.priorite desc")
    List<Reclamation> getNonTraite();

    @Query(value = "select count(r) from Reclamation r where r.avancement=0  order by r.createdAt,r.priorite desc")
    long getCountNonTraite();

    @Query(value = "select r from Reclamation r where r.etat=true")
    List<Reclamation> getActive();

}



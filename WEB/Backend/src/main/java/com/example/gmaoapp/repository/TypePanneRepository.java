package com.example.gmaoapp.repository;

import com.example.gmaoapp.models.Equipement;
import com.example.gmaoapp.models.TypePanne;
import com.example.gmaoapp.models.ot.OT;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface TypePanneRepository extends JpaRepository<TypePanne,Long> {
    @Transactional
    @Modifying
    @Query("UPDATE TypePanne tp " +
            "SET tp.etat = TRUE WHERE tp.id = ?1")
    int enablePanne(Long id);


    @Transactional
    @Modifying
    @Query("UPDATE TypePanne tp " +
            "SET tp.etat = FALSE WHERE tp.id = ?1")
    int disablePanne(Long id);

    @Query(value = "select * from mydatabase.panne_plus_repete",nativeQuery = true)
    List<Object> Panne_Plus_Repete();

    @Query(value = "select tp from TypePanne tp order by tp.createdAt desc")
    List<TypePanne> getAllOrderedByDate();


    @Query(value = "select p from TypePanne p where p.etat=true")
    List<TypePanne> getActive();

}

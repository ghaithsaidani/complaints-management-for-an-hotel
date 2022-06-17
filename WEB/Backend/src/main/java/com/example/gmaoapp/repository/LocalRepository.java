package com.example.gmaoapp.repository;


import com.example.gmaoapp.models.Local;
import com.example.gmaoapp.models.ot.OT;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Repository
public interface LocalRepository extends JpaRepository<Local,Long> {
    @Transactional
    @Modifying
    @Query("UPDATE Local l " +
            "SET l.etat = TRUE WHERE l.id = ?1")
    int enableLocal(Long id);


    @Transactional
    @Modifying
    @Query("UPDATE Local l " +
            "SET l.etat = FALSE WHERE l.id = ?1")
    int disableLocal(Long id);

    @Query(value = "select l from Local l order by l.createdAt desc")
    List<Local> getAllOrderedByDate();

    @Query(value = "select l from Local l where l.etat=true")
    List<Local> getActive();

}

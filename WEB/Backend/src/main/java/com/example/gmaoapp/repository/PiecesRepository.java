package com.example.gmaoapp.repository;

import com.example.gmaoapp.models.Pieces;
import com.example.gmaoapp.models.ot.OT;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface PiecesRepository extends JpaRepository<Pieces,Long> {

    @Query(value = "select * from pieces  where etat = true"
            ,nativeQuery = true)
    List<Pieces> loadValidPieces();

    Pieces findPiecesById(Long id);

    @Transactional
    @Modifying
    @Query("UPDATE Pieces p " +
            "SET p.etat = TRUE WHERE p.id = ?1")
    int enablePiece(Long id);


    @Transactional
    @Modifying
    @Query("UPDATE Pieces p " +
            "SET p.etat = FALSE WHERE p.id = ?1")
    int disablePiece(Long id);

    @Query(value = "select p from Pieces  p where p.etat = true order by (p.quantiteStock/p.quantiteMinimal) asc")
    List<Pieces> getEnReserve();


    @Query(value = "select p from Pieces p where p.etat=true")
    List<Pieces> getActive();


}

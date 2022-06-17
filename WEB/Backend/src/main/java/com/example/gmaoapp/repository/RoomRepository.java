package com.example.gmaoapp.repository;


import com.example.gmaoapp.models.Equipement;
import com.example.gmaoapp.models.Room;
import com.example.gmaoapp.models.ot.OT;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room,Long> {
    @Transactional
    @Modifying
    @Query("UPDATE Room r " +
            "SET r.etat = TRUE WHERE r.id = ?1")
    int enableRoom(Long id);


    @Transactional
    @Modifying
    @Query("UPDATE Room r " +
            "SET r.etat = FALSE WHERE r.id = ?1")
    int disableRoom(Long id);


    @Query(value = "select r from Room r order by r.createdAt desc")
    List<Room> getAllOrderedByDate();

    @Query(value = "select r from Room r where r.etat=true")
    List<Room> getActive();

}

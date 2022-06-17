package com.example.gmaoapp.services;

import com.example.gmaoapp.models.Room;
import com.example.gmaoapp.models.ot.OT;
import com.example.gmaoapp.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;


    public List<Room> getRooms(){
        return roomRepository.getAllOrderedByDate();
    }

    public Room saveRoom(Room room){
        return roomRepository.save(room);
    }

    public Room findByID(Long id){
        return roomRepository.findById(id).get();
    }

    public int enableRoom(Long id) {
        return roomRepository.enableRoom(id);
    }

    public int disableRoom(Long id) {
        return roomRepository.disableRoom(id);
    }

    public List<Room> getActive(){
        return roomRepository.getActive();
    }


    /*public void addPannetoRoom(Long roomId,Long panneId){

        Room room=roomRepository.findById(roomId).get();
        TypePanne panne=typePanneRepository.findById(panneId).get();

        room.getTypePannes().add(panne);
        panne.setRoom(room);
        typePanneRepository.save(panne);
        roomRepository.save(room);
    }*/

    public Room updateRoom(Room room){

        room.setUpdatedAt(new Date());
        return roomRepository.save(room);
    }
}

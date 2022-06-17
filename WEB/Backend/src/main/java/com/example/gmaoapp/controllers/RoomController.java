package com.example.gmaoapp.controllers;



import com.example.gmaoapp.models.Room;
import com.example.gmaoapp.services.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/chambres")
public class RoomController {
    @Autowired
    private RoomService roomService;

    @GetMapping("/all")
    public List<Room> getRooms(){
        return roomService.getRooms();
    }

    @GetMapping("/active")
    public List<Room> getActive(){
        return roomService.getActive();
    }

    @PostMapping(value="/chambre/save")
    public ResponseEntity<Room> addLocal(@RequestBody Room room){

        URI uri=URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/chambres/chambre/save").toUriString());
        return ResponseEntity.created(uri).body(roomService.saveRoom(room));
    }


    @PutMapping("/update")
    public ResponseEntity<Room> updateroom(@RequestBody Room room){
        return new ResponseEntity<>(roomService.updateRoom(room), HttpStatus.OK);
    }


    @GetMapping("/find/{id}")
    public ResponseEntity<Room> findRoom(@PathVariable("id") Long id){
        return new ResponseEntity<>(roomService.findByID(id),HttpStatus.OK);
    }

    /*@PostMapping(value="/panne/addpanne")
    public ResponseEntity<?> addEquipementtoLocal(@RequestBody IDtoIDForm form){
        roomService.addPannetoRoom(form.getFirstId(),form.getSecondId());
        return ResponseEntity.ok().build();
    }*/

    @PutMapping("/chambre/activate/{id}")
    public ResponseEntity<?> ActivateRoom(@PathVariable("id") Long id){
        return new ResponseEntity<>(roomService.enableRoom(id),HttpStatus.OK);
    }

    @PutMapping("/chambre/desactivate/{id}")
    public ResponseEntity<?> DesactivateRoom(@PathVariable("id") Long id){
        return new ResponseEntity<>(roomService.disableRoom(id),HttpStatus.OK);
    }
}

/*@Data
class PannetoRoomForm {
    private Long panneId;
    private Long roomId;
}*/

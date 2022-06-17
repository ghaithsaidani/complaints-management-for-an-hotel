package com.example.gmaoapp.controllers;
import com.example.gmaoapp.models.Room;
import com.example.gmaoapp.models.TypePanne;
import com.example.gmaoapp.services.TypePanneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/pannes")
public class TypePanneController {

    @Autowired
    private TypePanneService typepanneservice;



    @GetMapping("/all")
    public List<TypePanne> getTypePannes(){
        return typepanneservice.getTypesPannes();
    }

    @GetMapping("/active")
    public List<TypePanne> getActive(){
        return typepanneservice.getActive();
    }


    @GetMapping("/plus_repete")
    public List<Object> Panne_Plus_Repete(){

        return typepanneservice.Panne_Plus_Repete();
    }

    @PostMapping(value="/panne/save")
    public ResponseEntity<TypePanne> addPanne(@RequestBody TypePanne panne){

        URI uri=URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/pannes/panne/save").toUriString());
        return ResponseEntity.created(uri).body(typepanneservice.saveTypePanne(panne));
    }

    @PutMapping("/update")
    public ResponseEntity<TypePanne> updatePanne(@RequestBody TypePanne panne){
        return new ResponseEntity<>(typepanneservice.updatePanne(panne), HttpStatus.OK);
    }


    @GetMapping("/find/{id}")
    public ResponseEntity<TypePanne> findPanne(@PathVariable("id") Long id){
        return new ResponseEntity<>(typepanneservice.findByID(id),HttpStatus.OK);
    }


    @PutMapping("/panne/activate/{id}")
    public ResponseEntity<?> ActivatePanne(@PathVariable("id") Long id){
        return new ResponseEntity<>(typepanneservice.enableTypePanne(id),HttpStatus.OK);
    }

    @PutMapping("/panne/desactivate/{id}")
    public ResponseEntity<?> DesactivatePanne(@PathVariable("id") Long id){
        return new ResponseEntity<>(typepanneservice.disableTypePanne(id),HttpStatus.OK);
    }





    /*@PutMapping("/{typepanneId}/chambre/{chambreId}")
    TypePanne enrolltypepannetochambre(@PathVariable Long typepanneId, @PathVariable Long chambreId){
        Chambre chambre=chambreService.findByID(chambreId);
        TypePanne typePanne =typepanneservice.findByID(typepanneId);
        chambre.enrollTypePanne(typePanne);
        typePanne.enrollChambre(chambre);
        return typepanneservice.saveTypePanne(typePanne);

    }*/
}


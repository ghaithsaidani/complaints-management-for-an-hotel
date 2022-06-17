package com.example.gmaoapp.controllers;
import com.example.gmaoapp.models.Equipement;
import com.example.gmaoapp.services.EquipementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/equipements")
public class EquipementController {

    @Autowired
    private EquipementService equipementservice;



    @GetMapping("/all")
    public List<Equipement> getEquipements(){
        return equipementservice.getEquipements();
    }

    @GetMapping("/active")
    public List<Equipement> getActive(){
        return equipementservice.getActive();
    }

    @GetMapping("/withoutLocals")
    public List<Equipement> getEquipementswithoutLocals(){
        return equipementservice.getEquipementswithoutLocal();
    }

    @PostMapping(value="/equipement/save")
    public ResponseEntity<Equipement> addEquipement(@RequestBody Equipement equipement){

        URI uri=URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/equipements/equipement/save").toUriString());
        return ResponseEntity.created(uri).body(equipementservice.saveEquipement(equipement));
    }

    /*@PutMapping("/{equipementId}/local/{localId}")
    Equipement enrollequipementtolocal(@PathVariable Long equipementId, @PathVariable Long localId){
        Local local=localservice.findByID(localId);
        Equipement equipement =equipementservice.findByID(equipementId);
        local.enrollEquipement(equipement);
        equipement.enrollLocal(local);
        return equipementservice.saveEquipement(equipement);

    }*/

    @PutMapping("/update")
    public ResponseEntity<Equipement> updateEquipement(@RequestBody Equipement equipement){
        return new ResponseEntity<>(equipementservice.updateEquipement(equipement), HttpStatus.OK);
    }


    @GetMapping("/find/{id}")
    public ResponseEntity<Equipement> findEquipement(@PathVariable("id") Long id){
        return new ResponseEntity<>(equipementservice.findByID(id),HttpStatus.OK);
    }

    @PutMapping("/equipement/activate/{id}")
    public ResponseEntity<?> ActivateEquipement(@PathVariable("id") Long id){
        return new ResponseEntity<>(equipementservice.enableEquipement(id),HttpStatus.OK);
    }

    @PutMapping("/equipement/desactivate/{id}")
    public ResponseEntity<?> DesactivateEquipement(@PathVariable("id") Long id){
        return new ResponseEntity<>(equipementservice.disableEquipement(id),HttpStatus.OK);
    }

    @GetMapping(value = "/disponibilites")
    public List<Object> getDisponibilteEquipements(){
        return equipementservice.getDisponibilte_equipement();
    }


    @GetMapping(value = "/avgdispo")
    public Object getAvgDisponibilteEquipements(){
        return equipementservice.get_avg_disponibilite();
    }


}



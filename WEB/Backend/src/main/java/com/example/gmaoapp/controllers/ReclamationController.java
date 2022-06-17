package com.example.gmaoapp.controllers;
import com.example.gmaoapp.models.forms.AddReclamationForm;
import com.example.gmaoapp.models.forms.IDtoIDForm;
import com.example.gmaoapp.models.reclamations.Reclamation;
import com.example.gmaoapp.services.ReclamationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/reclamations")
public class ReclamationController {
    @Autowired
    private ReclamationService reclamationservice;



    @GetMapping(value = "/all")
    public List<Reclamation> getReclamations(){
        return reclamationservice.getReclamations();
    }

    @GetMapping(value = "/active")
    public List<Reclamation> getActive(){
        return reclamationservice.getActive();
    }

    @GetMapping(value = "/ReclamationsGroupedByDay")
    public List<Object> getReclamationsBetweenGroupedByDay(@RequestParam("firstDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date firstDate, @RequestParam("secondDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date secondDate){
        return reclamationservice.getReclamationsCountBetweenGroupedByDay(firstDate,secondDate);
    }

    @GetMapping(value = "/non-traite")
    public List<Reclamation> getReclamationsNonTraite(){
        return reclamationservice.getReclamationsNonTraite();
    }

    @GetMapping(value = "/count_non_traite")
    public long getCountReclamationsNonTraite(){
        return reclamationservice.ReclamationNonTraiteCount();
    }

    @GetMapping(value = "/count")
    public long count(){
        return reclamationservice.getCount();
    }


    @GetMapping(value = "/ReclamationsGroupedByMonth")
    public List<Object> getReclamationsBetweenGroupedByMonth(@RequestParam("firstDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date firstDate, @RequestParam("secondDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date secondDate){
        return reclamationservice.getReclamationsCountBetweenGroupedByMonth(firstDate,secondDate);
    }

    @GetMapping(value = "/ReclamationsGroupedByYear")
    public List<Object> getReclamationsBetweenGroupedByYear(@RequestParam("firstDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date firstDate, @RequestParam("secondDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date secondDate){
        return reclamationservice.getReclamationsCountBetweenGroupedByYear(firstDate,secondDate);
    }



    @GetMapping("/find/{id}")
    public ResponseEntity<Reclamation> getReclamation(@PathVariable("id") Long reclamationId){
        return new ResponseEntity<>(reclamationservice.findByID(reclamationId), HttpStatus.OK);
    }

    @PostMapping(value="/reclamation/save")
    public ResponseEntity<Reclamation> addReclamation(@RequestBody Reclamation reclamation){
        URI uri=URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/reclamations/reclamation/save").toUriString());
        return ResponseEntity.created(uri).body(reclamationservice.saveReclamation(reclamation));
    }


    @PutMapping("/reclamation/activate/{id}")
    public ResponseEntity<?> ActivateReclamation(@PathVariable("id") Long id){
        return new ResponseEntity<>(reclamationservice.enableReclamation(id),HttpStatus.OK);
    }

    @PutMapping("/reclamation/desactivate/{id}")
    public ResponseEntity<?> DesactivateReclamation(@PathVariable("id") Long id){
        return new ResponseEntity<>(reclamationservice.disableReclamation(id),HttpStatus.OK);
    }

    @PutMapping(value="/update")
    public ResponseEntity<Reclamation> updateReclamation(@RequestBody Reclamation reclamation){
        return new ResponseEntity<>(reclamationservice.updateReclamation(reclamation), HttpStatus.OK);
    }



    @GetMapping(value = "/byequipement")
    public List<Object> getReclamationsCount_switch_equipements(){
        return reclamationservice.getreclamationsCount_switch_equipement();
    }

    /*@PutMapping("/{reclamationId}/reclamation/{concernedId}")
    Reclamation enrolltoreclamation(@PathVariable Long reclamationId, @PathVariable Long concernedId){

        Equipement equipement =equipementservice.findByID(equipementId);
        reclamation.enrollEquipement(equipement);
        equipement.enrollReclamation(reclamation);
        return reclamationservice.saveReclamation(reclamation);

    }*/
    @PostMapping(value="/addequipementtoreclamation")
    public ResponseEntity<Reclamation> addEquipementtoReclmation(@RequestBody IDtoIDForm form){
            reclamationservice.addEquipementtoReclamation(form.getFirstId(),form.getSecondId());
            return ResponseEntity.ok().body(reclamationservice.findByID(form.getFirstId()));
    }

    @PostMapping(value="/addpannetoreclamation")
    public ResponseEntity<Reclamation> addConcernedtoReclmation(@RequestBody AddReclamationForm form){
        reclamationservice.addtypePannetoReclamation(form.getReclamationId(),form.getPanneId(),form.getRoomId());
        return ResponseEntity.ok().body(reclamationservice.findByID(form.getReclamationId()));
    }

}



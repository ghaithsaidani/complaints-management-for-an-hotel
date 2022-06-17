package com.example.gmaoapp.controllers;

import com.example.gmaoapp.models.intervention.Intervention;
import com.example.gmaoapp.models.forms.InterventionForm;
import com.example.gmaoapp.services.InterventionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/interventions")
public class InterventionController {

    @Autowired
    InterventionService interventionService;



    @GetMapping("/tous")
    public ResponseEntity<List<Intervention>> chargerTous(){
        List<Intervention> interventions=interventionService.chargerTous();
        return new ResponseEntity<>(interventions, HttpStatus.OK);
    }

    @GetMapping("/active")
    public ResponseEntity<List<Intervention>> getActive(){
        List<Intervention> interventions=interventionService.getActive();
        return new ResponseEntity<>(interventions, HttpStatus.OK);
    }

    @GetMapping("/chercherParId/{id}")
    public ResponseEntity<Intervention>chercherInterventionParId(@PathVariable("id")long id){
        Intervention intervention=interventionService.chercherOtParId(id);
        return new ResponseEntity<>(intervention,HttpStatus.OK);
    }




    @PostMapping ("/ajouter")
    public ResponseEntity<Intervention> ajouterIntervention(@RequestBody InterventionForm interventionForm){
        return new ResponseEntity<>(interventionService.ajouterIntervention(interventionForm),HttpStatus.OK);
    }


    @PutMapping("/intervention/activate/{id}")
    public ResponseEntity<?> ActivateIntervention(@PathVariable("id") Long id){
        return new ResponseEntity<>(interventionService.enableIntervention(id),HttpStatus.OK);
    }

    @PutMapping("/intervention/desactivate/{id}")
    public ResponseEntity<?> DesactivateIntervention(@PathVariable("id") Long id){
        return new ResponseEntity<>(interventionService.disableIntervention(id),HttpStatus.OK);
    }


}

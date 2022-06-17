package com.example.gmaoapp.controllers;

import com.example.gmaoapp.models.Intervenant;
import com.example.gmaoapp.services.IntervenantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/intervenants")
public class IntervenantController {
    @Autowired
    IntervenantService intervenantService;

    public IntervenantController(IntervenantService intervenantService) {
        this.intervenantService = intervenantService;
    }



    @GetMapping("/all")
    public List<Intervenant> chargerTous(){
        return intervenantService.chargerTous();
    }

    @GetMapping("/active")
    public List<Intervenant> getActive(){
        return intervenantService.getActive();
    }


    /*@GetMapping("/active")
    public ResponseEntity<List<Intervenant>> chargerActive(){
        List<Intervenant> intervenant=intervenantService.chargerActive();
        return new ResponseEntity<>(intervenant, HttpStatus.OK);
    }*/



    @GetMapping("/chercherParId/{id}")
    public ResponseEntity<Intervenant>chercherIntervenantParId(@PathVariable("id")long id){
        Intervenant intervenant=intervenantService.chercherIntervenantParId(id);
        return new ResponseEntity<>(intervenant,HttpStatus.OK);

    }

    @GetMapping("/intervenantparot")
    public ResponseEntity<List<Object>> intervenantParOt(){

        return new ResponseEntity<>(intervenantService.getIntervenantsparot(),HttpStatus.OK);

    }


    /*@GetMapping("/chercher/{keyword}")
    public ResponseEntity<List<Intervenant>>chercherIntervenant(@PathVariable("keyword")String keyword){
        List<Intervenant> intervenant=intervenantService.chercherIntervenant(keyword);
        return new ResponseEntity<>(intervenant,HttpStatus.OK);

    }*/

    @PutMapping("/modifier")
    public ResponseEntity<Intervenant> modifierPieces(@RequestBody Intervenant intervenant){
        Intervenant intervenant1=intervenantService.modifierIntervenant(intervenant);
        return new ResponseEntity<>(intervenant1,HttpStatus.OK);
    }

    @PostMapping("/intervenant/save")
    public ResponseEntity<Intervenant> ajouterIntervenant(@RequestBody Intervenant intervenant){
        Intervenant intervenant1=intervenantService.ajouterIntervenant(intervenant);
        return new ResponseEntity<>(intervenant1,HttpStatus.OK);

    }

    @PutMapping("/intervenant/activate/{id}")
    public ResponseEntity<?> ActivateIntervenant(@PathVariable("id") Long id){
        return new ResponseEntity<>(intervenantService.enableIntervenant(id),HttpStatus.OK);
    }

    @PutMapping("/intervenant/desactivate/{id}")
    public ResponseEntity<?> DesactivateIntervenant(@PathVariable("id") Long id){
        return new ResponseEntity<>(intervenantService.disableIntervenant(id),HttpStatus.OK);
    }
}

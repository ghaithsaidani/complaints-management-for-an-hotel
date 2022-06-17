package com.example.gmaoapp.controllers.otControllers;

import com.example.gmaoapp.models.forms.OtFormModifier;
import com.example.gmaoapp.models.ot.OTPreventif;
import com.example.gmaoapp.services.otService.OtPreventifService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/OtPreventif")
public class OtPreventifController {

    @Autowired
    OtPreventifService otPreventifService;



    @GetMapping("/tous")
    public ResponseEntity<List<OTPreventif>> chargerTous(){
        List<OTPreventif> ot=otPreventifService.chargerTous();
        return new ResponseEntity<>(ot, HttpStatus.OK);
    }



    @GetMapping("/chercherParId/{id}")
    public ResponseEntity<OTPreventif>chercherOtChambreParId(@PathVariable("id")long id){
        OTPreventif ot=otPreventifService.chercherOtParId(id);
        return new ResponseEntity<>(ot,HttpStatus.OK);

    }



    @PostMapping("/modifier")
    public ResponseEntity<OTPreventif> modifierPieces(@RequestBody OtFormModifier otFormModifier){
        OTPreventif ot1=otPreventifService.modifierOt(otFormModifier);
        return new ResponseEntity<>(ot1,HttpStatus.OK);

    }




    /*@PostMapping ("/ajouter")
    public ResponseEntity<OTPreventif> ajouterOt(@RequestBody OtForm otForm){

        return new ResponseEntity<>(otPreventifService.ajouterOt(otForm),HttpStatus.OK);
    }*/


}

package com.example.gmaoapp.controllers;

import com.example.gmaoapp.models.PreventifSysteme;
import com.example.gmaoapp.services.PreventifSystemeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/preventif")
public class PreventifSystemeController {

    @Autowired
    PreventifSystemeService preventifSystemeService;


    @GetMapping(value = "/all")
    public List<PreventifSysteme> chargerPreventif(){
        return preventifSystemeService.chargerTous();
    }

    @GetMapping(value = "/getProche")
    public List<PreventifSysteme> getProche(){
        return preventifSystemeService.getProche();
    }



    @GetMapping("/find/{id}")
    public ResponseEntity<PreventifSysteme> chargerPreventifParId(@PathVariable("id") Long PrventifId){
        return new ResponseEntity<>(preventifSystemeService.chercherPreventifParId(PrventifId), HttpStatus.OK);
    }


}

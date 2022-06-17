package com.example.gmaoapp.controllers;


import com.example.gmaoapp.models.Local;
import com.example.gmaoapp.models.forms.IDtoIDForm;
import com.example.gmaoapp.services.LocalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/locaux")
public class LocalController {

    @Autowired
    private LocalService localService;



    @GetMapping("/all")
    public List<Local> getLocals(){

        return localService.getLocals();
    }

    @GetMapping("/active")
    public List<Local> getActive(){

        return localService.getActive();
    }

    @PutMapping("/local/activate/{id}")
    public ResponseEntity<?> ActivateLocal(@PathVariable("id") Long id){
        return new ResponseEntity<>(localService.enableLocal(id),HttpStatus.OK);
    }

    @PutMapping("/local/desactivate/{id}")
    public ResponseEntity<?> DesactivateLocal(@PathVariable("id") Long id){
        return new ResponseEntity<>(localService.disableLocal(id),HttpStatus.OK);
    }




    @PutMapping("/update")
    public ResponseEntity<Local> updateLocal(@RequestBody Local local){
        return new ResponseEntity<>(localService.updateLocal(local), HttpStatus.OK);
    }

    @PostMapping(value="/local/save")
    public ResponseEntity<Local> addLocal(@RequestBody Local local){

        URI uri=URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/locaux/local/save").toUriString());
        return ResponseEntity.created(uri).body(localService.saveLocal(local));
    }


    @GetMapping("/find/{id}")
    public ResponseEntity<Local> findLocal(@PathVariable("id") Long id){
        return new ResponseEntity<>(localService.findByID(id),HttpStatus.OK);
    }

    @PostMapping(value="/equipement/addequipement")
    public ResponseEntity<?> addEquipementtoLocal(@RequestBody IDtoIDForm form){
        localService.addEquipementtoLocal(form.getFirstId(),form.getSecondId());
        return ResponseEntity.ok().build();
    }
}

/*@Data
class EquipementtoLocalForm {
    private Long equipementId;
    private Long localId;
}*/

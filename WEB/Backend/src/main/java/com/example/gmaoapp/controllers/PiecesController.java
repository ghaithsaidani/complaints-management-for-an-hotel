package com.example.gmaoapp.controllers;

import com.example.gmaoapp.models.Pieces;
import com.example.gmaoapp.services.PiecesService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Pieces")
public class PiecesController {
    PiecesService piecesService;

    public PiecesController(PiecesService piecesService) {
        this.piecesService = piecesService;
    }

    @GetMapping("/chargerParStock")
    public ResponseEntity<List<Pieces>> chargerParStock(){
        List<Pieces> pieces=piecesService.chargerParStock();
        return new ResponseEntity<>(pieces, HttpStatus.OK);
    }

    @GetMapping("/tous")
    public ResponseEntity<List<Pieces>> chargerTous(){
        List<Pieces> pieces=piecesService.chargerTous();
        return new ResponseEntity<>(pieces, HttpStatus.OK);
    }



    @GetMapping("/active")
    public ResponseEntity<List<Pieces>> chargerActive(){
        List<Pieces> pieces=piecesService.chargerActive();
        return new ResponseEntity<>(pieces, HttpStatus.OK);
    }

    @PutMapping("/piece/activate/{id}")
    public ResponseEntity<?> ActivatePiece(@PathVariable("id") Long id){
        return new ResponseEntity<>(piecesService.enablePiece(id),HttpStatus.OK);
    }

    @PutMapping("/piece/desactivate/{id}")
    public ResponseEntity<?> DesactivatePiece(@PathVariable("id") Long id){
        return new ResponseEntity<>(piecesService.disablePiece(id),HttpStatus.OK);
    }



    @GetMapping("/chercher/{id}")
    public ResponseEntity<Pieces>chercherPiecesParId(@PathVariable("id")long id){
        Pieces pieces=piecesService.chercherPiecesParId(id);
        return new ResponseEntity<>(pieces,HttpStatus.OK);

    }



    @PutMapping("/modifier")
    public ResponseEntity<Pieces> modifierPieces(@RequestBody Pieces pieces){
        Pieces pieces1=piecesService.modifierPiece(pieces);
        return new ResponseEntity<>(pieces1,HttpStatus.OK);

    }

    @PostMapping("/ajouter")
    public ResponseEntity<Pieces> ajouterPieces(@RequestBody Pieces pieces){
        Pieces pieces1=piecesService.ajouterPiece(pieces);
        return new ResponseEntity<>(pieces1,HttpStatus.OK);

    }



}


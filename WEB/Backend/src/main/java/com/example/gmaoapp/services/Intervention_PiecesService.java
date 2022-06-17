package com.example.gmaoapp.services;

import com.example.gmaoapp.models.Pieces;
import com.example.gmaoapp.models.intervention.Intervention_Pieces;
import com.example.gmaoapp.repository.intervention.Intervention_PiecesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class Intervention_PiecesService {

    @Autowired
    Intervention_PiecesRepository intervention_piecesRepository;

    @Autowired
    PiecesService piecesService;

    public List<Intervention_Pieces> chargerTous() {
        return intervention_piecesRepository.findAll();
    }



    public Intervention_Pieces ajouterIntervention_pieces(Intervention_Pieces intervention_pieces){

        Pieces pieces=piecesService.chercherPiecesParId(intervention_pieces.getPieces().getId());
        pieces.setQuantiteStock(pieces.getQuantiteStock()-intervention_pieces.getQuantiteconsomme());
        piecesService.modifierPiece(pieces);
        return intervention_piecesRepository.save(intervention_pieces);
    }

    public Intervention_Pieces modifierIntervention_pieces(Intervention_Pieces intervention_pieces){

        return intervention_piecesRepository.save(intervention_pieces);
    }

    public Intervention_Pieces chercherIntervention_pieces(long id){
        return intervention_piecesRepository.findById(id).get();
    }
}


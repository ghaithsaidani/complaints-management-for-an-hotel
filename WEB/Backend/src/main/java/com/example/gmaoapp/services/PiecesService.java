package com.example.gmaoapp.services;

import com.example.gmaoapp.models.Pieces;
import com.example.gmaoapp.models.ot.OT;
import com.example.gmaoapp.repository.PiecesRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@Transactional
public class PiecesService {
public final PiecesRepository piecesRepository;


    public PiecesService(PiecesRepository piecesRepository) {

        this.piecesRepository = piecesRepository;
    }

    public List<Pieces> chargerTous() {
        return piecesRepository.findAll();
    }

    public List<Pieces> chargerActive() {
        return piecesRepository.loadValidPieces();
    }

    public List<Pieces> chargerParStock() {
        return piecesRepository.getEnReserve();
    }

    public Pieces ajouterPiece(Pieces pieces){

        return piecesRepository.save(pieces);
    }

    public Pieces modifierPiece(Pieces pieces){
        pieces.setUpdatedAt(new Date());
        return piecesRepository.save(pieces);
    }



    public Pieces chercherPiecesParId(long id){
        return piecesRepository.findPiecesById(id);
    }


    public int enablePiece(Long id) {
        return piecesRepository.enablePiece(id);
    }

    public int disablePiece(Long id) {
        return piecesRepository.disablePiece(id);
    }


}

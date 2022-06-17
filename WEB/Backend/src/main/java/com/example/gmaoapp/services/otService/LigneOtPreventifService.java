package com.example.gmaoapp.services.otService;

import com.example.gmaoapp.models.ot.LigneOtPreventif;
import com.example.gmaoapp.repository.otRepository.LigneOtPreventifRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class LigneOtPreventifService {
    @Autowired
    private LigneOtPreventifRepository ligneOtPreventifRepository;

    public LigneOtPreventif ajouterLigneOt(LigneOtPreventif ot){

        return ligneOtPreventifRepository.save(ot);
    }

    public LigneOtPreventif modifierLigneOt(LigneOtPreventif ot){

        return ligneOtPreventifRepository.save(ot);
    }

    public LigneOtPreventif chercherLigneOtParId(long id){
        return ligneOtPreventifRepository.findById(id).get();
    }
}

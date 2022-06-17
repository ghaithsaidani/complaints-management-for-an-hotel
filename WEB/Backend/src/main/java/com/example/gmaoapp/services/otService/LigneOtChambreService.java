package com.example.gmaoapp.services.otService;

import com.example.gmaoapp.models.ot.LigneOtChambre;
import com.example.gmaoapp.repository.otRepository.LigneOtChambreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class LigneOtChambreService {

    @Autowired
    private LigneOtChambreRepository ligneOtChambreRepository;

    public LigneOtChambre ajouterLigneOt(LigneOtChambre ot){

        return ligneOtChambreRepository.save(ot);
    }

    public LigneOtChambre modifierLigneOt(LigneOtChambre ot){

        return ligneOtChambreRepository.save(ot);
    }

    public LigneOtChambre chercherLigneOtParId(long id){
        return ligneOtChambreRepository.findLigneOtChambreById(id);
    }

}

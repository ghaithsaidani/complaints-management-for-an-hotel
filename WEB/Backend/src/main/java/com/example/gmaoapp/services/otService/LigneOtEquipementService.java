package com.example.gmaoapp.services.otService;

import com.example.gmaoapp.models.ot.LigneOtEquipement;
import com.example.gmaoapp.repository.LigneOtEquipementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class LigneOtEquipementService {

    @Autowired
    private LigneOtEquipementRepository ligneOtEquipementRepository;

    public LigneOtEquipement ajouterLigneOt(LigneOtEquipement ot){

        return ligneOtEquipementRepository.save(ot);
    }

    public LigneOtEquipement modifierLigneOt(LigneOtEquipement ot){

        return ligneOtEquipementRepository.save(ot);
    }

    public LigneOtEquipement chercherLigneOtParId(long id){
        return ligneOtEquipementRepository.findById(id).get();
    }



}

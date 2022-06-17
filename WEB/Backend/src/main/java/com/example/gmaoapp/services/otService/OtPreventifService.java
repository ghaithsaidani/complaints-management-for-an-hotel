package com.example.gmaoapp.services.otService;

import com.example.gmaoapp.models.forms.OtFormModifier;
import com.example.gmaoapp.models.ot.OTPreventif;
import com.example.gmaoapp.repository.IntervenantRepository;
import com.example.gmaoapp.repository.PreventifSystemeRepository;
import com.example.gmaoapp.repository.otRepository.OTPreventifRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@Slf4j
public class OtPreventifService {


    @Autowired
    IntervenantRepository intervenantRepository;
    @Autowired
    OTPreventifRepository otPreventifRepository;
    @Autowired
    PreventifSystemeRepository preventifSystemeRepository;

    @Autowired
    LigneOtPreventifService ligneOtPreventifService;









    public List<OTPreventif> chargerTous() {
        return otPreventifRepository.findAll();
    }







    /*public OTPreventif ajouterOt(OtForm otForm){



        List<LigneOtPreventif> ligneOtPreventifList= new ArrayList<>();
        List<Intervenant> intervenantsAffectes= new ArrayList<>();



        for (int i = 0; i<otForm.getReclamationList().size(); i++){
            LigneOtPreventif ligneOtPreventif=new LigneOtPreventif(preventifSystemeRepository.findById((otForm.getReclamationList().get(i).getReclamtionId())).get(),
                    otForm.getReclamationList().get(i).getTempsEstimeEnMinute());
            ligneOtPreventifList.add(ligneOtPreventifService.ajouterLigneOt(ligneOtPreventif));

        }

        for (int i = 0; i<otForm.getListeIntervenantId().size(); i++){
            Intervenant intervenant=intervenantRepository.findById(otForm.getListeIntervenantId().get(i)).get();
            intervenantsAffectes.add(intervenant);
        }

        OTPreventif otPreventif=new OTPreventif(otForm.getDescriptionOt(),intervenantsAffectes,ligneOtPreventifList);


        return otPreventifRepository.save(otPreventif);

    }*/







    public OTPreventif modifierOt(OtFormModifier otForm){


        return null;


    }






    public OTPreventif chercherOtParId(long id){
        return otPreventifRepository.findById(id).get();
    }





}
package com.example.gmaoapp.services;

import com.example.gmaoapp.models.Intervenant;
import com.example.gmaoapp.models.ot.OT;
import com.example.gmaoapp.repository.IntervenantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@Transactional
public class IntervenantService {
    @Autowired
   private IntervenantRepository intervenantRepository;



    public List<Intervenant> chargerTous() {
        return intervenantRepository.getAllOrderedByDisponibilte();
    }

    /*public List<Intervenant> chargerActive() {
        return intervenantRepository.loadValidIntervenant();
    }*/

    public Intervenant ajouterIntervenant(Intervenant intervenant){

        return intervenantRepository.save(intervenant);
    }

    public Intervenant modifierIntervenant(Intervenant intervenant){

        intervenant.setUpdatedAt(new Date());
        return intervenantRepository.save(intervenant);
    }

    public Intervenant chercherIntervenantParId(long id){
        return intervenantRepository.findIntervenantById(id);
    }
   /* public List<Intervenant> chercherIntervenant(String keyword ) {
        return intervenantRepository.chercherIntervenant(keyword);
    }*/


    public int enableIntervenant(Long id) {
        return intervenantRepository.enableIntervenant(id);
    }

    public int disableIntervenant(Long id) {
        return intervenantRepository.disableIntervenant(id);
    }

    public List<Object> getIntervenantsparot(){
        return intervenantRepository.getNb_Ot_par_Intevenant();
    }

    public List<Intervenant> getActive(){
        return intervenantRepository.getActive();
    }

}


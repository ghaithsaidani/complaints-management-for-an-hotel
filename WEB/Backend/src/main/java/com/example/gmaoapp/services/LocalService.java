package com.example.gmaoapp.services;

import com.example.gmaoapp.models.Equipement;
import com.example.gmaoapp.models.Local;
import com.example.gmaoapp.models.ot.OT;
import com.example.gmaoapp.repository.EquipementRepository;
import com.example.gmaoapp.repository.LocalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class LocalService {

    @Autowired
    private LocalRepository localrepo;


    @Autowired
    private EquipementRepository equipementRepository;




    public List<Local> getLocals(){
        return localrepo.getAllOrderedByDate();
    }

    public Local saveLocal(Local local){
        return localrepo.save(local);
    }
    public Local findByID(Long id){
        return localrepo.findById(id).get();
    }





    public void addEquipementtoLocal(Long localId,Long equipementId){

        Local local=localrepo.findById(localId).get();
        Equipement equipement=equipementRepository.findById(equipementId).get();

        local.getEquipements().add(equipement);
        equipement.setLocal(local);
        equipementRepository.save(equipement);
        localrepo.save(local);
    }

    public Local updateLocal(Local local){
        local.setUpdatedAt(new Date());
        return localrepo.save(local);
    }

    public int enableLocal(Long id) {
        /*Local local=localrepo.getOne(id);
        for(int i=0;i<local.getEquipements().size();i++){
            local.getEquipements().get(i).setEtat(true);
        }*/
        return localrepo.enableLocal(id);
    }

    public int disableLocal(Long id) {
        Local local=localrepo.getOne(id);
        for(int i=0;i<local.getEquipements().size();i++){
            equipementRepository.disableEquipement(local.getEquipements().get(i).getId());
        }
        return localrepo.disableLocal(id);
    }


    public List<Local> getActive(){
        return localrepo.getActive();
    }
}

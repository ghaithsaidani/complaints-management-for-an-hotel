package com.example.gmaoapp.services;
import com.example.gmaoapp.models.Equipement;
import com.example.gmaoapp.models.Local;
import com.example.gmaoapp.models.PreventifSysteme;
import com.example.gmaoapp.models.ot.OT;
import com.example.gmaoapp.repository.EquipementRepository;
import com.example.gmaoapp.repository.LocalRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Slf4j
public class EquipementService {


    @Autowired
    private EquipementRepository equipementrepo;

    @Autowired
    private LocalRepository localRepository;

    @Autowired
    private PreventifSystemeService preventifSystemeService;





    public Equipement findByID(Long id){
        return equipementrepo.findById(id).get();
    }



    public Equipement saveEquipement(Equipement equipement){
        //System.out.println("resft");
        Equipement e= equipementrepo.save(equipement);
        //System.out.println("resft");
        PreventifSysteme preventifSysteme =
                new PreventifSysteme(LocalDate.now().plusDays((equipement.getPeriodicite_maintenance())),e);
        preventifSystemeService.ajouterPreventif(preventifSysteme);
       //System.out.println("resft");
        return e;

    }

    public List<Equipement> getEquipements(){
        return equipementrepo.getAllOrderedByEtat();
    }
    public List<Equipement> getEquipementswithoutLocal(){
        List<Equipement> withoutlocalsList=new ArrayList<>();
        for(int i=0;i<equipementrepo.findAll().size();i++){
            if(equipementrepo.findAll().get(i).getLocal()==null){
                withoutlocalsList.add(equipementrepo.findAll().get(i));
            }
        }
        return withoutlocalsList;
    }

    public void addEquipementtoLocal(Long localId,Long equipementId){

        Local local=localRepository.findById(localId).get();
        Equipement equipement=equipementrepo.findById(equipementId).get();
        local.getEquipements().add(equipement);
        equipement.setLocal(local);
        equipementrepo.save(equipement);
        localRepository.save(local);
    }

    public Equipement updateEquipement(Equipement equipement){
        //equipement.setLocal(null);
        Local local=localRepository.findById(equipement.getLocal().getId()).get();
        Equipement equipement1=equipementrepo.findById(equipement.getId()).get();
        List<Local> list=localRepository.findAll();
        log.info("list {}",list.size());
        int i;
        for (i=0;i<list.size();i++){
                if(list.get(i).getEquipements().contains(equipement1)){

                    log.info("true");
                    //log.info("list {}",list);
                    /*list.get(i).setEquipements(null);
                    localRepository.saveAll(list);*/
                    //addEquipementtoLocal(local.getId(),equipement.getId());
                    break;
                }
        }
        if(i< list.size()){
            list.get(i).getEquipements().remove(equipement1);
            localRepository.saveAll(list);
            addEquipementtoLocal(local.getId(),equipement1.getId());
        }
        else {
            addEquipementtoLocal(local.getId(),equipement1.getId());
        }
        equipement.setUpdatedAt(new Date());
        return equipementrepo.save(equipement);
    }

    public int enableEquipement(Long id) {
        return equipementrepo.enableEquipement(id);
    }

    public int disableEquipement(Long id) {
        return equipementrepo.disableEquipement(id);
    }


    public List<Object> getDisponibilte_equipement(){
        return equipementrepo.disponibilite_equipements();
    }


    public Object get_avg_disponibilite(){
        return equipementrepo.average_disponibilite();
    }

    public List<Equipement> getActive(){
        return equipementrepo.getActive();
    }
}

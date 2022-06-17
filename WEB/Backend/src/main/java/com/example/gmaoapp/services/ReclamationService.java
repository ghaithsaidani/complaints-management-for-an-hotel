package com.example.gmaoapp.services;


import com.example.gmaoapp.models.*;
import com.example.gmaoapp.models.ot.OT;
import com.example.gmaoapp.models.reclamations.Reclamation;
import com.example.gmaoapp.models.reclamations.ReclamationSurEquipement;
import com.example.gmaoapp.models.reclamations.ReclamationSurTypePanne;
import com.example.gmaoapp.repository.*;
import com.example.gmaoapp.repository.reclamationsRepositories.ReclamationRepository;
import com.example.gmaoapp.repository.reclamationsRepositories.ReclamationSurEquipementRepository;
import com.example.gmaoapp.repository.reclamationsRepositories.ReclamationSurTypePanneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ReclamationService {

    @Autowired
    private ReclamationRepository reclamationrepo;

    @Autowired
    private ReclamationSurTypePanneRepository reclamationSurTypePanneRepository;

    @Autowired
    private ReclamationSurEquipementRepository reclamationSurEquipementRepository;

    @Autowired
    private EquipementRepository equipementRepository;

    @Autowired
    private TypePanneRepository typePanneRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private LocalRepository localRepository;

    public Reclamation findByID(Long id){
        return reclamationrepo.findById(id).get();
    }

    public Reclamation saveReclamation(Reclamation reclamation){
        switch(reclamation.getType()){
            case "chambre" :{
                ReclamationSurTypePanne reclamationSurTypePanne=new ReclamationSurTypePanne(reclamation.getId(),reclamation.getType(),reclamation.getPriorite(),reclamation.getDescription(),reclamation.getEtat(),reclamation.getAvancement(),reclamation.getNom_reclameur(),reclamation.getCreatedAt(),reclamation.getUpdatedAt());
                return reclamationrepo.save(reclamationSurTypePanne);
            }
            case "local" :{
                ReclamationSurEquipement reclamationSurEquipement=new ReclamationSurEquipement(reclamation.getId(),reclamation.getType(),reclamation.getPriorite(),reclamation.getDescription(),reclamation.getEtat(),reclamation.getAvancement(),reclamation.getNom_reclameur(),reclamation.getCreatedAt(),reclamation.getUpdatedAt());


                return reclamationrepo.save(reclamationSurEquipement);
            }
            default:
                return null;

        }

    }

    public List<Reclamation> getReclamationsNonTraite(){
        return reclamationrepo.getNonTraite();
    }

    public List<Reclamation> getReclamations(){
        return reclamationrepo.getAllOrderedByAvancement();
    }

    public long getCount(){
        return reclamationrepo.count();
    }


    public int enableReclamation(Long id) {
        Reclamation reclamation=reclamationrepo.findById(id).get();
        //List<Reclamation> reclamations=reclamationrepo.findAll();
        if(reclamation instanceof ReclamationSurEquipement){
            ((ReclamationSurEquipement) reclamation).getEquipement().setEtat_equipement(-1);
        }

        return reclamationrepo.enableReclamation(id);
    }

    public int disableReclamation(Long id) {
        Reclamation reclamation=reclamationrepo.findById(id).get();
        if(reclamation instanceof ReclamationSurEquipement){
            ((ReclamationSurEquipement) reclamation).getEquipement().setEtat_equipement(1);
        }
        return reclamationrepo.disableReclamation(id);
    }



    public void addtypePannetoReclamation(Long reclamationId,Long PanneId,Long RoomId){
        TypePanne typePanne=typePanneRepository.findById(PanneId).get();
        Room chambre = roomRepository.findById(RoomId).get();
        ReclamationSurTypePanne reclamationSurTypePanne= reclamationSurTypePanneRepository.findById(reclamationId).get();
        reclamationSurTypePanne.setTypePanne(typePanne);
        reclamationSurTypePanne.setChambre(chambre);
        reclamationrepo.save(reclamationSurTypePanne);
    }


    public void addEquipementtoReclamation(Long reclamationId,Long EquipementId){
        Equipement equipement=equipementRepository.findById(EquipementId).get();
        equipement.setEtat_equipement(-1);
        ReclamationSurEquipement reclamationSurEquipement= reclamationSurEquipementRepository.findById(reclamationId).get();
        reclamationSurEquipement.setEquipement(equipement);
        reclamationSurEquipement.getEquipement().setLocal(equipement.getLocal());
        reclamationrepo.save(reclamationSurEquipement);
    }


    public Reclamation updateReclamation(Reclamation reclamation){
        switch(reclamation.getType()){
            case "chambre" :{
                ReclamationSurTypePanne reclamationSurTypePanne=new ReclamationSurTypePanne(reclamation.getId(),reclamation.getType(),reclamation.getPriorite(),reclamation.getDescription(),reclamation.getEtat(),reclamation.getAvancement(),reclamation.getNom_reclameur(),reclamation.getCreatedAt(),new Date());
                return reclamationrepo.save(reclamationSurTypePanne);
            }
            case "local" :{
                ReclamationSurEquipement reclamationSurEquipement=new ReclamationSurEquipement(reclamation.getId(),reclamation.getType(),reclamation.getPriorite(),reclamation.getDescription(),reclamation.getEtat(),reclamation.getAvancement(),reclamation.getNom_reclameur(),reclamation.getCreatedAt(),new Date());
                return reclamationrepo.save(reclamationSurEquipement);
            }
            default:
                return null;

        }

    }




    public List<Object> getreclamationsCount_switch_equipement(){
        return reclamationrepo.countreclamations_switch_equipement();
    }


    public List<Object> getReclamationsCountBetweenGroupedByDay(Date firstDate, Date secondDate){
        return reclamationrepo.ReclamationBetweenTwoDatesGroupedByDay(firstDate,secondDate);
    }

    public List<Object> getReclamationsCountBetweenGroupedByMonth(Date firstDate, Date secondDate){
        return reclamationrepo.ReclamationBetweenTwoDatesGroupedByMonth(firstDate,secondDate);
    }

    public List<Object> getReclamationsCountBetweenGroupedByYear(Date firstDate, Date secondDate){
        return reclamationrepo.ReclamationBetweenTwoDatesGroupedByYear(firstDate,secondDate);
    }

    public long ReclamationNonTraiteCount() {
        return reclamationrepo.getCountNonTraite();
    }

    public List<Reclamation> getActive(){
        return reclamationrepo.getActive();
    }
}

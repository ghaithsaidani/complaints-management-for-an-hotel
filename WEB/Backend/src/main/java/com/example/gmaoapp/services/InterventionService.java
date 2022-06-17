package com.example.gmaoapp.services;


import com.example.gmaoapp.models.PreventifSysteme;
import com.example.gmaoapp.models.forms.InterventionForm;
import com.example.gmaoapp.models.intervention.*;
import com.example.gmaoapp.models.ot.*;
import com.example.gmaoapp.models.reclamations.Reclamation;
import com.example.gmaoapp.models.reclamations.ReclamationSurEquipement;
import com.example.gmaoapp.repository.intervention.InterventionRepository;
import com.example.gmaoapp.repository.intervention.LigneInterventionRepository;
import com.example.gmaoapp.services.otService.OTService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Transactional
@Slf4j
public class InterventionService {
    @Autowired
    InterventionRepository interventionRepository;

    @Autowired
    PiecesService piecesService;

    @Autowired
    Intervention_PiecesService intervention_piecesService;

    @Autowired
    OTService otService;

    @Autowired
    ReclamationService reclamationService;

    @Autowired
    LigneInterventionRepository ligneInterventionRepository;


    @Autowired
    PreventifSystemeService preventifSystemeService;


    public List<Intervention> chargerTous() {
        return interventionRepository.getAllOrderedByDate();
    }







    public Intervention ajouterIntervention(InterventionForm interventionForm){
        OT ot=otService.chercherOtParId(interventionForm.getOtId());
        ot.setCloturage(1);
        ot.setDateTermination(new Date());
        for(int i=0;i<ot.getIntervenantsAffectes().size();i++){
            ot.getIntervenantsAffectes().get(i).setDisponibilite(1);
        }

        List<LigneIntervention> ligneInterventionList= new ArrayList<>();





        for (int i=0;i<interventionForm.getLigneInterventionFormsList().size();i++){

            List<Intervention_Pieces> intervention_piecesList= new ArrayList<>();
            for(int j=0;j<interventionForm.getLigneInterventionFormsList().get(i).getPiece().size();j++){
                    Intervention_Pieces intervention_pieces =
                            new Intervention_Pieces(
                                    piecesService.chercherPiecesParId(interventionForm.getLigneInterventionFormsList().get(i).getPiece().get(j).getIdPiece())
                                    ,  interventionForm.getLigneInterventionFormsList().get(i).getPiece().get(j).getQuantite());

                    intervention_piecesList.add(intervention_piecesService.ajouterIntervention_pieces(intervention_pieces));


            }


            if (otService.chercherOtParId(interventionForm.getOtId()) instanceof OTReclamtionEquipement || otService.chercherOtParId(interventionForm.getOtId()) instanceof OTReclamationChambre)
            {
                Reclamation reclamation=reclamationService.findByID(interventionForm.getLigneInterventionFormsList().get(i).getIdReclamtionOuPrevnetif());
                reclamation.setAvancement(interventionForm.getLigneInterventionFormsList().get(i).getEtat());
                reclamation.setUpdatedAt(new Date());
                if(reclamation instanceof ReclamationSurEquipement && reclamation.getAvancement()==0){
                    ((ReclamationSurEquipement) reclamation).getEquipement().setEtat_equipement(-1);
                }
                else if(reclamation instanceof ReclamationSurEquipement && reclamation.getAvancement()==2){
                    ((ReclamationSurEquipement) reclamation).getEquipement().setEtat_equipement(1);
                }

                    LigneIntervention ligneIntervention=
                            new LigneInterventionReclamation(intervention_piecesList,reclamationService.findByID(interventionForm.getLigneInterventionFormsList().get(i).getIdReclamtionOuPrevnetif()));
                    ligneInterventionList.add(ligneInterventionRepository.save(ligneIntervention));
            }

            else if (otService.chercherOtParId(interventionForm.getOtId()) instanceof OTPreventif)
            {
                PreventifSysteme preventifSysteme=preventifSystemeService.findById(interventionForm.getLigneInterventionFormsList().get(i).getIdReclamtionOuPrevnetif());
                preventifSysteme.setAvancement(interventionForm.getLigneInterventionFormsList().get(i).getEtat());
                /*reclamation.setUpdatedAt(new Date());*/
                /*if(preventifSysteme.getAvancement()==0){
                    ((Pre) reclamation).getEquipement().setEtat_equipement(-1);
                }
                else if(reclamation instanceof ReclamationSurEquipement && reclamation.getAvancement()==2){
                    ((ReclamationSurEquipement) reclamation).getEquipement().setEtat_equipement(1);
                }*/

                LigneIntervention ligneIntervention=
                        new LigneInterventionReclamation(intervention_piecesList,reclamationService.findByID(interventionForm.getLigneInterventionFormsList().get(i).getIdReclamtionOuPrevnetif()));
                ligneInterventionList.add(ligneInterventionRepository.save(ligneIntervention));




            }


        }
        int i;
        for(i=0;i<interventionForm.getLigneInterventionFormsList().size();i++){
            if(interventionForm.getLigneInterventionFormsList().get(i).getEtat()==0){
                break;
            }
        }
        Intervention intervention=new Intervention(
                interventionForm.getDescriptionIntervention()
                ,otService.chercherOtParId(interventionForm.getOtId())
                ,ligneInterventionList);
        if(i<interventionForm.getLigneInterventionFormsList().size()){
            intervention.setCloturage(0);
        }
        else {
            intervention.setCloturage(1);
        }

        return interventionRepository.save(intervention);
    }

    public Intervention chercherOtParId(long id){
        return interventionRepository.findById(id).get();
    }


    public int disableIntervention(Long id){
        Intervention intervention=interventionRepository.findById(id).get();
        intervention.getOt().setCloturage(0);
        for(int i=0;i<intervention.getLigneInterventionsList().size();i++){
            if(intervention.getLigneInterventionsList().get(i) instanceof LigneInterventionReclamation){
                ((LigneInterventionReclamation) intervention.getLigneInterventionsList().get(i)).getReclamation().setAvancement(1);
            };

        }
        for(int i=0;i<intervention.getOt().getIntervenantsAffectes().size();i++){

            intervention.getOt().getIntervenantsAffectes().get(i).setDisponibilite(0);

        }
        /*if(intervention. instanceof ){
            ((OTReclamtionEquipement) intervention).getReclamationsEquipement().forEach(ligneOtEquipement -> {
                //ligneOtEquipement.getReclamation().setEtat(true);
                ligneOtEquipement.getReclamation().setAvancement(1);
            });
        }

        else if(intervention instanceof OTReclamationChambre){
            ((OTReclamationChambre) intervention).getReclamationsPannes().forEach(ligneOtEquipement -> {
                //ligneOtEquipement.getReclamation().setEtat(true);
                ligneOtEquipement.getReclamation().setAvancement(1);
            });
        }*/
        return interventionRepository.disableIntervention(id);
    }

    public int enableIntervention(Long id){
        Intervention intervention=interventionRepository.findById(id).get();
        intervention.getOt().setCloturage(1);
        for(int i=0;i<intervention.getLigneInterventionsList().size();i++){
            if(intervention.getLigneInterventionsList().get(i) instanceof LigneInterventionReclamation){
                ((LigneInterventionReclamation) intervention.getLigneInterventionsList().get(i)).getReclamation().setAvancement(2);
            };

        }
        /*if(intervention. instanceof ){
            ((OTReclamtionEquipement) intervention).getReclamationsEquipement().forEach(ligneOtEquipement -> {
                //ligneOtEquipement.getReclamation().setEtat(true);
                ligneOtEquipement.getReclamation().setAvancement(1);
            });
        }

        else if(intervention instanceof OTReclamationChambre){
            ((OTReclamationChambre) intervention).getReclamationsPannes().forEach(ligneOtEquipement -> {
                //ligneOtEquipement.getReclamation().setEtat(true);
                ligneOtEquipement.getReclamation().setAvancement(1);
            });
        }*/
        return interventionRepository.enableIntervention(id);
    }

    public List<Intervention> getActive(){
        return interventionRepository.getActive();
    }



}

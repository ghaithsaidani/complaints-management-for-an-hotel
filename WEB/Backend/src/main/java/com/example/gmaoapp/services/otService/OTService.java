package com.example.gmaoapp.services.otService;

import com.example.gmaoapp.models.*;
import com.example.gmaoapp.models.forms.OtForm;
import com.example.gmaoapp.models.ot.*;
import com.example.gmaoapp.repository.*;
import com.example.gmaoapp.repository.otRepository.OTReclamationChambreRepository;
import com.example.gmaoapp.repository.otRepository.OTReclamtionEquipementRepository;
import com.example.gmaoapp.repository.otRepository.OTRepository;
import com.example.gmaoapp.repository.reclamationsRepositories.ReclamationSurEquipementRepository;
import com.example.gmaoapp.repository.reclamationsRepositories.ReclamationSurTypePanneRepository;
import com.example.gmaoapp.services.ReclamationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.w3c.tidy.Tidy;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class OTService {

    @Autowired
    OTReclamationChambreRepository otReclamationChambreRepository;

    @Autowired
    ReclamationService reclamationService;

    @Autowired
    ReclamationSurTypePanneRepository reclamationSurTypePanneRepository;


    @Autowired
    LigneOtChambreService ligneOtChambreService;

    @Autowired
    OTReclamtionEquipementRepository otReclamtionEquipementRepository;

    @Autowired
    ReclamationSurEquipementRepository reclamationSurEquipementRepository;

    @Autowired
    PreventifSystemeRepository preventifSystemeRepository;

    @Autowired
    LigneOtEquipementService ligneOtEquipementService;

    @Autowired
    LigneOtPreventifService ligneOtPreventifService;

    @Autowired
    IntervenantRepository intervenantRepository;


    @Autowired
    OTRepository otRepository;

    public List<OT> chargerTous() {
        return otRepository.getAllOrderedByCloture();
    }

    public List<OT> chargerEnCours() {
        return otRepository.getAllOtEnCours();
    }


    public OT ajouterOt(OtForm otForm){
        switch(otForm.getType()){
            case "chambres" :{
                List<LigneOtChambre> reclamtionListe= new ArrayList<>();
                List<Intervenant> intervenantsAffectes= new ArrayList<>();
                for (int i = 0; i<otForm.getReclamationList().size(); i++){
                    LigneOtChambre ligneOtChambre=new LigneOtChambre(reclamationSurTypePanneRepository.findById((otForm.getReclamationList().get(i).getReclamtionId())).get(), otForm.getReclamationList().get(i).getTempsEstimeEnMinute());
                    ligneOtChambre.getReclamation().setAvancement(1);
                    ligneOtChambre.getReclamation().setUpdatedAt(new Date());
                    reclamtionListe.add(ligneOtChambre);
                    ligneOtChambreService.ajouterLigneOt(ligneOtChambre);
                }

                for (int i = 0; i<otForm.getListeIntervenantId().size(); i++){
                    Intervenant intervenant=intervenantRepository.findById(otForm.getListeIntervenantId().get(i)).get();
                    intervenant.setDisponibilite(0);
                    intervenantsAffectes.add(intervenant);
                }
                OTReclamationChambre otReclamationChambre=new OTReclamationChambre(null,otForm.getType(),new Date(),new Date(),true,0,otForm.getDescriptionOt(),intervenantsAffectes,reclamtionListe);
                for (int i = 0; i<otForm.getListeIntervenantId().size(); i++){
                    Intervenant intervenant=intervenantRepository.findById(otForm.getListeIntervenantId().get(i)).get();
                    intervenant.getOtAffecte().add(otReclamationChambre);
                    //intervenantRepository.save(intervenant);
                }
                return otRepository.save(otReclamationChambre);
            }
            case "locaux" :{
                List<LigneOtEquipement> reclamtionListe= new ArrayList<>();
                List<Intervenant> intervenantsAffectes= new ArrayList<>();
                for (int i = 0; i<otForm.getReclamationList().size(); i++){
                    LigneOtEquipement ligneOtEquipement=new LigneOtEquipement(reclamationSurEquipementRepository.findById((otForm.getReclamationList().get(i).getReclamtionId())).get(), otForm.getReclamationList().get(i).getTempsEstimeEnMinute());
                    ligneOtEquipement.getReclamation().setAvancement(1);
                    ligneOtEquipement.getReclamation().setUpdatedAt(new Date());
                    ligneOtEquipement.getReclamation().getEquipement().setEtat_equipement(0);
                    reclamtionListe.add(ligneOtEquipement);
                    ligneOtEquipementService.ajouterLigneOt(ligneOtEquipement);
                }

                for (int i = 0; i<otForm.getListeIntervenantId().size(); i++){
                    Intervenant intervenant=intervenantRepository.findById(otForm.getListeIntervenantId().get(i)).get();
                    intervenant.setDisponibilite(0);
                    intervenantsAffectes.add(intervenant);
                }
                OTReclamtionEquipement otReclamtionEquipement=new OTReclamtionEquipement(null,otForm.getType(),new Date(),new Date(),true,0,otForm.getDescriptionOt(),intervenantsAffectes,reclamtionListe);
                for (int i = 0; i<otForm.getListeIntervenantId().size(); i++){
                    Intervenant intervenant=intervenantRepository.findById(otForm.getListeIntervenantId().get(i)).get();
                    intervenant.getOtAffecte().add(otReclamtionEquipement);
                    //intervenantRepository.save(intervenant);
                }
                return otRepository.save(otReclamtionEquipement);
            }
            case "preventif" :{
                List<LigneOtPreventif> preventifList= new ArrayList<>();
                List<Intervenant> intervenantsAffectes= new ArrayList<>();
                for (int i = 0; i<otForm.getReclamationList().size(); i++){
                    LigneOtPreventif ligneOtPreventif=new LigneOtPreventif(preventifSystemeRepository.findById((otForm.getReclamationList().get(i).getReclamtionId())).get(), otForm.getReclamationList().get(i).getTempsEstimeEnMinute());
                    ligneOtPreventif.getPreventif().setAvancement(1);
                    /*ligneOtPreventif.getPreventif().set;*/

                    preventifList.add(ligneOtPreventif);
                    ligneOtPreventifService.ajouterLigneOt(ligneOtPreventif);
                }

                for (int i = 0; i<otForm.getListeIntervenantId().size(); i++){
                    Intervenant intervenant=intervenantRepository.findById(otForm.getListeIntervenantId().get(i)).get();
                    intervenant.setDisponibilite(0);
                    intervenantsAffectes.add(intervenant);
                }
                OTPreventif otPreventif=new OTPreventif(null,otForm.getType(),new Date(),new Date(),true,0,otForm.getDescriptionOt(),intervenantsAffectes,preventifList);
                for (int i = 0; i<otForm.getListeIntervenantId().size(); i++){
                    Intervenant intervenant=intervenantRepository.findById(otForm.getListeIntervenantId().get(i)).get();
                    intervenant.getOtAffecte().add(otPreventif);
                    //intervenantRepository.save(intervenant);
                }
                return otRepository.save(otPreventif);
            }
            default:
                return null;

        }
    }


    public OT chercherOtParId(long id){
        return otRepository.findById(id).get();
    }



    public int enableOt(Long id){
        OT ot=otRepository.findById(id).get();
        for(int i=0;i<ot.getIntervenantsAffectes().size();i++){
            ot.getIntervenantsAffectes().get(i).setDisponibilite(0);
        }
        if(ot instanceof OTReclamtionEquipement){
            ((OTReclamtionEquipement) ot).getReclamationsEquipement().forEach(ligneOtEquipement -> {

                ligneOtEquipement.getReclamation().setAvancement(1);
                ligneOtEquipement.getReclamation().getEquipement().setEtat_equipement(-1);
            });
        }

        else if(ot instanceof OTReclamationChambre){
            ((OTReclamationChambre) ot).getReclamationsPannes().forEach(ligneOtEquipement -> {
                ligneOtEquipement.getReclamation().setAvancement(1);
            });
        }
        return otRepository.enableOT(id);
    }

    public int disableOt(Long id){
        OT ot=otRepository.findById(id).get();
        for(int i=0;i<ot.getIntervenantsAffectes().size();i++){
            ot.getIntervenantsAffectes().get(i).setDisponibilite(1);
        }
        if(ot instanceof OTReclamtionEquipement){
            ((OTReclamtionEquipement) ot).getReclamationsEquipement().forEach(ligneOtEquipement -> {
                //ligneOtEquipement.getReclamation().setEtat(false);
                ligneOtEquipement.getReclamation().setAvancement(0);
                ligneOtEquipement.getReclamation().getEquipement().setEtat_equipement(-1);
            });
        }

        else if(ot instanceof OTReclamationChambre){
            ((OTReclamationChambre) ot).getReclamationsPannes().forEach(ligneOtEquipement -> {
                //ligneOtEquipement.getReclamation().setEtat(false);
                ligneOtEquipement.getReclamation().setAvancement(0);
            });
        }
        return otRepository.disableOT(id);
    }


    public String xhtmlConvert(String html) throws UnsupportedEncodingException {
        Tidy tidy = new Tidy();
        tidy.setInputEncoding("UTF-8");
        tidy.setOutputEncoding("UTF-8");
        tidy.setXHTML(true);
        ByteArrayInputStream inputStream = new ByteArrayInputStream(html.getBytes(StandardCharsets.UTF_8));
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        tidy.parseDOM(inputStream, outputStream);
        return outputStream.toString(StandardCharsets.UTF_8);
    }

    public long count_ots_en_cours(){
        return otRepository.count_ots_en_cours();
    }

    public List<OT> getActive(){
        return otRepository.getActive();
    }


}

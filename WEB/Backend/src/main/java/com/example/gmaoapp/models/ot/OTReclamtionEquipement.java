package com.example.gmaoapp.models.ot;

import com.example.gmaoapp.models.Intervenant;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@Table(name="ot_reclamation_equipement")
public class OTReclamtionEquipement extends OT{



    @OneToMany
    private List<LigneOtEquipement> reclamationsEquipement;


    public OTReclamtionEquipement(Long id, String type, Date dateLancement,Date dateTermination, Boolean etat,int cloturage , String description, List<Intervenant> intervenantsAffectes, List<LigneOtEquipement> reclamtions) {
        super(id,type,dateLancement,dateTermination,etat,cloturage,description, intervenantsAffectes);
        this.reclamationsEquipement = reclamtions;

    }




}

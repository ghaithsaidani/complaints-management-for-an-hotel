package com.example.gmaoapp.models.ot;


import com.example.gmaoapp.models.Intervenant;
import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@Table(name="ot_reclamation_chambre")
public class OTReclamationChambre extends OT {


    @OneToMany
    @JoinColumn(name = "reclmations_chambre_pannes_ot")
    private List<LigneOtChambre> reclamationsPannes;

    public OTReclamationChambre(Long id, String type , Date dateLancement,Date dateTermination, Boolean etat,int cloturage, String description, List<Intervenant> intervenantsAffectes, List<LigneOtChambre> reclamtions) {
        super(id,type,dateLancement,dateTermination,etat,cloturage,description, intervenantsAffectes);
        this.reclamationsPannes = reclamtions;

    }


}

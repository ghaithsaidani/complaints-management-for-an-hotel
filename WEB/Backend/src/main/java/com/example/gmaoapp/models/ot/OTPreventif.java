package com.example.gmaoapp.models.ot;

import com.example.gmaoapp.models.Intervenant;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class OTPreventif extends OT{
    @OneToMany
    private List<LigneOtPreventif> PreventifR;

    public OTPreventif(Long id, String type , Date dateLancement,Date dateTermination, Boolean etat,int cloturage, String description, List<Intervenant> intervenantsAffectes, List<LigneOtPreventif> reclamtions) {
        super(id,type,dateLancement,dateTermination,etat,cloturage,description, intervenantsAffectes);
        this.PreventifR = reclamtions;

    }


}

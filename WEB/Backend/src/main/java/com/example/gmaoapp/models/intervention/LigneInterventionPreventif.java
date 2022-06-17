package com.example.gmaoapp.models.intervention;

import com.example.gmaoapp.models.PreventifSysteme;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class LigneInterventionPreventif extends LigneIntervention {



    @ManyToOne
    private  PreventifSysteme preventifSysteme;

    public LigneInterventionPreventif(List<Intervention_Pieces> intervention_pieces, PreventifSysteme preventifSysteme) {
        super(intervention_pieces);
        this.preventifSysteme = preventifSysteme;
    }

    public LigneInterventionPreventif(PreventifSysteme preventifSysteme) {
        this.preventifSysteme = preventifSysteme;
    }

}

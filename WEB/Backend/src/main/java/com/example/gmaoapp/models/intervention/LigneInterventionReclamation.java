package com.example.gmaoapp.models.intervention;

import com.example.gmaoapp.models.reclamations.Reclamation;
import lombok.*;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import java.util.List;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class LigneInterventionReclamation extends LigneIntervention  {
    @ManyToOne
    private Reclamation reclamation;

    public LigneInterventionReclamation(Reclamation reclamation) {
        this.reclamation = reclamation;
    }

    public LigneInterventionReclamation(List<Intervention_Pieces> intervention_pieces, Reclamation reclamation) {
        super(intervention_pieces);
        this.reclamation = reclamation;
    }
}

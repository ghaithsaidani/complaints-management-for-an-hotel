package com.example.gmaoapp.models.intervention;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@AllArgsConstructor

@Inheritance(strategy = InheritanceType.JOINED)
public class LigneIntervention {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id ;

    @OneToMany
    private List<Intervention_Pieces> intervention_pieces;

    public LigneIntervention(List<Intervention_Pieces> intervention_pieces) {
        this.intervention_pieces = intervention_pieces;

    }

    public LigneIntervention() {

    }



}

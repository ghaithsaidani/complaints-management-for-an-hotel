package com.example.gmaoapp.models;

import com.example.gmaoapp.models.intervention.LigneInterventionPreventif;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class PreventifSysteme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate datePrevue;

    private int avancement=0;


    @ManyToOne(fetch = FetchType.EAGER)
    private Equipement equipement;

    @OneToMany
    private List<LigneInterventionPreventif> ligneInterventionPreventifList;

    public PreventifSysteme(LocalDate datePrevue, Equipement equipement) {
        this.datePrevue = datePrevue;
        this.equipement = equipement;
    }

}

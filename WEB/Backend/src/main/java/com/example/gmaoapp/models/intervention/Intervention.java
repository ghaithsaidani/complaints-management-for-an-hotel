package com.example.gmaoapp.models.intervention;

import com.example.gmaoapp.models.ot.OT;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name="intervention")
public class Intervention   {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreatedDate
    @Column(nullable = false,updatable = false)
    private Date dateCloture=new Date();


    @OneToOne
    private OT ot;

    private Boolean etat=true;

    private int cloturage;
    @OneToMany
    private List<LigneIntervention> ligneInterventionsList;
    private String description;

    public Intervention(String description, OT ot, List<LigneIntervention> ligneInterventionsList) {
        this.description = description;
        this.ot = ot;
        this.ligneInterventionsList = ligneInterventionsList;
    }



}

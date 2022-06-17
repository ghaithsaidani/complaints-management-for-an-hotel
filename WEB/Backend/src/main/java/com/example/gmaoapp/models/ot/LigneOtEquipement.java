package com.example.gmaoapp.models.ot;

import com.example.gmaoapp.models.reclamations.ReclamationSurEquipement;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.time.Duration;

@Getter
@Setter
@RequiredArgsConstructor
@Entity
@AllArgsConstructor
public class LigneOtEquipement{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne
    @JsonIgnoreProperties(value = {"local"})
    private ReclamationSurEquipement reclamation;

    private Duration tempsEstime;


    public LigneOtEquipement(ReclamationSurEquipement reclamation, int tempsEstime) {
        this.reclamation = reclamation;
        this.tempsEstime = Duration.ofMinutes(tempsEstime);
    }
}

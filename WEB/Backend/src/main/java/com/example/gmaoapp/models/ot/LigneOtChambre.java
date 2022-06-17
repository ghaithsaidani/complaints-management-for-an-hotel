package com.example.gmaoapp.models.ot;

import com.example.gmaoapp.models.reclamations.ReclamationSurTypePanne;
import lombok.*;

import javax.persistence.*;
import java.time.Duration;


@Getter
@Setter
@RequiredArgsConstructor
@Entity
@AllArgsConstructor
@Table(name="ligne_ot_chambre")
public class LigneOtChambre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @OneToOne
    private ReclamationSurTypePanne reclamation;

    private Duration tempsEstime;


    public LigneOtChambre(ReclamationSurTypePanne reclamation, int tempsEstime) {
        this.reclamation = reclamation;
        this.tempsEstime = Duration.ofMinutes(tempsEstime);
    }
}

package com.example.gmaoapp.models.ot;

import com.example.gmaoapp.models.PreventifSysteme;
import lombok.*;

import javax.persistence.*;
import java.time.Duration;

@Getter
@Setter
@RequiredArgsConstructor
@Entity
@AllArgsConstructor
public class LigneOtPreventif{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @OneToOne
    private PreventifSysteme preventif;

    private Duration tempsEstime;

    public LigneOtPreventif(PreventifSysteme preventif, int tempsEstime) {
        this.preventif = preventif;
        this.tempsEstime = Duration.ofMinutes(tempsEstime);
    }



}
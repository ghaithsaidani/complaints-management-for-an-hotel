package com.example.gmaoapp.models.reclamations;

import com.example.gmaoapp.models.Room;
import com.example.gmaoapp.models.TypePanne;
import com.example.gmaoapp.models.ot.LigneOtChambre;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;


@Entity
@Getter
@Setter
@RequiredArgsConstructor
@Table(name="reclamations_typepanne")
public class ReclamationSurTypePanne extends Reclamation{

    @ManyToOne(fetch = FetchType.EAGER)
    private TypePanne typePanne;

    @ManyToOne(fetch = FetchType.EAGER)
    private Room chambre;

    @OneToMany()
    private List<LigneOtChambre> ligneOt;

    public ReclamationSurTypePanne(Long id, String type, int priorite, String description, Boolean etat, int avancement, String nom_reclameur, Date createdAt, Date updatedAt) {
        super(id,  type, priorite, description, etat, avancement,nom_reclameur,createdAt,updatedAt);
    }


}

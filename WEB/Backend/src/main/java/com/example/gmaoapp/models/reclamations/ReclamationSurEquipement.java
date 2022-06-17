package com.example.gmaoapp.models.reclamations;

import com.example.gmaoapp.models.Equipement;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import javax.persistence.*;
import java.util.Date;


@Entity
@Getter
@Setter
@RequiredArgsConstructor
@Table(name="reclamations_equipements")
public class ReclamationSurEquipement extends Reclamation{
    @ManyToOne(fetch = FetchType.EAGER)
    private Equipement equipement;



    public ReclamationSurEquipement(Long id, String type, int priorite, String description, Boolean etat, int avancement, String nom_reclameur, Date createdAt, Date updatedAt) {
        super(id,  type, priorite, description, etat, avancement,nom_reclameur,createdAt,updatedAt);
    }
}

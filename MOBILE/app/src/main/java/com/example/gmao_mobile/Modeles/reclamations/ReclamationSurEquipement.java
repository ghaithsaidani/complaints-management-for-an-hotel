package com.example.gmao_mobile.Modeles.reclamations;

import com.example.gmao_mobile.Modeles.Equipement;

import java.util.Date;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@RequiredArgsConstructor
public class ReclamationSurEquipement extends Reclamation {
    private Equipement equipement;

    public ReclamationSurEquipement(Long id, String type, int priorite, String description, Boolean etat, int avancement, String nom_reclameur, Date createdAt, Date updatedAt) {
        super(id,  type, priorite, description, etat, avancement,nom_reclameur,createdAt,updatedAt);
    }


}

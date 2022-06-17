package com.example.gmao_mobile.Modeles.reclamations;

import com.example.gmao_mobile.Modeles.Room;
import com.example.gmao_mobile.Modeles.TypePanne;

import java.util.Date;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class ReclamationSurTypePanne  extends Reclamation{
    private TypePanne typePanne;
    private Room chambre;


    public ReclamationSurTypePanne(Long id, String type, int priorite, String description, Boolean etat, int avancement, String nom_reclameur, Date createdAt, Date updatedAt) {
        super(id,  type, priorite, description, etat, avancement,nom_reclameur,createdAt,updatedAt);
    }
}

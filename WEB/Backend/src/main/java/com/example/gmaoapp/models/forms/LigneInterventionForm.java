package com.example.gmaoapp.models.forms;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LigneInterventionForm {
    private Long idReclamtionOuPrevnetif;
    private int etat;
    private List<PieceForm> piece;

}

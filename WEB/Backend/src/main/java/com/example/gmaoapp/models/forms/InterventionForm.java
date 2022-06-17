package com.example.gmaoapp.models.forms;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InterventionForm {
    private List<LigneInterventionForm> ligneInterventionFormsList;
    private Long otId;
    private String descriptionIntervention;

}
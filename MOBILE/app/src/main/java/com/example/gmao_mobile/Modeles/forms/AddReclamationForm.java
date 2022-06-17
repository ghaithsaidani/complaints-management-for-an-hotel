package com.example.gmao_mobile.Modeles.forms;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AddReclamationForm {
    private Long reclamationId;
    private Long panneId;
    private Long roomId;

}
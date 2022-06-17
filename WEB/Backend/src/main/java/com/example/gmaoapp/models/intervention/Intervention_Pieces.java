package com.example.gmaoapp.models.intervention;

import com.example.gmaoapp.models.Pieces;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
@Getter
@Setter
@RequiredArgsConstructor
@Entity
@Table(name="intervention_pieces")
public class Intervention_Pieces implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;

    @ManyToOne
    @JoinColumn(name = "pieces_id")
    private Pieces pieces;
    private int quantiteconsomme;
    public Intervention_Pieces(Pieces pieces, int quantiteconsomme) {
        this.pieces = pieces;
        this.quantiteconsomme = quantiteconsomme;
    }
}

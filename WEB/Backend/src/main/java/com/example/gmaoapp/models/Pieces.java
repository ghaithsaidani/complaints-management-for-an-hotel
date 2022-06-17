package com.example.gmaoapp.models;

import com.example.gmaoapp.models.intervention.Intervention_Pieces;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name="pieces")
public class Pieces {

    @Id
    @GeneratedValue
    private Long id;
    @Column(nullable = false, length = 30)
    private String designation;
    @Column(nullable = false, length = 150)
    private String description;
    @Column(nullable = false, length = 150)
    private String emplacement;
    private long quantiteStock;
    private long quantiteMinimal;
    private float prixUnitaire;
    private Boolean etat = true;
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private Date createdAt=new Date();

    @LastModifiedDate
    @Column(name = "updated_at")
    private Date updatedAt=new Date();



    @OneToMany(mappedBy = "pieces", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Intervention_Pieces> intervention_pieces;

}

package com.example.gmaoapp.models;

import com.example.gmaoapp.models.ot.OT;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="intervenants")
public class Intervenant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String nom;
    @Column(nullable = false)
    private String prenom;
    @Column(nullable = false)
    private long tel;
    @Column(nullable = false)
    private String profession;
    @Column
    private Boolean etat=true;
    @Column
    private int disponibilite=1;
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private Date createdAt=new Date();

    @LastModifiedDate
    @Column(name = "updated_at")
    private Date updatedAt=new Date();


    @ManyToMany
    @JsonIgnoreProperties(value = {"intervenantsAffectes"})
    @JoinTable(name="Ot_affectes")
    private List<OT> otAffecte;




}

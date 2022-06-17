package com.example.gmaoapp.models.ot;

import com.example.gmaoapp.models.Intervenant;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "OT")
@Inheritance(strategy = InheritanceType.JOINED)
public class OT {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String type;



    @Column(updatable = false)
    private Date dateLancement=new Date();


    private Date dateTermination=new Date();

    @Column(nullable = false)
    private Boolean etat=true;


    private int cloturage=0;



    @Column(nullable = false)
    private String description;

    @ManyToMany
    @JsonIgnoreProperties(value = {"otAffecte"})
    private List<Intervenant> intervenantsAffectes;

    /*@OneToOne
    private Intervention intervention;*/

    public OT(String description, List<Intervenant> intervenantsAffectes) {
        this.description = description;
        this.intervenantsAffectes = intervenantsAffectes;
    }


}

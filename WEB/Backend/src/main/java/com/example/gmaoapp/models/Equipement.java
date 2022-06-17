package com.example.gmaoapp.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="equipements")
public class Equipement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 300)
    private String description;

    @Column(nullable = false,length = 100)
    private String designation;

    @Column(nullable = false)
    private Long numSerie;

    @Column(nullable = false,length = 50)
    private String famille;

    @Column(nullable = false)
    private Date dateachat;

    @Column(nullable = false)
    private Date dateexploi;


    @Column(nullable = false)
    private int periodicite_maintenance;

    @Column(nullable = false)
    private Boolean etat=true;

    @Column(nullable = false)
    private int etat_equipement=1;
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private Date createdAt=new Date();

    @LastModifiedDate
    @Column(name = "updated_at")
    private Date updatedAt=new Date();


    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnoreProperties(value = {"equipements"})
    private Local local;

    public Equipement(Long id, String description, String designation, Long numSerie, String famille, Date dateachat, Date dateexploi, int periodicite_maintenance) {
        this.id = id;
        this.description = description;
        this.designation = designation;
        this.numSerie = numSerie;
        this.famille = famille;
        this.dateachat = dateachat;
        this.dateexploi = dateexploi;
        this.periodicite_maintenance = periodicite_maintenance;
    }
}

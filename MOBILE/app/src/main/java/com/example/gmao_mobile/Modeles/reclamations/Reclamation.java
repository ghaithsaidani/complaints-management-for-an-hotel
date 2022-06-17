package com.example.gmao_mobile.Modeles.reclamations;

import java.util.Comparator;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Reclamation{

    private Long id;
    private String type;
    private int priorite;
    private String description;
    private Boolean etat;
    private int avancement;
    private String nom_reclameur;
    private Date createdAt;
    private Date updatedAt;


    /*public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getPriorite() {
        return priorite;
    }

    public void setPriorite(int priorite) {
        this.priorite = priorite;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getEtat() {
        return etat;
    }

    public void setEtat(Boolean etat) {
        this.etat = etat;
    }

    public int getAvancement() {
        return avancement;
    }

    public void setAvancement(int avancement) {
        this.avancement = avancement;
    }

    public String getNom_reclameur() {
        return nom_reclameur;
    }

    public void setNom_reclameur(String nom_reclameur) {
        this.nom_reclameur = nom_reclameur;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }*/


    /*@Override
    public int compareTo(Reclamation o) {
        return avancement-o.getAvancement() - o.getUpdatedAt().compareTo(updatedAt) ;
    }*/

    public static final Comparator<Reclamation> BY_AVANCEMENT=new Comparator<Reclamation>() {
        @Override
        public int compare(Reclamation o1, Reclamation o2) {
            return o1.getAvancement()-o2.getAvancement();
        }
    };

    public static final Comparator<Reclamation> BY_Date=new Comparator<Reclamation>() {
        @Override
        public int compare(Reclamation o1, Reclamation o2) {
            return o2.getUpdatedAt().compareTo(o1.getUpdatedAt());
        }
    };




}

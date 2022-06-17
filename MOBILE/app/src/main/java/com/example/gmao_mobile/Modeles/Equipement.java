package com.example.gmao_mobile.Modeles;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.time.LocalDate;
import java.util.Date;

public class Equipement {
    private Long id;
    private String description;
    private String designation;
    private Long numSerie;
    private String famille;
    private Date dateachat;
    private Date dateexploi;
    private int periodicite_maintenance;
    private Boolean etat;
    private int etat_equipement;
    private Date createdAt;
    private Date updatedAt;
    @JsonIgnoreProperties(value = {"equipements"})
    private Local local;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public Long getNumSerie() {
        return numSerie;
    }

    public void setNumSerie(Long numSerie) {
        this.numSerie = numSerie;
    }

    public String getFamille() {
        return famille;
    }

    public void setFamille(String famille) {
        this.famille = famille;
    }

    public Date getDateachat() {
        return dateachat;
    }

    public void setDateachat(Date dateachat) {
        this.dateachat = dateachat;
    }

    public Date getDateexploi() {
        return dateexploi;
    }

    public void setDateexploi(Date dateexploi) {
        this.dateexploi = dateexploi;
    }

    public int getPeriodicite_maintenance() {
        return periodicite_maintenance;
    }

    public void setPeriodicite_maintenance(int periodicite_maintenance) {
        this.periodicite_maintenance = periodicite_maintenance;
    }

    public Boolean getEtat() {
        return etat;
    }

    public void setEtat(Boolean etat) {
        this.etat = etat;
    }

    public int getEtat_equipement() {
        return etat_equipement;
    }

    public void setEtat_equipement(int etat_equipement) {
        this.etat_equipement = etat_equipement;
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
    }

    public Local getLocal() {
        return local;
    }

    public void setLocal(Local local) {
        this.local = local;
    }
}

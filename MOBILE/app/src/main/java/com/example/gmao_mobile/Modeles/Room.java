package com.example.gmao_mobile.Modeles;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

public class Room {
    private Long id;
    private int numero;
    private Boolean etat;
    private Date createdAt;
    private Date updatedAt;
    @JsonIgnore
    private Collection<TypePanne> typePannes=new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getNumero() {
        return numero;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }

    public Boolean getEtat() {
        return etat;
    }

    public void setEtat(Boolean etat) {
        this.etat = etat;
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

    public Collection<TypePanne> getTypePannes() {
        return typePannes;
    }

    public void setTypePannes(Collection<TypePanne> typePannes) {
        this.typePannes = typePannes;
    }
}

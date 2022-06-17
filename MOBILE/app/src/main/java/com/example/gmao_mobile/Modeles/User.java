package com.example.gmao_mobile.Modeles;

import android.os.Parcel;
import android.os.Parcelable;

import com.example.gmao_mobile.Modeles.reclamations.Reclamation;
import com.example.gmao_mobile.Modeles.reclamations.Reclamation;
import com.example.gmao_mobile.Modeles.reclamations.ReclamationSurTypePanne;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.ArrayList;

public class User implements Parcelable {
    private Long id;
    private String name;
    private String prename;
    private Boolean etat=true;
    private String email;
    private String password;
    private Long tel;
    private Date createdAt;


    private Date updatedAt;

    private Collection<Role> roles=new ArrayList<>();

    private String fonction;

    private ArrayList<Reclamation> reclmations;


    protected User(Parcel in) {
        if (in.readByte() == 0) {
            id = null;
        } else {
            id = in.readLong();
        }
        name = in.readString();
        prename = in.readString();
        byte tmpEtat = in.readByte();
        etat = tmpEtat == 0 ? null : tmpEtat == 1;
        email = in.readString();
        password = in.readString();
        if (in.readByte() == 0) {
            tel = null;
        } else {
            tel = in.readLong();
        }
        fonction = in.readString();
    }

    public static final Creator<User> CREATOR = new Creator<User>() {
        @Override
        public User createFromParcel(Parcel in) {
            return new User(in);
        }

        @Override
        public User[] newArray(int size) {
            return new User[size];
        }
    };

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPrename() {
        return prename;
    }

    public void setPrename(String prename) {
        this.prename = prename;
    }

    public Boolean getEtat() {
        return etat;
    }

    public void setEtat(Boolean etat) {
        this.etat = etat;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Long getTel() {
        return tel;
    }

    public void setTel(Long tel) {
        this.tel = tel;
    }

    public Collection<Role> getRoles() {
        return roles;
    }

    public void setRoles(Collection<Role> roles) {
        this.roles = roles;
    }

    public String getFonction() {
        return fonction;
    }

    public void setFonction(String fonction) {
        this.fonction = fonction;
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

    public ArrayList<Reclamation> getReclmations() {
        return reclmations;
    }

    public void setReclmations(ArrayList<Reclamation> reclmations) {
        this.reclmations = reclmations;
    }

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        if (id == null) {
            dest.writeByte((byte) 0);
        } else {
            dest.writeByte((byte) 1);
            dest.writeLong(id);
        }
        dest.writeString(name);
        dest.writeString(prename);
        dest.writeByte((byte) (etat == null ? 0 : etat ? 1 : 2));
        dest.writeString(email);
        dest.writeString(password);
        if (tel == null) {
            dest.writeByte((byte) 0);
        } else {
            dest.writeByte((byte) 1);
            dest.writeLong(tel);
        }
        dest.writeString(fonction);
    }
}

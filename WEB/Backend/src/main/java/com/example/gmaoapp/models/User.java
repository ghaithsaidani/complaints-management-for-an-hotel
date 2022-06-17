package com.example.gmaoapp.models;

import com.example.gmaoapp.models.reclamations.Reclamation;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.util.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="users")
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String prename;
    private Boolean etat=true;
    private String email;
    private String password;
    private Long tel;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private Date createdAt=new Date();



    @LastModifiedDate
    @Column(name = "updated_at")
    private Date updatedAt=new Date();

    @ManyToMany(fetch = FetchType.EAGER)
    private Collection<Role> roles=new ArrayList<>();

    private String fonction;


    @ManyToMany(fetch = FetchType.LAZY)
    private List<Reclamation> reclmations=new ArrayList<>();

    public User(Long id, String name, String prename, String email, String password, Long tel, Collection<Role> roles, String fonction, List<Reclamation> reclmations) {
        this.id = id;
        this.name = name;
        this.prename = prename;
        this.email = email;
        this.password = password;
        this.tel = tel;
        this.roles = roles;
        this.fonction = fonction;
        this.reclmations = reclmations;
    }

}

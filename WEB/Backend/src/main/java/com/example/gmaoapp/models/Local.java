package com.example.gmaoapp.models;


import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="locaux")
public class Local {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 300)
    private String description;

    @Column(length = 80)
    private String parent;

    @Column(nullable = false)
    private Boolean etat=true;
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private Date createdAt=new Date();

    @LastModifiedDate
    @Column(name = "updated_at")
    private Date updatedAt=new Date();


    @OneToMany(fetch = FetchType.LAZY)
    private List<Equipement> equipements=new ArrayList<>();


    public Local(Long id, String description, String parent, List<Equipement> equipements) {
        this.id = id;
        this.description = description;
        this.parent = parent;
        this.equipements = equipements;
    }
}

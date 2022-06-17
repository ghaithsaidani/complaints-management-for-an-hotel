package com.example.gmaoapp.models;


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
@Table(name="typespannes")
public class TypePanne {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false,length = 100)
    private String designation;

    @Column(nullable = false)
    private Boolean etat=true;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private Date createdAt=new Date();

    @LastModifiedDate
    @Column(name = "updated_at")
    private Date updatedAt=new Date();


    /*@ManyToOne(fetch = FetchType.EAGER)
    private Room room;*/

    public TypePanne(Long id, String designation) {
        this.id = id;
        this.designation = designation;
    }


}

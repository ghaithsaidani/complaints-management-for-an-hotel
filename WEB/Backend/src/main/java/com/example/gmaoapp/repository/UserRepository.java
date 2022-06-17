package com.example.gmaoapp.repository;

import com.example.gmaoapp.models.Equipement;
import com.example.gmaoapp.models.User;
import com.example.gmaoapp.models.ot.OT;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    User findByEmailAndPassword(String email, String password);
    User findUserByEmail(String email);



    @Query(value = "select u from User u where u.etat = :keyword")
    List<User> filterUsersByEtat(@Param("keyword") String keyword);
    /*@Query(value = "select u from User u where u.typefonction = :keyword")
    List<User> filterUsersByTypeFonction(@Param("keyword") String keyword);*/



    @Query(value = "select * from mydatabase.nombre_reclamations_par_reclameurs",nativeQuery = true)
    List<Object> nb_reclamations_group_by_user();


    @Query(value = "select count(*) from mydatabase.users_reclmations where user_id=:id",nativeQuery = true)
    Object nb_reclamations_user(@Param("id") long id);

    @Transactional
    @Modifying
    @Query("UPDATE User u " +
            "SET u.etat = TRUE WHERE u.id = ?1")
    int enableUser(Long id);


    @Transactional
    @Modifying
    @Query("UPDATE User u " +
            "SET u.etat = FALSE WHERE u.id = ?1")
    int disableUser(Long id);


    @Query(value = "select u from User u order by u.updatedAt desc")
    List<User> getAllOrderedByDate();

    @Query(value = "select u from User u where u.etat=true")
    List<User> getActive();

}

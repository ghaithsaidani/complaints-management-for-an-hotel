package com.example.gmaoapp.repository;

import com.example.gmaoapp.models.PreventifSysteme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PreventifSystemeRepository extends JpaRepository<PreventifSysteme, Long> {
    PreventifSysteme findPreventifSystemeById(Long id);

    @Query(value = "select p from PreventifSysteme p where p.avancement<1 AND p.datePrevue> NOW() order by p.datePrevue desc",nativeQuery = true)
    List<PreventifSysteme> getProche();


}
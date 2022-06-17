package com.example.gmaoapp.repository.intervention;

import com.example.gmaoapp.models.intervention.Intervention_Pieces;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Intervention_PiecesRepository extends JpaRepository<Intervention_Pieces, Long> {
}
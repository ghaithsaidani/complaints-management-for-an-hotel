package com.example.gmaoapp.repository.otRepository;

import com.example.gmaoapp.models.ot.OTPreventif;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OTPreventifRepository extends JpaRepository<OTPreventif, Long> {

}
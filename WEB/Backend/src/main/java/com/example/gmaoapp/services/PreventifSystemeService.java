package com.example.gmaoapp.services;

import com.example.gmaoapp.models.PreventifSysteme;
import com.example.gmaoapp.repository.PreventifSystemeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class PreventifSystemeService {
    @Autowired
    private PreventifSystemeRepository preventifSystemeRepository;



    public List<PreventifSysteme> chargerTous() {

        return preventifSystemeRepository.findAll();
    }

    public List<PreventifSysteme> getProche() {

        return preventifSystemeRepository.getProche();
    }

    public PreventifSysteme findById(Long id) {

        return preventifSystemeRepository.findById(id).get();
    }



    public PreventifSysteme ajouterPreventif(PreventifSysteme preventifSysteme){

        return preventifSystemeRepository.save(preventifSysteme);
    }

    public PreventifSysteme modifierPreventif(PreventifSysteme preventifSysteme){

        return preventifSystemeRepository.save(preventifSysteme);
    }

    public PreventifSysteme chercherPreventifParId(long id){
        return preventifSystemeRepository.findById(id).get();
    }
}

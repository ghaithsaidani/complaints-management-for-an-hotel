package com.example.gmaoapp.services;


import com.example.gmaoapp.models.*;
import com.example.gmaoapp.models.ot.OT;
import com.example.gmaoapp.repository.TypePanneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class TypePanneService {

    @Autowired
    private TypePanneRepository typepannerepo;


    public TypePanne findByID(Long id){
        return typepannerepo.findById(id).get();
    }

    public TypePanne saveTypePanne(TypePanne typePanne){
        return typepannerepo.save(typePanne);
    }

    public List<TypePanne> getTypesPannes(){
        return typepannerepo.getAllOrderedByDate();
    }

    public int enableTypePanne(Long id) {
        return typepannerepo.enablePanne(id);
    }

    public int disableTypePanne(Long id) {
        return typepannerepo.disablePanne(id);
    }

    public List<Object> Panne_Plus_Repete(){
        return typepannerepo.Panne_Plus_Repete();
    }



    public List<TypePanne> getActive(){
        return typepannerepo.getActive();
    }

    public TypePanne updatePanne(TypePanne panne){
        panne.setUpdatedAt(new Date());
        return typepannerepo.save(panne);
    }




    /*public void addChambretoTypePanne(Long chambreId,Long typepanneId){

        Room chambre=chambreRepository.findById(chambreId).get();
        TypePanne typePanne=typepannerepo.findById(typepanneId).get();

        typePanne.setRoom(chambre);
        typepannerepo.save(typePanne);
    }*/
}

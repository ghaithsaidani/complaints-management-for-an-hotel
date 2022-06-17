package com.example.gmao_mobile.Utils.services;

import com.example.gmao_mobile.Modeles.Equipement;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Header;

public interface EquipementService {
    @GET("all")
    Call<List<Equipement>> getAll();
}

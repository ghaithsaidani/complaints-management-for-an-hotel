package com.example.gmao_mobile.Utils.services;

import com.example.gmao_mobile.Modeles.Equipement;
import com.example.gmao_mobile.Modeles.Local;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface LocalService {
    @GET("all")
    Call<List<Local>> getAll();

    @GET("find/{id}")
    Call<Local> getLocalById(@Path("id") Long id);
}

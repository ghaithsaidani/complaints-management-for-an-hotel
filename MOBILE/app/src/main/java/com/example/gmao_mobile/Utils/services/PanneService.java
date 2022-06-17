package com.example.gmao_mobile.Utils.services;

import com.example.gmao_mobile.Modeles.TypePanne;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Header;

public interface PanneService {
    @GET("all")
    Call<List<TypePanne>> getAll();
}

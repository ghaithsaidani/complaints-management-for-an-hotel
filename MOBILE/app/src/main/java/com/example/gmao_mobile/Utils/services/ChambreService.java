package com.example.gmao_mobile.Utils.services;

import com.example.gmao_mobile.Modeles.Room;
import com.example.gmao_mobile.Modeles.reclamations.Reclamation;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Header;

public interface ChambreService {
    @GET("all")
    Call<List<Room>> getAll();
}

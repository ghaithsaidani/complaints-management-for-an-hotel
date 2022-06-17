package com.example.gmao_mobile.Utils.services;

import com.example.gmao_mobile.Modeles.forms.AddReclamationForm;
import com.example.gmao_mobile.Modeles.forms.IDtoIDForm;
import com.example.gmao_mobile.Modeles.reclamations.Reclamation;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;

public interface ReclamationsService {
    @GET("all")
    Call<List<Reclamation>> getAll(@Header("Authorization") String token);

    @POST("reclamation/save")
    Call<Reclamation> saveReclamation(@Body Reclamation reclamation);

    @POST("addpannetoreclamation")
    Call<Reclamation> AddPanneandRoomReclamation(@Body AddReclamationForm reclamation);

    @POST("addequipementtoreclamation")
    Call<Reclamation> AddEquipementToReclamation(@Body IDtoIDForm reclamation);


    /*@GET("getuser/{email}")
    Call<User> getUser(@Path(value = "email",encoded = false) String email);

    @FormUrlEncoded
    @POST("login")
    Call<Token> login(@Field("email") String email, @Field("password") String password);*/
}

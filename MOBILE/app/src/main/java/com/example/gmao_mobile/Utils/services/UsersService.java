package com.example.gmao_mobile.Utils.services;

import com.example.gmao_mobile.Modeles.Token;
import com.example.gmao_mobile.Modeles.User;
import com.example.gmao_mobile.Modeles.forms.EmailToIDForm;
import com.example.gmao_mobile.Modeles.reclamations.Reclamation;
import com.example.gmao_mobile.Modeles.reclamations.ReclamationSurEquipement;
import com.example.gmao_mobile.Modeles.reclamations.ReclamationSurTypePanne;

import java.util.List;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.Path;



public interface UsersService {

    @GET("all")
    Call<List<User>> getAll(@Header("Authorization") String token);


    @GET("getuser/{email}")
    Call<User> getUser(@Path(value = "email",encoded = false) String email);

    @GET("getuserreclamations/equipements/{email}")
    Call<List<ReclamationSurEquipement>> getUserReclamationsEquipements(@Path(value = "email",encoded = false) String email);

    @GET("getuserreclamations/pannes/{email}")
    Call<List<ReclamationSurTypePanne>> getUserReclamationsPannes(@Path(value = "email",encoded = false) String email);


    @POST("reclamation/addtouser")
    Call<Reclamation> AddReclamationToUser(@Body EmailToIDForm body);



    @FormUrlEncoded
    @POST("login")
    Call<Token> login(@Field("email") String email, @Field("password") String password);

    /*@POST("agregar")
    Call<Persona>addPersona(@Body Persona persona);

    @POST("actualizar/{id}")
    Call<Persona>updatePersona(@Body Persona persona,@Path("id") int id);

    @POST("eliminar/{id}")
    Call<Persona>deletePersona(@Path("id")int id);*/

}

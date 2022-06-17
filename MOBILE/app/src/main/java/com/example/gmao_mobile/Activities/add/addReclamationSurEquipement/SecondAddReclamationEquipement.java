package com.example.gmao_mobile.Activities.add.addReclamationSurEquipement;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.WindowManager;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.Toast;

import com.example.gmao_mobile.Activities.ReclamationsActivity;
import com.example.gmao_mobile.Modeles.Local;
import com.example.gmao_mobile.Modeles.User;
import com.example.gmao_mobile.Modeles.forms.EmailToIDForm;
import com.example.gmao_mobile.Modeles.forms.IDtoIDForm;
import com.example.gmao_mobile.Modeles.reclamations.Reclamation;
import com.example.gmao_mobile.Modeles.reclamations.ReclamationSurEquipement;
import com.example.gmao_mobile.R;
import com.example.gmao_mobile.Utils.Apis;
import com.example.gmao_mobile.Utils.services.LocalService;
import com.example.gmao_mobile.Utils.services.ReclamationsService;
import com.example.gmao_mobile.Utils.services.UsersService;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.progressindicator.CircularProgressIndicator;
import com.google.android.material.progressindicator.LinearProgressIndicator;
import com.google.android.material.snackbar.Snackbar;
import com.google.android.material.textfield.TextInputLayout;
import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class SecondAddReclamationEquipement extends AppCompatActivity {

    MaterialButton validate,previous,second_back;
    LocalService localService;

    String[] Equipementitems;
    ArrayList<Long> EquipementIditems=new ArrayList<>();
    AutoCompleteTextView equipementautoComplete;
    ArrayAdapter<String> EquipementAdapteritems;
    List<String> equipementList=new ArrayList<>();
    TextInputLayout equipement_input;
    CircularProgressIndicator add_progress;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_second_add_reclamation_equipement);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS,WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS);

        add_progress=findViewById(R.id.add_equipemnt_progress);
        add_progress.hide();
        validate=findViewById(R.id.validate_equipement);
        second_back=findViewById(R.id.second_back_equipement);
        previous=findViewById(R.id.previous_equipement);
        equipement_input=findViewById(R.id.equipement_text_input);
        equipementautoComplete = findViewById(R.id.equipement_auto_complete);
        ListeEquipements();
        second_back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i =new Intent(getApplicationContext(), ReclamationsActivity.class);
                startActivity(i);
                overridePendingTransition(R.anim.left_slide_in,R.anim.right_slide_out);
                //Navigation.findNavController(myfragment).navigate(R.id.action_navigation_second_add_reclamations_pannes_to_navigation_reclamations);
            }
        });
        previous.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i =new Intent(getApplicationContext(), FirstAddReclamationEquipement.class);
                startActivity(i);
                overridePendingTransition(R.anim.left_slide_in,R.anim.right_slide_out);
                //Navigation.findNavController(myfragment).navigate(R.id.action_navigation_second_add_reclamations_pannes_to_navigation_first_add_reclamations_pannes);
            }
        });
        validate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                addReclamation();

                //Snackbar.make(findViewById(R.id.view_pager),"Reclamation Ajouté avec succés",Snackbar.LENGTH_LONG).show();





                /*int room=Integer.parseInt(getArguments().getString("room_number"));
                String priority=getArguments().getString("priority");
                String description=getArguments().getString("description");*/
                //String number=equip.getText().toString().trim();

            }
        });
    }

    public void addReclamation(){
        //int priority=0;
        add_progress.show();
        ReclamationSurEquipement reclamationSurEquipement=new ReclamationSurEquipement();
        reclamationSurEquipement.setType("local");
        reclamationSurEquipement.setAvancement(0);
        reclamationSurEquipement.setDescription(getIntent().getStringExtra("description"));
        /*Log.e("description",getIntent().getStringExtra("description"));
        Log.e("room",getIntent().getStringExtra("room"));
        Log.e("priority",getIntent().getStringExtra("priority"));*/
        switch(getIntent().getStringExtra("priority")){
            case "Éleve":
                reclamationSurEquipement.setPriorite(2);
                break;
            case "Moyenne":
                reclamationSurEquipement.setPriorite(1);
                break;
            case "Bas":
                reclamationSurEquipement.setPriorite(0);
                break;
        }

        ReclamationsService reclamationsService= Apis.getReclamationssService();
        UsersService usersService=Apis.getUsersService();

        Call<Reclamation> call=reclamationsService.saveReclamation(reclamationSurEquipement);



        call.enqueue(new Callback<Reclamation>() {
            @Override
            public void onResponse(Call<Reclamation> call, Response<Reclamation> response) {
                if(response.isSuccessful()) {
                    Long id=0L;
                    for (int i=0;i<Equipementitems.length;i++){
                        if(Equipementitems[i].equals(equipementautoComplete.getText().toString())){
                            id=EquipementIditems.get(i);
                            //Log.e("i",String.valueOf(i));
                            break;
                        }
                    }

                    Call<Reclamation> call2=reclamationsService.AddEquipementToReclamation(new IDtoIDForm(response.body().getId(),id));
                    call2.enqueue(new Callback<Reclamation>() {
                        @Override
                        public void onResponse(Call<Reclamation> call, Response<Reclamation> response) {
                            if(response.isSuccessful()){
                                SharedPreferences sharedpreferences = getSharedPreferences("shared", Context.MODE_PRIVATE);
                                Gson gson = new Gson();
                                String json = sharedpreferences.getString("current_user", "");
                                User user = gson.fromJson(json, User.class);
                                Call<Reclamation> call3=usersService.AddReclamationToUser(new EmailToIDForm(user.getEmail(),response.body().getId()));
                                call3.enqueue(new Callback<Reclamation>() {
                                    @Override
                                    public void onResponse(Call<Reclamation> call, Response<Reclamation> response) {

                                            add_progress.hide();
                                            Intent in=new Intent(SecondAddReclamationEquipement.this,ReclamationsActivity.class);
                                            startActivity(in);
                                            overridePendingTransition(R.anim.left_slide_in,R.anim.right_slide_out);
                                            Toast.makeText(getApplicationContext(),"Reclamation Ajouté avec succes",Toast.LENGTH_LONG).show();

                                    }

                                    @Override
                                    public void onFailure(Call<Reclamation> call, Throwable t) {

                                    }
                                });
                            }
                            else{
                                Log.e("error1","error1");
                            }
                        }

                        @Override
                        public void onFailure(Call<Reclamation> call, Throwable t) {
                            Log.e("error","error");
                        }
                    });

                }
                else{
                    Log.e("error","error");
                }
            }

            @Override
            public void onFailure(Call<Reclamation> call, Throwable t) {
                Log.e("Error:",t.getMessage());
            }
        });


    }


    public void ListeEquipements(){
        localService = Apis.getLocalService();
        Call<Local> call=localService.getLocalById(getIntent().getLongExtra("localId",0L));
        call.enqueue(new Callback<Local>() {
            @Override
            public void onResponse(Call<Local> call, Response<Local> response) {
                if(response.isSuccessful()) {
                    Equipementitems=new String[response.body().getEquipements().size()];
                    for(int i=0;i<response.body().getEquipements().size();i++){
                        Equipementitems[i]=String.valueOf(response.body().getEquipements().get(i).getDesignation());
                        EquipementIditems.add(response.body().getEquipements().get(i).getId());
                    }

                    EquipementAdapteritems = new ArrayAdapter<String>(getApplicationContext(),R.layout.chambre_list_items, Equipementitems);
                    equipementautoComplete.setAdapter(EquipementAdapteritems);
                    /*chambreautoComplete.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                        @Override
                        public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                            String item = parent.getItemAtPosition(position).toString();
                            *//*Toast.makeText(myfragment.getContext(),"Item: "+item,Toast.LENGTH_SHORT).show();*//*
                        }
                    });*/

                }
                else{
                    Log.e("error","error");
                }
            }

            @Override
            public void onFailure(Call<Local> call, Throwable t) {
                Log.e("Error:",t.getMessage());
            }
        });
    }
}
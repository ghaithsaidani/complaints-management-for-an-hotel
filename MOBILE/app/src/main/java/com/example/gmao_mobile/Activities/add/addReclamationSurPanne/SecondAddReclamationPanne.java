package com.example.gmao_mobile.Activities.add.addReclamationSurPanne;

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

import com.example.gmao_mobile.Activities.ReclamationsActivity;
import com.example.gmao_mobile.Activities.add.addReclamationSurEquipement.SecondAddReclamationEquipement;
import com.example.gmao_mobile.Modeles.TypePanne;
import com.example.gmao_mobile.Modeles.User;
import com.example.gmao_mobile.Modeles.forms.AddReclamationForm;
import com.example.gmao_mobile.Modeles.forms.EmailToIDForm;
import com.example.gmao_mobile.Modeles.reclamations.Reclamation;
import com.example.gmao_mobile.Modeles.reclamations.ReclamationSurTypePanne;
import com.example.gmao_mobile.R;
import com.example.gmao_mobile.Utils.Apis;
import com.example.gmao_mobile.Utils.services.PanneService;
import com.example.gmao_mobile.Utils.services.ReclamationsService;
import com.example.gmao_mobile.Utils.services.UsersService;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.progressindicator.CircularProgressIndicator;
import com.google.android.material.progressindicator.LinearProgressIndicator;
import com.google.android.material.textfield.TextInputLayout;
import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class SecondAddReclamationPanne extends AppCompatActivity {



    MaterialButton validate,previous,second_back;
    PanneService panneService;

    String[] Panneitems;
    ArrayList<Long> PanneIditems=new ArrayList<>();
    AutoCompleteTextView panneautoComplete;
    ArrayAdapter<String> PanneAdapteritems;
    List<String> panneList=new ArrayList<>();
    TextInputLayout panne_input;
    CircularProgressIndicator add_progress;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_second_add_reclamation_panne);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS,WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS);
        add_progress=findViewById(R.id.add_panne_progress);
        add_progress.hide();

        validate=findViewById(R.id.validate);
        second_back=findViewById(R.id.second_back);
        previous=findViewById(R.id.previous);
        panne_input=findViewById(R.id.panne_text_input);
        panneautoComplete = findViewById(R.id.panne_auto_complete);
        ListePannes();
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
                Intent i =new Intent(getApplicationContext(), FirstAddReclamationPanne.class);
                startActivity(i);
                overridePendingTransition(R.anim.left_slide_in,R.anim.right_slide_out);
                //Navigation.findNavController(myfragment).navigate(R.id.action_navigation_second_add_reclamations_pannes_to_navigation_first_add_reclamations_pannes);
            }
        });
        validate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                addReclamation();
                /*int room=Integer.parseInt(getArguments().getString("room_number"));
                String priority=getArguments().getString("priority");
                String description=getArguments().getString("description");*/
                //String number=equip.getText().toString().trim();

            }
        });
    }

    public void addReclamation(){
        add_progress.show();
        int priority=0;
        ReclamationSurTypePanne reclamationSurTypePanne=new ReclamationSurTypePanne();
        reclamationSurTypePanne.setType("chambre");
        reclamationSurTypePanne.setAvancement(0);
        reclamationSurTypePanne.setDescription(getIntent().getStringExtra("description"));
        /*Log.e("description",getIntent().getStringExtra("description"));
        Log.e("room",getIntent().getStringExtra("room"));
        Log.e("priority",getIntent().getStringExtra("priority"));*/
        switch(getIntent().getStringExtra("priority")){
            case "Éleve":
                reclamationSurTypePanne.setPriorite(2);
                break;
            case "Moyenne":
                reclamationSurTypePanne.setPriorite(1);
                break;
            case "Bas":
                reclamationSurTypePanne.setPriorite(0);
                break;
        }

        ReclamationsService reclamationsService=Apis.getReclamationssService();
        UsersService usersService=Apis.getUsersService();

        Call<Reclamation> call=reclamationsService.saveReclamation(reclamationSurTypePanne);



        call.enqueue(new Callback<Reclamation>() {
            @Override
            public void onResponse(Call<Reclamation> call, Response<Reclamation> response) {
                if(response.isSuccessful()) {
                    Long id=0L;
                    for (int i=0;i<Panneitems.length;i++){
                        if(Panneitems[i].equals(panneautoComplete.getText().toString())){
                            id=PanneIditems.get(i);
                            break;
                        }
                    }
                    Call<Reclamation> call2=reclamationsService.AddPanneandRoomReclamation(new AddReclamationForm(response.body().getId(),id,Long.parseLong(getIntent().getStringExtra("room"))));
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
                                        if(response.isSuccessful()){
                                            //Log.e("success","success");
                                            add_progress.hide();
                                            Intent in=new Intent(SecondAddReclamationPanne.this,ReclamationsActivity.class);
                                            startActivity(in);
                                            overridePendingTransition(R.anim.left_slide_in,R.anim.right_slide_out);
                                        }
                                        else{
                                            Log.e("error","error");
                                        }
                                    }

                                    @Override
                                    public void onFailure(Call<Reclamation> call, Throwable t) {

                                    }
                                });
                            }
                            else{
                                Log.e("error","error");
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


    public void ListePannes(){
        panneService = Apis.getPanneService();
        Call<List<TypePanne>> call=panneService.getAll();
        call.enqueue(new Callback<List<TypePanne>>() {
            @Override
            public void onResponse(Call<List<TypePanne>> call, Response<List<TypePanne>> response) {
                if(response.isSuccessful()) {
                    Panneitems=new String[response.body().size()];
                    for(int i=0;i<response.body().size();i++){
                        Panneitems[i]=String.valueOf(response.body().get(i).getDesignation());
                        PanneIditems.add(response.body().get(i).getId());
                    }

                    PanneAdapteritems = new ArrayAdapter<String>(getApplicationContext(),R.layout.chambre_list_items, Panneitems);
                    panneautoComplete.setAdapter(PanneAdapteritems);
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
            public void onFailure(Call<List<TypePanne>> call, Throwable t) {
                Log.e("Error:",t.getMessage());
            }
        });
    }




}
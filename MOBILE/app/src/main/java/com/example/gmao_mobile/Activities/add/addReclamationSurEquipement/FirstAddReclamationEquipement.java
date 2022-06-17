package com.example.gmao_mobile.Activities.add.addReclamationSurEquipement;

import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.WindowManager;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;

import com.example.gmao_mobile.Activities.ReclamationsActivity;
import com.example.gmao_mobile.Activities.add.addReclamationSurPanne.FirstAddReclamationPanne;
import com.example.gmao_mobile.Activities.add.addReclamationSurPanne.SecondAddReclamationPanne;
import com.example.gmao_mobile.Adapters.AutoCompleteAdapter;
import com.example.gmao_mobile.Modeles.Local;
import com.example.gmao_mobile.Modeles.Room;
import com.example.gmao_mobile.R;
import com.example.gmao_mobile.Utils.Apis;
import com.example.gmao_mobile.Utils.services.ChambreService;
import com.example.gmao_mobile.Utils.services.LocalService;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.textfield.TextInputEditText;
import com.google.android.material.textfield.TextInputLayout;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class FirstAddReclamationEquipement extends AppCompatActivity {

    String[] localitems ;
    ArrayList<Long> localidItems =new ArrayList<>();
    AutoCompleteTextView localautoComplete;
    ArrayAdapter<String> LocalAdapteritems;
    String[] priorityitems ={"Éleve","Moyenne","Bas"};
    AutoCompleteTextView priorityautoComplete;
    ArrayAdapter<String> priorityAdapteritems;
    LocalService localService;
    //private List<Room> chambreList=new ArrayList<>();
    MaterialButton back,next;
    TextInputLayout description,priority,local_description;
    TextInputEditText descriptionEditText;

    private static final String KEY_DESCRIPTION="description";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_first_add_reclamation_equipement);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS,WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS);
        descriptionEditText=findViewById(R.id.description_equipement);
        description=findViewById(R.id.description_text_input_equipement);
        priority=findViewById(R.id.priority_text_input);
        local_description=findViewById(R.id.description_local_text_input);
        localautoComplete = findViewById(R.id.local_auto_complete);
        listLocals();
        priorityautoComplete = findViewById(R.id.priority_auto_complete_equipement);
        priorityAdapteritems = new ArrayAdapter<String>(this,R.layout.chambre_list_items, priorityitems);
        priorityautoComplete.setAdapter(priorityAdapteritems);
        back=findViewById(R.id.backEquipement);
        next=findViewById(R.id.first_next_equipement);
        if(savedInstanceState!=null){
            Log.e("hey",savedInstanceState.getString(KEY_DESCRIPTION));
        }
        back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i =new Intent(getApplicationContext(), ReclamationsActivity.class);
                startActivity(i);
                overridePendingTransition(R.anim.left_slide_in,R.anim.right_slide_out);
            }
        });
        next.setOnClickListener(new View.OnClickListener() {
            @SuppressLint("ResourceType")
            @Override
            public void onClick(View v) {
                Long id=0L;
                for (int i=0;i<localitems.length;i++){
                    if(localitems[i].equals(localautoComplete.getText().toString().trim())){
                        id=localidItems.get(i);
                        break;
                    }
                }
                String priorityauto=priorityautoComplete.getText().toString().trim();
                String descriptionedit=descriptionEditText.getText().toString().trim();
                Intent in =new Intent(getApplicationContext(), SecondAddReclamationEquipement.class);
                in.putExtra("description",descriptionedit);
                in.putExtra("localId",id);
                in.putExtra("priority",priorityauto);
                startActivity(in);
                overridePendingTransition(R.anim.right_slide_in,R.anim.left_slide_out);



            }
        });
    }




    public void listLocals(){
        localService= Apis.getLocalService();
        Call<List<Local>> call=localService.getAll();
        call.enqueue(new Callback<List<Local>>() {
            @Override
            public void onResponse(Call<List<Local>> call, Response<List<Local>> response) {
                if(response.isSuccessful()) {

                    //ChambreAdapteritems = new ArrayAdapter<Local>(getApplicationContext(),R.layout.chambre_list_items, chambreitems);
                    /*for(int i=0;i<response.body().size();i++){
                        chambreList.add(response.body().get(i));
                    }*/

                    localitems=new String[response.body().size()];
                    for(int i=0;i<response.body().size();i++){
                        localitems[i]=String.valueOf(response.body().get(i).getDescription());
                        localidItems.add(response.body().get(i).getId());
                    }

                    LocalAdapteritems=new ArrayAdapter(FirstAddReclamationEquipement.this,R.layout.chambre_list_items,localitems);
                    localautoComplete.setAdapter(LocalAdapteritems);

                    /*chambreautoComplete.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                        @Override
                        public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                            String item = parent.getItemAtPosition(position).toString();
                            *//*Toast.makeText(myfragment.getContext(),"Item: "+item,Toast.LENGTH_SHORT).show();*//*
                        }
                    });*/
                    //chambreList=response.body();

                }
                else{
                    Log.e("error","error");
                }

            }

            @Override
            public void onFailure(Call<List<Local>> call, Throwable t) {
                Log.e("Error:",t.getMessage());
            };

        });

    }

}
package com.example.gmao_mobile.Activities.add.addReclamationSurPanne;

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
import com.example.gmao_mobile.Adapters.AutoCompleteAdapter;
import com.example.gmao_mobile.Modeles.Room;
import com.example.gmao_mobile.R;
import com.example.gmao_mobile.Utils.Apis;
import com.example.gmao_mobile.Utils.services.ChambreService;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.textfield.TextInputEditText;
import com.google.android.material.textfield.TextInputLayout;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class FirstAddReclamationPanne extends AppCompatActivity {

    private static final String LOG_TAG = "tag";

    String[] chambreitems ;
    ArrayList<Long> chambreidItems =new ArrayList<>();
    AutoCompleteTextView chambreautoComplete;
    ArrayAdapter<String> ChambreAdapteritems;
    String[] priorityitems ={"Éleve","Moyenne","Bas"};
    AutoCompleteTextView priorityautoComplete;
    ArrayAdapter<String> priorityAdapteritems;
    AutoCompleteAdapter chambreAdapter;
    ChambreService chambreService;
    //private List<Room> chambreList=new ArrayList<>();
    MaterialButton back,next;
    TextInputLayout description,priority,room_number;
    TextInputEditText descriptionEditText;

    private static final String KEY_DESCRIPTION="description";



    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_first_add_reclamation_panne);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS,WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS);
        descriptionEditText=findViewById(R.id.description);
        description=findViewById(R.id.description_text_input);
        priority=findViewById(R.id.priority_text_input);
        room_number=findViewById(R.id.number_text_input);

        chambreautoComplete = findViewById(R.id.chambre_auto_complete);
        listChambres();
        priorityautoComplete = findViewById(R.id.priority_auto_complete);
        priorityAdapteritems = new ArrayAdapter<String>(this,R.layout.chambre_list_items, priorityitems);
        priorityautoComplete.setAdapter(priorityAdapteritems);
        back=findViewById(R.id.back);
        next=findViewById(R.id.first_next);
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
                for (int i=0;i<chambreitems.length;i++){
                    if(chambreitems[i].equals(chambreautoComplete.getText().toString().trim())){
                        id=chambreidItems.get(i);
                        break;
                    }
                }
                String number=String.valueOf(id);
                String priorityauto=priorityautoComplete.getText().toString().trim();
                String descriptionedit=descriptionEditText.getText().toString().trim();
                Intent in =new Intent(getApplicationContext(), SecondAddReclamationPanne.class);
                in.putExtra("description",descriptionedit);
                in.putExtra("room",number);
                in.putExtra("priority",priorityauto);
                startActivity(in);
                overridePendingTransition(R.anim.right_slide_in,R.anim.left_slide_out);



            }
        });
    }




    public void listChambres(){
        chambreService= Apis.getChambresService();
        Call<List<Room>> call=chambreService.getAll();
        call.enqueue(new Callback<List<Room>>() {
            @Override
            public void onResponse(Call<List<Room>> call, Response<List<Room>> response) {
                if(response.isSuccessful()) {

                    //ChambreAdapteritems = new ArrayAdapter<Room>(getApplicationContext(),R.layout.chambre_list_items, chambreitems);
                    /*for(int i=0;i<response.body().size();i++){
                        chambreList.add(response.body().get(i));
                    }*/

                    chambreitems=new String[response.body().size()];
                    for(int i=0;i<response.body().size();i++){
                        chambreitems[i]=String.valueOf(response.body().get(i).getNumero());
                        chambreidItems.add(response.body().get(i).getId());
                    }

                    ChambreAdapteritems=new ArrayAdapter(FirstAddReclamationPanne.this,R.layout.chambre_list_items,chambreitems);
                    chambreautoComplete.setAdapter(ChambreAdapteritems);

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
            public void onFailure(Call<List<Room>> call, Throwable t) {
                Log.e("Error:",t.getMessage());
            };

        });

    }






    /*if(number.isEmpty() || priorityauto.isEmpty()){
                    if(number.isEmpty())
                    {
                        chambreautoComplete.setError("il faut entrer un numéro du chambre");
                        room_number.setBoxStrokeColor(Color.parseColor("#FF0000"));
                        room_number.setHintTextColor(ColorStateList.valueOf(Color.parseColor("#FF0000")));
                        room_number.requestFocus();
                        return ;
                    }
                    if(priority.getEditText().getText().toString().isEmpty())
                    {
                        priorityautoComplete.setError("il faut entrer une priorite du reclamation");
                        priority.setBoxStrokeColor(Color.parseColor("#FF0000"));
                        priority.setHintTextColor(ColorStateList.valueOf(Color.parseColor("#FF0000")));
                        chambreautoComplete.setError(null);
                        priority.requestFocus();
                        return ;


                    }

                }
                else {
    Bundle bundle = new Bundle();
                bundle.putString("room_number", number);
                bundle.putString("priority", priorityauto);
                bundle.putString("description", descriptionedit);

    //Navigation.findNavController(myfragment).navigate(R.id.action_navigation_first_add_reclamations_pannes_to_navigation_second_add_reclamations_pannes,bundle);*/


}
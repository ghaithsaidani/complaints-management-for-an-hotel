package com.example.gmao_mobile.ui.reclamations.reclamationsequipements;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.fragment.app.Fragment;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.gmao_mobile.Adapters.ReclamationsEquipementsRecyclerViewAdapter;
import com.example.gmao_mobile.Modeles.User;
import com.example.gmao_mobile.Modeles.reclamations.Reclamation;
import com.example.gmao_mobile.Modeles.reclamations.ReclamationSurEquipement;
import com.example.gmao_mobile.R;
import com.example.gmao_mobile.Utils.Apis;
import com.example.gmao_mobile.Utils.services.UsersService;
import com.example.gmao_mobile.linearlayout.WrapContentLinearLayoutManager;
import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ReclamationsEquipementsFragment extends Fragment {

    private View view;
    private UsersService reclamationsService;
    private List<ReclamationSurEquipement> reclamationSurEquipementArrayList=new ArrayList<>();
    private RecyclerView recyclerView;
    ReclamationsEquipementsRecyclerViewAdapter adapter;
    View myfragment;
    SharedPreferences sh;
    String access_token;
    String refresh_token;
    User current_user;


    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        myfragment= inflater.inflate(R.layout.fragment_reclamations_equipements, container, false);
        sh = getActivity().getSharedPreferences("shared", Context.MODE_PRIVATE);

        access_token = sh.getString("access_token", "");
        refresh_token = sh.getString("refresh_token", "");
        Gson gson = new Gson();
        String json = sh.getString("current_user", "");
        current_user = gson.fromJson(json, User.class);
        listReclamationsEquipements();
        return myfragment;
    }

    public void listReclamationsEquipements(){
        reclamationsService= Apis.getUsersService();
        //User user=getActivity().getIntent().getParcelableExtra("current_user");
        //Call<User> call=reclamationsService.getUser(user.getEmail());
        Call<List<ReclamationSurEquipement>> call2=reclamationsService.getUserReclamationsEquipements(current_user.getEmail());

        call2.enqueue(new Callback<List<ReclamationSurEquipement>>() {
            @Override
            public void onResponse(Call<List<ReclamationSurEquipement>> call, Response<List<ReclamationSurEquipement>> response) {
                if(response.isSuccessful()) {

                    reclamationSurEquipementArrayList = response.body();
                    ArrayList<ReclamationSurEquipement> waiting=new ArrayList<>();
                    ArrayList<ReclamationSurEquipement> in_progress=new ArrayList<>();
                    ArrayList<ReclamationSurEquipement> terminated=new ArrayList<>();
                    for(int i=0;i<reclamationSurEquipementArrayList.size();i++){
                        switch (reclamationSurEquipementArrayList.get(i).getAvancement()){
                            case 0:
                                waiting.add(reclamationSurEquipementArrayList.get(i));
                                break;
                            case 1:
                                in_progress.add(reclamationSurEquipementArrayList.get(i));
                                break;
                            case 2:
                                terminated.add(reclamationSurEquipementArrayList.get(i));
                                break;
                        }
                    }
                    Collections.sort(waiting, Reclamation.BY_Date);
                    Collections.sort(in_progress, Reclamation.BY_Date);
                    Collections.sort(terminated, Reclamation.BY_Date);
                    reclamationSurEquipementArrayList.clear();
                    reclamationSurEquipementArrayList.addAll(waiting);
                    reclamationSurEquipementArrayList.addAll(in_progress);
                    reclamationSurEquipementArrayList.addAll(terminated);
                    recyclerView=myfragment.findViewById(R.id.reclamations_locaux_recyclerview);
                    recyclerView.setLayoutManager(new WrapContentLinearLayoutManager(myfragment.getContext(), LinearLayoutManager.VERTICAL,false));
                    adapter=new ReclamationsEquipementsRecyclerViewAdapter(reclamationSurEquipementArrayList);
                    recyclerView.setAdapter(adapter);

                }
                else{
                    Log.e("error","error");
                }
            }

            @Override
            public void onFailure(Call<List<ReclamationSurEquipement>> call, Throwable t) {
                Log.e("Error:",t.getMessage());
            }
        });
    }
}
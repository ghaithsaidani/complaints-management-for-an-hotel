package com.example.gmao_mobile.ui.reclamations.reclamationspannes;

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

import com.example.gmao_mobile.Adapters.ReclamationsPannesRecyclerViewAdapter;
import com.example.gmao_mobile.Modeles.User;
import com.example.gmao_mobile.Modeles.reclamations.Reclamation;
import com.example.gmao_mobile.Modeles.reclamations.ReclamationSurTypePanne;
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

public class ReclamationsPannesFragment extends Fragment {

    private View view;
    private UsersService reclamationsService;
    private List<ReclamationSurTypePanne> reclamationSurTypePanneArrayList=new ArrayList<>();
    private RecyclerView recyclerView;
    ReclamationsPannesRecyclerViewAdapter adapter;
    View myfragment;
    SharedPreferences sh;
    String access_token;
    String refresh_token;
    User current_user;


    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        myfragment= inflater.inflate(R.layout.fragment_reclamations_pannes, container, false);
        sh = getActivity().getSharedPreferences("shared", Context.MODE_PRIVATE);
        access_token = sh.getString("access_token", "");
        refresh_token = sh.getString("refresh_token", "");
        Gson gson = new Gson();
        String json = sh.getString("current_user", "");
        current_user = gson.fromJson(json, User.class);
        this.listReclamationsPannes();


        return myfragment;
    }



    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }



    public void listReclamationsPannes(){
        reclamationsService= Apis.getUsersService();
        //User user=getActivity().getIntent().getParcelableExtra("current_user");
        //Call<User> call=reclamationsService.getUser(user.getEmail());
        Call<List<ReclamationSurTypePanne>> call=reclamationsService.getUserReclamationsPannes(current_user.getEmail());

        call.enqueue(new Callback<List<ReclamationSurTypePanne>>() {
            @Override
            public void onResponse(Call<List<ReclamationSurTypePanne>> call, Response<List<ReclamationSurTypePanne>> response) {
                if(response.isSuccessful()) {
                    reclamationSurTypePanneArrayList = response.body();
                    ArrayList<ReclamationSurTypePanne> waiting=new ArrayList<>();
                    ArrayList<ReclamationSurTypePanne> in_progress=new ArrayList<>();
                    ArrayList<ReclamationSurTypePanne> terminated=new ArrayList<>();
                    for(int i=0;i<reclamationSurTypePanneArrayList.size();i++){
                        switch (reclamationSurTypePanneArrayList.get(i).getAvancement()){
                            case 0:
                                waiting.add(reclamationSurTypePanneArrayList.get(i));
                                break;
                            case 1:
                                in_progress.add(reclamationSurTypePanneArrayList.get(i));
                                break;
                            case 2:
                                terminated.add(reclamationSurTypePanneArrayList.get(i));
                                break;
                        }
                    }
                    Collections.sort(waiting, Reclamation.BY_Date);
                    Collections.sort(in_progress, Reclamation.BY_Date);
                    Collections.sort(terminated, Reclamation.BY_Date);
                    reclamationSurTypePanneArrayList.clear();
                    reclamationSurTypePanneArrayList.addAll(waiting);
                    reclamationSurTypePanneArrayList.addAll(in_progress);
                    reclamationSurTypePanneArrayList.addAll(terminated);
                    recyclerView=myfragment.findViewById(R.id.reclamations_chambres_recyclerview);
                    recyclerView.setLayoutManager(new WrapContentLinearLayoutManager(myfragment.getContext(), LinearLayoutManager.VERTICAL,false));
                    adapter=new ReclamationsPannesRecyclerViewAdapter(reclamationSurTypePanneArrayList);
                    recyclerView.setAdapter(adapter);




                }
                else{
                    Log.e("error","error");
                }
            }

            @Override
            public void onFailure(Call<List<ReclamationSurTypePanne>> call, Throwable t) {
                Log.e("Error:",t.getMessage());
            }
        });
    }
}
package com.example.gmao_mobile.Activities;

import androidx.appcompat.app.AppCompatActivity;
import androidx.navigation.Navigation;
import androidx.viewpager.widget.ViewPager;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.view.WindowManager;

import com.example.gmao_mobile.Activities.add.addReclamationSurEquipement.FirstAddReclamationEquipement;
import com.example.gmao_mobile.Activities.add.addReclamationSurPanne.FirstAddReclamationPanne;
import com.example.gmao_mobile.Adapters.SectionPagerAdapter;
import com.example.gmao_mobile.Modeles.User;
import com.example.gmao_mobile.R;
import com.example.gmao_mobile.ui.reclamations.reclamationsequipements.ReclamationsEquipementsFragment;
import com.example.gmao_mobile.ui.reclamations.reclamationspannes.ReclamationsPannesFragment;
import com.getbase.floatingactionbutton.FloatingActionButton;
import com.getbase.floatingactionbutton.FloatingActionsMenu;
import com.google.android.material.snackbar.Snackbar;
import com.google.android.material.tabs.TabLayout;
import com.google.gson.Gson;

public class ReclamationsActivity extends AppCompatActivity {

    //private View view;
    ViewPager viewPager;
    TabLayout tabLayout;
    ReclamationsEquipementsFragment reclamationsEquipementsFragment;
    ReclamationsPannesFragment reclamationsPannesFragment;
    FloatingActionButton add_panne_reclamation;
    FloatingActionButton add_equipement_reclamation;
    FloatingActionsMenu menu;





    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_reclamations);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS,WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS);
        /*view=getWindow().getDecorView();
        view.setOnSystemUiVisibilityChangeListener(new View.OnSystemUiVisibilityChangeListener(){
            @Override
            public void onSystemUiVisibilityChange(int visibility) {
                if(visibility == 0){
                    view.setSystemUiVisibility(hideSystemBars());
                }
            }


        });*/



        viewPager = findViewById(R.id.view_pager);
        tabLayout = findViewById(R.id.tab_layout);
        add_equipement_reclamation=findViewById(R.id.add_equipement_reclamation);
        add_panne_reclamation=findViewById(R.id.add_panne_reclamation);
        menu=findViewById(R.id.add_menu);
        setUpViewPager(viewPager);
        tabLayout.setupWithViewPager(viewPager);

        tabLayout.addOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
            @Override
            public void onTabSelected(TabLayout.Tab tab) {
                switch(tab.getPosition()) {
                    case 0:
                        reclamationsEquipementsFragment.onCreate(savedInstanceState);

                    case 1:
                        reclamationsPannesFragment.onCreate(savedInstanceState);
                        /*Snackbar.make(viewPager,"Reclamation Ajouté avec succés",Snackbar.LENGTH_LONG).show();*/
                }
            }

            @Override
            public void onTabUnselected(TabLayout.Tab tab) {
            }

            @Override
            public void onTabReselected(TabLayout.Tab tab) {

            }
        });

        add_panne_reclamation.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {


                //getSupportFragmentManager().beginTransaction().setCustomAnimations();


                Intent i =new Intent(getApplicationContext(), FirstAddReclamationPanne.class);
                startActivity(i);
                overridePendingTransition(R.anim.right_slide_in,R.anim.left_slide_out);
                menu.collapse();

                //Navigation.findNavController(myFragment).navigate(R.id.action_navigation_reclamations_to_navigation_first_add_reclamations_pannes);
            }
        });

        add_equipement_reclamation.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                menu.collapse();
                Intent i =new Intent(getApplicationContext(), FirstAddReclamationEquipement.class);
                startActivity(i);
                overridePendingTransition(R.anim.right_slide_in,R.anim.left_slide_out);

            }
        });
    }




    private void setUpViewPager(ViewPager viewpager) {
        SectionPagerAdapter adapter=new SectionPagerAdapter(getSupportFragmentManager());
        adapter.addFragment(new ReclamationsEquipementsFragment(),"Reclamations Locaux");
        adapter.addFragment(new ReclamationsPannesFragment(),"Reclamations chambres");
        reclamationsEquipementsFragment= (ReclamationsEquipementsFragment) adapter.getItem(0);
        reclamationsPannesFragment =(ReclamationsPannesFragment) adapter.getItem(1);
        viewPager.setAdapter(adapter);

    }


    /*@Override
    public void onWindowFocusChanged(boolean hasFocus){
        super.onWindowFocusChanged(hasFocus);
        if(hasFocus){
            view.setSystemUiVisibility(hideSystemBars());
        }
    }

    private int hideSystemBars(){
        return View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_FULLSCREEN
                | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION;
    }*/
}
package com.example.gmao_mobile.Activities;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.swiperefreshlayout.widget.CircularProgressDrawable;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;
import android.os.Bundle;
import android.os.Parcelable;
import android.util.Log;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.ListView;
import android.widget.Toast;

import com.example.gmao_mobile.Modeles.Token;
import com.example.gmao_mobile.Modeles.User;
import com.example.gmao_mobile.R;
import com.example.gmao_mobile.Utils.Apis;
import com.example.gmao_mobile.Utils.services.UsersService;
import com.google.android.material.progressindicator.CircularProgressIndicator;
import com.google.android.material.textfield.TextInputEditText;
import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginActivity extends AppCompatActivity {

    //TextView textView;
    Button submit;
    TextInputEditText emailInput;
    TextInputEditText passwordInput;

    UsersService usersService;
    List<User> listUsers=new ArrayList<>();
    ListView listView;
    Token token;
    CircularProgressIndicator circularProgress;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS,WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS);
        setContentView(R.layout.activity_login);
        //textView=findViewById(R.id.textView);
        circularProgress=findViewById(R.id.wait_login);
        circularProgress.hide();
        submit=findViewById(R.id.SubmitButton);
        emailInput=findViewById(R.id.emailTextFieldLogin);
        passwordInput=findViewById(R.id.PasswordTextFieldLogin);
        submit.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                login();

            }
        });


    }


    public void login(){
        usersService= Apis.Login();
        circularProgress.show();
        Call<Token> call=usersService.login(emailInput.getText().toString(),passwordInput.getText().toString());
        SharedPreferences sharedpreferences = getSharedPreferences("shared",Context.MODE_PRIVATE);
        call.enqueue(new Callback<Token>() {
            @Override
            public void onResponse(Call<Token> call, Response<Token> response) {
                if(response.isSuccessful()) {


                    token = response.body();
                    usersService= Apis.getUsersService();
                    //Log.e("token",token.getAccess_token());
                    Call<List<User>> call3=usersService.getAll("Bearer "+token.getAccess_token());

                    usersService= Apis.getUsersService();
                    Call<User> call2=usersService.getUser(emailInput.getText().toString());

                    call2.enqueue(new Callback<User>() {

                        @Override
                        public void onResponse(Call<User> call, Response<User> response) {
                            if(response.isSuccessful()) {


                                User user = response.body();
                                if(user.getFonction().equals("GOUVERNANTE")){
                                    Intent i=new Intent(LoginActivity.this,ReclamationsActivity.class);
                                    /*i.putExtra("access_token",token.getAccess_token());
                                    i.putExtra("refresh_token",token.getRefresh_token());
                                    i.putExtra("current_user", response.body());*/
                                    SharedPreferences.Editor editor = sharedpreferences.edit();
                                    editor.putString("access_token", token.getAccess_token());
                                    editor.putString("refresh_token", token.getRefresh_token());
                                    Gson gson = new Gson();
                                    String json = gson.toJson(response.body());
                                    editor.putString("current_user", json);
                                    editor.apply();
                                    startActivity(i);
                                    overridePendingTransition(R.anim.top_slide_in,R.anim.bottom_slide_out);
                                    circularProgress.hide();
                                }
                                else{
                                    circularProgress.hide();
                                    Toast.makeText(LoginActivity.this,"ce n'est pas un compte d'une gouvernante",Toast.LENGTH_SHORT).show();
                                }




                                //textView.setText(String.valueOf(listUsers.size()));
                                //Log.e("List size",String.valueOf(listUsers.size()));
                                //listView.setAdapter(new PersonaAdapter(MainActivity.this,R.layout.content_main,listPersona));
                            }
                            else{
                                circularProgress.hide();
                                Toast.makeText(LoginActivity.this,"Username failed",Toast.LENGTH_SHORT).show();
                            }
                        }

                        @Override
                        public void onFailure(Call<User> call, Throwable t) {
                            circularProgress.hide();
                            Log.e("Error:",t.getMessage());
                        }
                    });

                    //textView.setText(String.valueOf(listUsers.size()));
                    //Log.e("List size",String.valueOf(listUsers.size()));
                    //listView.setAdapter(new PersonaAdapter(MainActivity.this,R.layout.content_main,listPersona));
                }
                else{
                    Toast.makeText(LoginActivity.this,"failed",Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<Token> call, Throwable t) {
                Log.e("Error:",t.getMessage());
            }
        });


    }

    public void listUsers(){
        usersService= Apis.getUsersService();
        //Log.e("token",token.getAccess_token());
        Call<List<User>>call=usersService.getAll(token.getAccess_token());
        //OkHttpClient.Builder httpClient = new OkHttpClient.Builder();
        /*httpClient.addInterceptor(new Interceptor() {
                                      @Override
                                      public okhttp3.Response intercept(Chain chain) throws IOException {
                                          Request original = chain.request();

                                          Request request = original.newBuilder()
                                                  .header("Authorization", "Bearer "+token.getAccess_token())
                                                  .method(original.method(), original.body())
                                                  .build();

                                          return chain.proceed(request);
                                      }
                                  });*/

        call.enqueue(new Callback<List<User>>() {
            @Override
            public void onResponse(Call<List<User>> call, Response<List<User>> response) {
                if(response.isSuccessful()) {
                    listUsers = response.body();
                    Toast.makeText(LoginActivity.this,"Success",Toast.LENGTH_SHORT).show();
                    //textView.setText(String.valueOf(listUsers.size()));
                    Log.e("List size",String.valueOf(listUsers.size()));
                    //listView.setAdapter(new PersonaAdapter(MainActivity.this,R.layout.content_main,listPersona));
                }
            }

            @Override
            public void onFailure(Call<List<User>> call, Throwable t) {
                Log.e("Error:",t.getMessage());
            }
        });
    }








}
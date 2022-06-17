package com.example.gmao_mobile.Utils;

import com.example.gmao_mobile.Utils.services.ChambreService;
import com.example.gmao_mobile.Utils.services.LocalService;
import com.example.gmao_mobile.Utils.services.PanneService;
import com.example.gmao_mobile.Utils.services.ReclamationsService;
import com.example.gmao_mobile.Utils.services.UsersService;

public class Apis {

    public static final String URL_000="http://192.168.235.96:8080/";
    public static final String URL_001="http://192.168.235.96:8080/users/";
    public static final String URL_002="http://192.168.235.96:8080/reclamations/";
    public static final String URL_003="http://192.168.235.96:8080/equipements/";
    public static final String URL_004="http://192.168.235.96:8080/chambres/";
    public static final String URL_005="http://192.168.235.96:8080/pannes/";
    public static final String URL_006="http://192.168.235.96:8080/locaux/";

    public static UsersService Login(){
        return  Client.getClient(URL_000).create(UsersService.class);
    }
    public static UsersService getUsersService(){
        return  Client.getClient(URL_001).create(UsersService.class);
    }
    public static ReclamationsService getReclamationssService(){
        return  Client.getClient(URL_002).create(ReclamationsService.class);
    }

    public static ChambreService getChambresService(){
        return  Client.getClient(URL_004).create(ChambreService.class);
    }

    public static PanneService getPanneService(){
        return  Client.getClient(URL_005).create(PanneService.class);
    }

    public static LocalService getLocalService(){
        return  Client.getClient(URL_006).create(LocalService.class);
    }
}

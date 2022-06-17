package com.example.gmaoapp;
import com.example.gmaoapp.models.Role;
import com.example.gmaoapp.models.User;
import com.example.gmaoapp.services.EquipementService;
import com.example.gmaoapp.services.ReclamationService;
import com.example.gmaoapp.services.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;


@SpringBootApplication
@RestController
public class GMAOApplication {


	public static void main(String[] args) {
		SpringApplication.run(GMAOApplication.class, args);
	}

	/*@Bean
	CommandLineRunner run(UserService userService, ReclamationService reclamationService, EquipementService equipementService) {
		return args -> {
		*//*userService.saveRole(new Role(null, "ADMINISTRATEUR"));
			userService.saveRole(new Role(null, "UTILISATEUR"));
			userService.saveRole(new Role(null, "GOUVERNANTE"));*//*
			//reclamationService.savelocal(new Local(null, "Bloc A", "hello", new ArrayList<>()));
			//reclamationService.saveRoom(new Room(null, 25, new ArrayList<>()));
			//intervenantService.ajouterIntervenant(new Intervenant(null,"ghaith","saidani",56439910L,"Plombier",true));

			//equipementService.saveEquipement(new Equipement(null, "Climatiseur centrale", "climatiseur", 200L, "bloc B", LocalDate.now(), LocalDate.now(), 6));
			//equipementService.saveEquipement(new Equipement(null, "Laveuse Essoreuse A Chargement Frontal Professionnelle", "Laveuse Essoreuse ", 250L, "Bloc A", LocalDate.now(), LocalDate.now(), 7));
			//equipementService.saveEquipement(new Equipement(null, "Sèche Ligne Professionnel", "Sèche Ligne ", 300L, "Bloc c", LocalDate.now(), LocalDate.now(), 8));
			//reclamationService.saveTypePanne(new TypePanne(null, "Ampoule grillée"));
			//reclamationService.addEquipementortypePannetoReclamation(1L,1L);

			userService.saveUser(new User(null, "ghassen", "jebari",  "jebarighassen1@gmail.com", "root", 56439910L, new ArrayList<>(),null, new ArrayList<>()));
			userService.saveUser(new User(null, "ghaith", "saidani",  "ghaithsaidani18@gmail.com", "root", 56439911L, new ArrayList<>(),null, new ArrayList<>()));
			userService.saveUser(new User(null, "kamel", "saidani",  "kamelsaidani046@gmail.com", "root", 56439912L, new ArrayList<>(),null, new ArrayList<>()));
			userService.saveUser(new User(null, "ahlem", "ben abdallah",  "gouvernante@gmail.com", "root", 56439913L, new ArrayList<>(),null, new ArrayList<>()));
			userService.addRoletoUser("jebarighassen1@gmail.com", "ADMINISTRATEUR");
			userService.addRoletoUser("kamelsaidani046@gmail.com", "UTILISATEUR");
			userService.addRoletoUser("ghaithsaidani18@gmail.com", "ADMINISTRATEUR");
			userService.addRoletoUser("gouvernante@gmail.com", "GOUVERNANTE");
			//userService.addRoletoUser("moh.saidani@gmail.com","UTILISATEUR");
		};
	}*/


}




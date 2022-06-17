package com.example.gmaoapp.services;

import com.example.gmaoapp.exception.UserDesactivatedException;
import com.example.gmaoapp.models.Image;
import com.example.gmaoapp.models.Role;
import com.example.gmaoapp.models.User;

import com.example.gmaoapp.models.ot.OT;
import com.example.gmaoapp.models.reclamations.Reclamation;
import com.example.gmaoapp.models.reclamations.ReclamationSurEquipement;
import com.example.gmaoapp.models.reclamations.ReclamationSurTypePanne;
import com.example.gmaoapp.repository.ImageRepository;
import com.example.gmaoapp.repository.RoleRepository;
import com.example.gmaoapp.repository.UserRepository;
import com.example.gmaoapp.repository.reclamationsRepositories.ReclamationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.repository.query.Param;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;


@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserService{

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ReclamationRepository reclamationRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ImageRepository imageRepository;

    private Path foundFile;

    /*public Image saveImage(MultipartFile file) throws Exception {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        try {
            if(fileName.contains("..")) {
                throw  new Exception("Filename contains invalid path sequence "
                        + fileName);
            }

            Image attachment
                    = new Image(fileName,
                    file.getContentType(),
                    file.getBytes());
            return imageRepository.save(attachment);

        } catch (Exception e) {
            throw new Exception("Could not save File: " + fileName);
        }
    }


    public Resource getFileAsResource(String fileCode) throws IOException {
        Path dirPath = Paths.get("Files-Upload");

        Files.list(dirPath).forEach(file -> {
            if (file.getFileName().toString().startsWith(fileCode)) {
                foundFile = file;
                return;
            }
        });

        if (foundFile != null) {
            return new UrlResource(foundFile.toUri());
        }

        return null;
    }*/



    /*@Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException{
        User user=userRepository.findUserByEmail(email);
        if(user == null){
            throw new UsernameNotFoundException("User not found");
        }
        Collection<SimpleGrantedAuthority> authorities=new ArrayList<>();
        user.getRoles().forEach(role ->
        {authorities.add(new SimpleGrantedAuthority(role.getName()));
        });
        return new org.springframework.security.core.userdetails.User(user.getEmail(),user.getPassword(),authorities);
    }*/

    public User saveUser(User user){
        log.info("saving {} to the database",user.getName());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    /*public User store(MultipartFile file,long id) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        User user=findById(id);
        user.setImage(file.getContentType());
        return fileDBRepository.save(FileDB);
    }*/



    public Role saveRole(Role role){
        log.info("saving {} to the database",role.getName());
        return roleRepository.save(role);
    }

    public List<Role> getRoles(){
        return roleRepository.findAll();
    }

    public int enableUser(Long id) {
        return userRepository.enableUser(id);
    }

    public int disableUser(Long id) {
        return userRepository.disableUser(id);
    }

    public void addRoletoUser(String email,String roleName){

        User user=userRepository.findUserByEmail(email);
        Role role=roleRepository.findRoleByName(roleName);
        log.info("adding role {} to user {}",role.getName(),user.getName());

        user.getRoles().add(role);
        user.setFonction(role.getName());
    }

    /*public void addImagetoUser(String email,String imageId){
        User user=userRepository.findUserByEmail(email);
        Image image=imageRepository.findById(imageId).get();
        user.setImage(image);
    }*/

    public Reclamation addReclamationtoUser(String email,Long reclamationId){

        User user=userRepository.findUserByEmail(email);
        Reclamation reclamation=reclamationRepository.findById(reclamationId).get();
        reclamation.setNom_reclameur(user.getName()+" "+user.getPrename());
        user.getReclmations().add(reclamation);

        return reclamationRepository.save(reclamation);
    }


    public List<ReclamationSurTypePanne> getUserReclamationsPannes(String email){
        User user=userRepository.findUserByEmail(email);
        List<ReclamationSurTypePanne> reclamationSurTypePannes=new ArrayList<>();
        for (int i=0;i<user.getReclmations().size();i++){
            if(user.getReclmations().get(i) instanceof ReclamationSurTypePanne){
                reclamationSurTypePannes.add((ReclamationSurTypePanne) user.getReclmations().get(i));
            }
        }
        return reclamationSurTypePannes;
    }

    public List<ReclamationSurEquipement> getUserReclamationsEquipements(String email){
        User user=userRepository.findUserByEmail(email);
        List<ReclamationSurEquipement> reclamationSurEquipements=new ArrayList<>();
        for (int i=0;i<user.getReclmations().size();i++){
            if(user.getReclmations().get(i) instanceof ReclamationSurEquipement){
                reclamationSurEquipements.add((ReclamationSurEquipement) user.getReclmations().get(i));
            }
        }
        return reclamationSurEquipements;
    }



    public User getUser(String email) throws UserDesactivatedException{
        return userRepository.findUserByEmail(email);

    }

    public List<User> getUsers(){
        return userRepository.getAllOrderedByDate();
    }

    public List<Object> nb_reclamations_group_by_user(){
        return userRepository.nb_reclamations_group_by_user();
    }



    public User updateUser(User user){
        user.setUpdatedAt(new Date());
        return userRepository.save(user);
    }


    public User findById(Long id){
        return userRepository.findById(id).get();
    }



    public Object get_count_user(long id){
        return userRepository.nb_reclamations_user(id);
    }

    public List<User> getActive(){
        return userRepository.getActive();
    }



    public String saveFile(String fileName, MultipartFile multipartFile)
            throws IOException {
        Path uploadPath = Paths.get("Files-Upload");

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String fileCode = RandomStringUtils.randomAlphanumeric(8);

        try (InputStream inputStream = multipartFile.getInputStream()) {
            Path filePath = uploadPath.resolve(fileCode + "-" + fileName);
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException ioe) {
            throw new IOException("Could not save file: " + fileName, ioe);
        }

        return fileCode;
    }






}

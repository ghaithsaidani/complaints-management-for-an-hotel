package com.example.gmaoapp.controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.gmaoapp.models.Role;
import com.example.gmaoapp.models.User;
import com.example.gmaoapp.models.forms.EmailtoIDForm;
import com.example.gmaoapp.models.forms.EmailtoNameForm;
import com.example.gmaoapp.models.reclamations.Reclamation;
import com.example.gmaoapp.models.reclamations.ReclamationSurEquipement;
import com.example.gmaoapp.models.reclamations.ReclamationSurTypePanne;
import com.example.gmaoapp.services.UserService;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.*;
import java.util.stream.Collectors;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(path="/users")

public class UserController {

    private final UserService userService;


    @PostMapping(value = "/user/save")
    public ResponseEntity<User> addUser(@RequestBody User user) {

        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/users/user/save").toUriString());
        return ResponseEntity.created(uri).body(userService.saveUser(user));
    }

    @PostMapping(value = "/role/save")
    public ResponseEntity<Role> addRole(@RequestBody Role role) {

        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/users/role/save").toUriString());
        return ResponseEntity.created(uri).body(userService.saveRole(role));
    }


    @PostMapping(value = "/role/addtouser")
    public ResponseEntity<?> addRoleToUser(@RequestBody EmailtoNameForm form) {
        userService.addRoletoUser(form.getEmail(), form.getName());
        return ResponseEntity.ok().build();
    }

    /*@PostMapping(value = "/image/addtouser")
    public ResponseEntity<?> addImageToUser(@RequestBody EmailtoImageIDForm form) {
        userService.addImagetoUser(form.getEmail(), form.getImageId());
        return ResponseEntity.ok().build();
    }*/

    @PostMapping(value = "/reclamation/addtouser")
    public ResponseEntity<Reclamation> addReclamationToUser(@RequestBody EmailtoIDForm form) {
        return ResponseEntity.ok().body(userService.addReclamationtoUser(form.getEmail(), form.getId()));
    }


    @GetMapping(value = "/all")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok().body(userService.getUsers());
    }

    @GetMapping(value = "/active")
    public ResponseEntity<List<User>> getActive() {
        return ResponseEntity.ok().body(userService.getActive());
    }
    @GetMapping(value = "/reclamationscount")
    public ResponseEntity<Object> getUserReclamationsCount(@Param("id") long id) {
        return ResponseEntity.ok().body(userService.get_count_user(id));
    }

    @GetMapping(value = "/nbreclamations")
    public ResponseEntity<List<Object>> getNb_Reclamations_Group_By_User() {
        return ResponseEntity.ok().body(userService.nb_reclamations_group_by_user());
    }

    @GetMapping(value = "/roles")
    public ResponseEntity<List<Role>> getRoles() {

        return ResponseEntity.ok().body(userService.getRoles());
    }

    @GetMapping(value = "/token/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            try {
                String refresh_token = authorizationHeader.substring("Bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refresh_token);
                String email = decodedJWT.getSubject();
                User user = userService.getUser(email);

                String access_token = JWT.create().withSubject(user.getEmail())
                        .withExpiresAt(new Date(System.currentTimeMillis() + 1000 * 60 * 1000))
                        .withIssuer((request.getRequestURL().toString()))
                        .withClaim("roles", user.getRoles().stream().map(Role::getName).collect(Collectors.toList()))
                        .sign(algorithm);


                Map<String, String> tokens = new HashMap<>();
                tokens.put("access_token", access_token);
                tokens.put("refresh_token", refresh_token);
                //tokenService.refreshToken(new Token(tokenService.getLastToken().getId(), access_token,refresh_token));
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), tokens);


            } catch (Exception e) {
                log.error("Error logging in: {}", e.getMessage());
                response.setHeader("error", e.getMessage());
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                //response.sendError(HttpClientErrorException.Forbidden.v);
                Map<String, String> error = new HashMap<>();
                error.put("error_message", e.getMessage());

                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), error);
            }
        } else {
            throw new RuntimeException("Refresh token is missing");
        }
    }

    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@RequestBody User user) {

        return new ResponseEntity<>(userService.updateUser(user), HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<User> findUser(@PathVariable("id") Long id) {
        return new ResponseEntity<>(userService.findById(id), HttpStatus.OK);
    }

    @GetMapping("/getuser/{email}")
    public ResponseEntity<User> getUser(@PathVariable("email") String email){
        if(userService.getUser(email)==null){
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(userService.getUser(email),HttpStatus.OK);
    }

    @GetMapping("/getuserreclamations/pannes/{email}")
    public ResponseEntity<List<ReclamationSurTypePanne>> getUserReclamationsPannes(@PathVariable("email") String email) {
        return new ResponseEntity<>(userService.getUserReclamationsPannes(email), HttpStatus.OK);
    }

    @GetMapping("/getuserreclamations/equipements/{email}")
    public ResponseEntity<List<ReclamationSurEquipement>> getUserReclamationsEquipements(@PathVariable("email") String email) {
        return new ResponseEntity<>(userService.getUserReclamationsEquipements(email), HttpStatus.OK);
    }

    @PutMapping("/user/activate/{id}")
    public ResponseEntity<?> ActivateUser(@PathVariable("id") Long id) {
        return new ResponseEntity<>(userService.enableUser(id), HttpStatus.OK);
    }

    @PutMapping("/user/desactivate/{id}")
    public ResponseEntity<?> DesactivateUser(@PathVariable("id") Long id) {
        return new ResponseEntity<>(userService.disableUser(id), HttpStatus.OK);
    }


    @PostMapping("/uploadFile")
    public ResponseEntity<ResponseData> uploadFile(
            @RequestParam("file") MultipartFile multipartFile)
            throws IOException {

        String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
        long size = multipartFile.getSize();


        String filecode = userService.saveFile(fileName, multipartFile);

        ResponseData response = new ResponseData();
        response.setId(filecode);
        response.setFileName(fileName);
        response.setFileSize(size);
        response.setDownloadURL("/downloadFile/" + filecode);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

   /*@GetMapping("/downloadFile/{fileCode}")
    public ResponseEntity<?> downloadFile(@PathVariable("fileCode") String fileCode) {
        UserService downloadUtil = new UserService();

        Resource resource = null;
        try {
            resource = downloadUtil.getFileAsResource(fileCode);
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }

        if (resource == null) {
            return new ResponseEntity<>("File not found", HttpStatus.NOT_FOUND);
        }

        String contentType = "application/octet-stream";
        String headerValue = "attachment; filename=\"" + resource.getFilename() + "\"";

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, headerValue)
                .body(resource);
    }*/

    @Value("${uploadDir}")
    private String uploadFolder;



    /*@PostMapping("/image/saveImageDetails/{userId}")
    public @ResponseBody ResponseEntity<?> createProduct( Model model, HttpServletRequest request
            , final @RequestParam("image") MultipartFile file,@PathVariable("userId") long userId) {
        try {
            //String uploadDirectory = System.getProperty("user.dir") + uploadFolder;
            String uploadDirectory = request.getServletContext().getRealPath(uploadFolder);
            log.info("uploadDirectory:: " + uploadDirectory);
            String fileName = file.getOriginalFilename();
            String filePath = Paths.get(uploadDirectory, fileName).toString();
            log.info("FileName: " + file.getOriginalFilename());
            if (fileName == null || fileName.contains("..")) {
                model.addAttribute("invalid", "Sorry! Filename contains invalid path sequence \" + fileName");
                return new ResponseEntity<>("Sorry! Filename contains invalid path sequence " + fileName, HttpStatus.BAD_REQUEST);
            }
            try {
                File dir = new File(uploadDirectory);
                if (!dir.exists()) {
                    log.info("Folder Created");
                    dir.mkdirs();
                }
                // Save the file locally
                BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File(filePath)));
                stream.write(file.getBytes());
                stream.close();
            } catch (Exception e) {
                log.info("in catch");
                e.printStackTrace();
            }
            byte[] imageData = file.getBytes();
            User user =userService.findById(userId);
            //user.setPassword("root");
            user.setImage(imageData);
            userService.saveUser(user);
            return new ResponseEntity<>("Product Saved With File - " + fileName, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            log.info("Exception: " + e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/getImage/{id}")
    @ResponseBody
    void showImage(@PathVariable("id") Long id, HttpServletResponse response)
            throws ServletException, IOException {
        log.info("Id :: " + id);
        User user = userService.findById(id);
        response.setContentType("image/jpeg");
        response.setContentType("image/jpg");
        response.setContentType("image/png");
        response.setContentType("image/gif");
        response.getOutputStream().write(user.getImage());
        response.getOutputStream().close();
    }*/

    /*@PostMapping("/uploadFile/{userId}")
    public ResponseEntity<User> uploadFile(
            @RequestParam("file") MultipartFile multipartFile,@PathVariable("userId") long userId)
            throws IOException {

        String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
        long size = multipartFile.getSize();


        String filecode = userService.saveFile(fileName, multipartFile);

        User user=userService.findById(userId);
        user.setImage(filecode);
        userService.saveUser(user);

        String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
        long size = multipartFile.getSize();


        String filecode = userService.saveFile(fileName, multipartFile);

        ResponseData response = new ResponseData();
        response.setId(filecode);
        response.setFileName(fileName);
        response.setFileSize(size);
        response.setDownloadURL("/downloadFile/" + filecode);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }*/

    /*@GetMapping("/downloadFile/{userId}")
    public ResponseEntity<?> downloadFile(@PathVariable("userId") long userId) {
        UserService downloadUtil = new UserService();
        User user=userService.findById(userId);
        Resource resource = null;
        try {
            resource = downloadUtil.getFileAsResource(user.getImage());
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }

        if (resource == null) {
            return new ResponseEntity<>("File not found", HttpStatus.NOT_FOUND);
        }

        String contentType = "application/octet-stream";
        String headerValue = "attachment; filename=\"" + resource.getFilename() + "\"";

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, headerValue)
                .body(resource);
    }*/


    /*@PostMapping("/upload/{id}")
    public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file,@PathVariable("id") long id) {
        String message = "";
        try {
            userService.store(file,id);
            message = "Uploaded the file successfully: " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }
    }*/


    /*@GetMapping("/files/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable("id") long id) {
        User user = userService.findById(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + user.getImage() + "\"")
                .body(user.getImage());
    }*/
}




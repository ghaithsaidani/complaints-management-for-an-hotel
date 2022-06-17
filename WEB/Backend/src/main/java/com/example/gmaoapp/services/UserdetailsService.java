package com.example.gmaoapp.services;

import com.example.gmaoapp.models.Role;
import com.example.gmaoapp.models.User;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;


@Service
@Slf4j
public class UserdetailsService implements UserDetailsService {

    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user=userService.getUser(email);
        if(user == null){
            throw new UsernameNotFoundException("User not found");
        }
        Collection<GrantedAuthority> authorities = getUserAuthority(user.getRoles());
        return buildUserForAuthentication(user, authorities);
    }

    private Collection<GrantedAuthority> getUserAuthority(Collection<Role> userRoles) {
        Collection<GrantedAuthority> roles = new ArrayList<>();
        for (Role role : userRoles) {
            roles.add(new SimpleGrantedAuthority(role.getName()));
        }

        return new ArrayList<>(roles);
    }

    private UserDetails buildUserForAuthentication(User user, Collection<GrantedAuthority> authorities) {
        log.info(user.getPassword());
        log.info(user.getEmail());
        log.info(String.valueOf(user.getEtat()));
        log.info(String.valueOf(authorities.size()));
        log.info(user.getFonction());
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
                user.getEtat(),true, true, true, authorities);
    }
}

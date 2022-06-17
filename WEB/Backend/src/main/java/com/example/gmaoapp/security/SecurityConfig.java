package com.example.gmaoapp.security;


import com.example.gmaoapp.filter.CustomAuthFilter;
import com.example.gmaoapp.filter.CustomAuthorizationFilter;
import com.example.gmaoapp.services.UserdetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import javax.annotation.Resource;
import java.util.Arrays;

import static org.springframework.http.HttpMethod.*;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(
        prePostEnabled = true,
        securedEnabled = true,
        jsr250Enabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {


    private final UserdetailsService userDetailsService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);

    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        CustomAuthFilter customAuthFilter=new CustomAuthFilter(this.authenticationManagerBean());
        customAuthFilter.setFilterProcessesUrl("/login");
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(STATELESS);
        http

                .authorizeRequests()
                    .antMatchers("/login/**","/users/token/refresh/**").permitAll()
                    //.antMatchers(GET,"/users/all/**").hasAuthority("ADMINISTRATEUR")
                    .antMatchers(GET,"/users/find/**").hasAuthority("ADMINISTRATEUR")
                    .antMatchers(PUT,"/users/update/**").hasAuthority("ADMINISTRATEUR")
                    .antMatchers(POST,"/users/user/save/**").hasAuthority("ADMINISTRATEUR")
                    .antMatchers(GET,"/users/roles/**").hasAuthority("ADMINISTRATEUR")

                //.anyRequest().hasAnyRole("ADMINISTRATEUR")

                    //.antMatchers("/users/**").hasAnyAuthority("ADMIN")
                    //.antMatchers(HttpMethod.GET,"/users/find/**").hasAnyAuthority("ADMIN");
        //http.authorizeRequests().antMatchers(HttpMethod.POST,"/users/user/save/**").hasAnyAuthority("ROLE_ADMIN");
                    //.antMatchers(HttpMethod.GET,"/users/all/**").hasAnyAuthority("USER","ADMIN")
                    //.antMatchers(HttpMethod.GET,"/users/find/**").hasAnyAuthority("ROLE_ADMIN")
                    //.antMatchers(HttpMethod.PUT,"/users/update/**").hasAnyAuthority("ADMIN")

                /*.and().formLogin().loginPage("/users/login").permitAll()
                .and().logout().logoutUrl("/logout").clearAuthentication(true).invalidateHttpSession(true).deleteCookies().logoutSuccessUrl("/users/login");

                ;
                //.antMatchers(HttpMethod.GET,"/users/find/**").hasAnyAuthority("ADMIN")
                /*.and().logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/users/logout/**")).logoutSuccessUrl("/users/login/**")*/;
        /*http.authorizeRequests().antMatchers(HttpMethod.GET,"/users/all/**").hasAnyAuthority("USER");
        http.authorizeRequests().antMatchers("/users/**").hasAnyAuthority("ADMIN");*/

        /*http.authorizeRequests().antMatchers(HttpMethod.GET,"/users/find/**").hasAnyAuthority("ADMIN");
        http.authorizeRequests().antMatchers(HttpMethod.POST,"/users/user/save/**").hasAnyAuthority("ADMIN");*/
        //http.authorizeRequests().antMatchers("/*").hasAnyAuthority("ROLE_ADMIN");
        //http.authorizeRequests().antMatchers(HttpMethod.GET,"/users/all/**").hasAnyAuthority("ROLE_USER");
        //http.authorizeRequests().antMatchers("/**").hasAnyAuthority("ROLE_ADMIN");
        //http.authorizeRequests().anyRequest().authenticated();

        http.addFilter(customAuthFilter);
        http.addFilterBefore(new CustomAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception{
        return super.authenticationManagerBean();
    }




    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider =
                new DaoAuthenticationProvider();
        provider.setPasswordEncoder(bCryptPasswordEncoder);
        provider.setUserDetailsService(userDetailsService);
        return provider;
    }
    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowCredentials(true);
        corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
        corsConfiguration.setAllowedHeaders(Arrays.asList("Origin", "Access-Control-Allow-Origin", "Content-Type",
                "Accept", "Authorization", "Origin, Accept", "X-Requested-With",
                "Access-Control-Request-Method", "Access-Control-Request-Headers"));
        corsConfiguration.setExposedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Authorization",
                "Access-Control-Allow-Origin", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"));
        corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
        return new CorsFilter(urlBasedCorsConfigurationSource);
    }

    /*@Bean
     accessDeniedHandler() {
        return new RestAccessDeniedHandler();
    }

    @Bean
    RestAuthenticationEntryPoint authenticationEntryPoint() {
        return new RestAuthenticationEntryPoint();
    }

    @Bean
    RestAuthenticationFailureHandler authenticationFailureHandler(){
        return new RestAuthenticationFailureHandler();
    }

    @Bean
    RestSuccessHandler successHandler(){
        return new RestSuccessHandler();
    }*/




}

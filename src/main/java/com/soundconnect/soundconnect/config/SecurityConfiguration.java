package com.soundconnect.soundconnect.config;

import com.soundconnect.soundconnect.services.UserDetailsLoader;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    private UserDetailsLoader usersLoader;

    public SecurityConfiguration(UserDetailsLoader usersLoader) {
        this.usersLoader = usersLoader;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }


    @Bean
    public SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests((requests) -> requests
                .requestMatchers(
                        "/profile",
                        "/profile/**",
                        "/create",
                        "/createPlaylist",
                        "/feed/*/edit").authenticated()

                .requestMatchers(
                        "/",
                        "/login",
                        "/logout",
                        "/register",
                        "/explore",
                        "/about",
                        "/contact",
                        "/feed",
                        "/editPlaylist",
                        "/profile/messages/**",
                        "/profile/**"

                ).permitAll()
                .requestMatchers("/css/**", "/js/**", "/images/**", "https://kit.fontawesome.com/**", "/static/**", "/keys.js").permitAll()
        );
        http.formLogin((form) -> form.loginPage("/login").defaultSuccessUrl("/profile"));
        http.logout((form) -> form.logoutSuccessUrl("/logout"));
        http.httpBasic(withDefaults());
        return http.build();
    }
}

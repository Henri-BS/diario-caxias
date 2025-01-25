package com.pasifcode.caxias_diary.application.security;


import com.pasifcode.caxias_diary.domain.entity.User;
import com.pasifcode.caxias_diary.application.exception.InvalidTokenException;
import com.pasifcode.caxias_diary.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JwtFilter extends OncePerRequestFilter {

    private final JwtHelper jwtHelper;
    private final UserService userService;

    @Autowired
    public JwtFilter(JwtHelper jwtHelper, UserService userService) {
        this.jwtHelper = jwtHelper;
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
    String token = getToken(request);

    if (token != null){
        try {
            String email = jwtHelper.getEmailFromToken(token);
            User user = userService.findByEmail(email);
            setUserAsAuthenticated(user);
        }catch(InvalidTokenException e){
            System.out.println("Token inválido: " + e.getMessage());
        }catch(Exception e){
            System.out.println("Erro na validação do token: " + e.getMessage());
        }
    }
    filterChain.doFilter(request, response);
    }
    private void setUserAsAuthenticated(User user){
        UserDetails userDetails = org.springframework.security.core.userdetails.User
                .withUsername(user.getUsername())
                .password(user.getPassword())
                .roles("USER")
                .build();

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    }

    private String getToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if(authHeader != null) {
            String[] authHeaderParts = authHeader.split(" ");
            if(authHeaderParts.length == 2){
                return authHeaderParts[1];
            }
        }
        return null;
    }
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return request.getRequestURI().contains("/users");
    }
}


package com.episteme.api.controller;

import com.episteme.api.entity.dto.ProfileGoogle;
import com.episteme.api.exceptions.ApiResponse;
import com.episteme.api.entity.dto.ChangePasswordRequest;
import com.episteme.api.services.AuthenticationService;
import com.episteme.api.entity.dto.AuthenticationRequest;
import com.episteme.api.entity.dto.RegisterRequest;
import com.episteme.api.entity.dto.AuthenticationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/login-google")
    public ResponseEntity<AuthenticationResponse> loginWithGoogle(
            @RequestBody ProfileGoogle profileGoogle) {
        System.out.println(profileGoogle.getEmail());
        return ResponseEntity.ok(service.loginWithGoogle(profileGoogle));
    }

    @PutMapping("/change-password")
    public ApiResponse<AuthenticationResponse> changePassword(
            @RequestBody ChangePasswordRequest request) {
        return ApiResponse.success(HttpStatus.OK, "Đổi mật khẩu thành công", service.changePassword(request));
    }

}

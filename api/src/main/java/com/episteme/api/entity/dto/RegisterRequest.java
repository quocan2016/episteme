package com.episteme.api.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@NoArgsConstructor
@Builder
@AllArgsConstructor
@Data
public class RegisterRequest {
    private String fullname;
    private String password;
    private String email;
    private LocalDate birthday;
    private String image;
    private String description;

}

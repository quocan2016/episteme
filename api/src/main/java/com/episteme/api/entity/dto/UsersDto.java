package com.episteme.api.entity.dto;

import com.episteme.api.entity.enums.Role;
import com.episteme.api.entity.enums.UserStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UsersDto {

    private String id;
    private String fullname;
    private String email;
    private String password;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate birthday;
    private String image;
    private UserStatus status;
    private String description;
    @JsonFormat(pattern = "hh:mma dd/MM/yyyy")
    private LocalDateTime registeredAt;
    private Role role;
}

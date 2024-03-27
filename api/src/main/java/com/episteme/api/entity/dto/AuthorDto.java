package com.episteme.api.entity.dto;

import com.episteme.api.entity.enums.UserStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
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
public class AuthorDto {
    private String id;
    private String fullname;
    private String email;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate birthday;
    private String image;
    private UserStatus status;
    private String description;
}

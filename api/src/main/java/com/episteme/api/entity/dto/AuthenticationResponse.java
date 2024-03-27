package com.episteme.api.entity.dto;

import com.episteme.api.entity.dto.UsersDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@Builder
@AllArgsConstructor
public class AuthenticationResponse {
    private UsersDto infoUser;
    private String token;
}

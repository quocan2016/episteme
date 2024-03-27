package com.episteme.api.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProfileGoogle {
    private String email;
    private String familyName;
    private String givenName;
    private String googleId;
    private String imageUrl;
    private String name;
}

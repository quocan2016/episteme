package com.episteme.api.entity.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SocialNetworkDto {
    private String followerUserId;
    private String followingUserId;
}

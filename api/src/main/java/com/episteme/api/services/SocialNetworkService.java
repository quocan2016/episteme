package com.episteme.api.services;

import com.episteme.api.entity.SocialNetwork;
import com.episteme.api.entity.SocialNetworkPK;
import com.episteme.api.entity.Users;
import com.episteme.api.entity.dto.FollowUserResponseDto;
import com.episteme.api.entity.dto.SocialNetworkDto;
import com.episteme.api.entity.dto.UsersDto;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface SocialNetworkService extends IService<SocialNetworkDto, SocialNetworkPK> {
    List<UsersDto> findAllFollowersByUserId(String userId);
    List<UsersDto> findAllFollowingByUserId(String userId);
    SocialNetwork dtoToSocialNetwork(SocialNetworkDto socialNetworkDto);
    SocialNetworkDto socialNetworkToDto(SocialNetwork socialNetwork);
    void unfollow(SocialNetworkDto socialNetworkDto);
    FollowUserResponseDto followOfUser(String UserId);
}

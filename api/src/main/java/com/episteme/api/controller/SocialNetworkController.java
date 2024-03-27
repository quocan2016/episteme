package com.episteme.api.controller;

import com.episteme.api.entity.dto.SocialNetworkDto;
import com.episteme.api.exceptions.ApiResponse;
import com.episteme.api.repository.SocialNetworkRepository;
import com.episteme.api.entity.dto.UserResponse;
import com.episteme.api.services.SocialNetworkServiceImpl;
import com.episteme.api.services.UsersServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/follow")
@PreAuthorize("hasAnyAuthority('USER','ADMIN')")
public class SocialNetworkController {
    @Autowired
    SocialNetworkServiceImpl socialNetworkService;
    @Autowired
    SocialNetworkRepository socialNetworkRepository;
    @Autowired
    UsersServiceImpl usersService;

    @PostMapping("/check")
    public ApiResponse<Boolean> checkFollow(@RequestBody SocialNetworkDto socialNetworkDto) {
        return ApiResponse.success(HttpStatus.OK,"success",socialNetworkService.checkFollow(socialNetworkDto));
    }

    @PostMapping("")
    public ApiResponse<SocialNetworkDto> save(@RequestBody SocialNetworkDto socialNetworkDto){
        return ApiResponse.success(HttpStatus.OK,"success",socialNetworkService.save(socialNetworkDto));
    }
    @GetMapping("")
    public ApiResponse<UserResponse> getAuthorMostFollower(
            @RequestParam(value = "pageNumber",defaultValue = "0",required = false) Integer pageNumber,
            @RequestParam(value="pageSize",defaultValue = "5",required = false) Integer pageSize
    ){
        return ApiResponse.success(HttpStatus.OK,"success",usersService.getUserMostFollow(pageNumber,pageSize));
    }

    @DeleteMapping("")
    public ApiResponse<?> unfollow(@RequestBody SocialNetworkDto socialNetworkDto){
        socialNetworkService.unfollow(socialNetworkDto);
        return ApiResponse.success(HttpStatus.OK,"success",null);
    }
}

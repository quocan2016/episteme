package com.episteme.api.controller.admin;


import com.episteme.api.entity.dto.UsersDto;
import com.episteme.api.exceptions.ApiResponse;
import com.episteme.api.services.UsersService;
import com.episteme.api.services.UsersServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/users")
@PreAuthorize
        ("hasAuthority('ADMIN')")
public class AdminUserController {
    @Autowired
    private UsersService usersService;

    @Autowired
    private UsersServiceImpl usersServiceImpl;

    @GetMapping("")
    public ApiResponse<List<UsersDto>> getAll(){
        return ApiResponse.success(HttpStatus.OK,"success",usersService.findAll());
    }

    @GetMapping("/{id}")
    public ApiResponse<?> getUser(@PathVariable("id") String id){
        return ApiResponse.success(HttpStatus.OK,"success",usersService.findUserForAdmin(id));
    }

    @PostMapping("")
    public ApiResponse<UsersDto> create(@RequestBody UsersDto usersDto){
        return ApiResponse.success(HttpStatus.OK,"success",usersService.save(usersDto));
    }

    @PutMapping("/{id}")
    public ApiResponse<?> update(@RequestBody UsersDto usersDto, @PathVariable String id){
        try {
            UsersDto users = usersService.updateForAdmin(id,usersDto);
            return ApiResponse.success(HttpStatus.OK,"Update success",users);
        }catch (Exception e) {
            return ApiResponse.error(HttpStatus.BAD_REQUEST,e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable String id){
        usersService.delete(id);
        return  ApiResponse.success(HttpStatus.OK,"success",null);
    }
}

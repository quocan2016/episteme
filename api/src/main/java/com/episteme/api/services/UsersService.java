package com.episteme.api.services;

import com.episteme.api.entity.dto.AuthorDto;
import com.episteme.api.entity.dto.NumberRegister;
import com.episteme.api.entity.dto.UsersDto;
import com.episteme.api.entity.dto.UserResponse;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public interface UsersService extends IService<UsersDto, String> {
    UserResponse getAllUsers(Integer pageNumber, Integer pageSize, String sortBy, String sortDir);

    UsersDto updateForAdmin(String id,UsersDto usersDto);

    UsersDto getUserWithToken(String token);

    UsersDto findUserForAdmin(String id);
    NumberRegister numberRegister(LocalDate startDate, LocalDate endDate);
    Integer numberRegisterNow();
    List<AuthorDto> getPopularAuthor();

}

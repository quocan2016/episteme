package com.episteme.api.controller.admin;

import com.episteme.api.entity.dto.NumberCreate;
import com.episteme.api.entity.dto.NumberRegister;
import com.episteme.api.exceptions.ApiResponse;
import com.episteme.api.services.PostServiceImpl;
import com.episteme.api.services.UsersServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
@RestController
@RequestMapping("/api/v1/admin/report")
public class AdminReportController {
    //code 6/8  - done
    @Autowired
    PostServiceImpl postService;
    @Autowired
    UsersServiceImpl usersService;

    @GetMapping("/users-new")
    public ApiResponse<NumberRegister> reportNumberNewUsers(
            @RequestParam(value = "startDate" ,required = false) LocalDate startDate,
            @RequestParam(value = "endDate",required = false) LocalDate endDate)
    {
        return ApiResponse.success(HttpStatus.OK,"success",usersService.numberRegister(startDate,endDate));
    }
    @GetMapping("/posts-new")
    public ApiResponse<NumberCreate> reportNumberNewPosts(
            @RequestParam(value = "startDate" ,required = false) LocalDate startDate,
            @RequestParam(value = "endDate",required = false) LocalDate endDate)
    {
        return ApiResponse.success(HttpStatus.OK,"success",postService.numberCreate(startDate,endDate));
    }
}

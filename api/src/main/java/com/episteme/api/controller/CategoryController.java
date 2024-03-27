package com.episteme.api.controller;

import com.episteme.api.entity.Categories;
import com.episteme.api.entity.dto.CategoriesDto;
import com.episteme.api.exceptions.ApiResponse;
import com.episteme.api.repository.CategoriesRepository;
import com.episteme.api.services.CategoriesServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/categories")
public class CategoryController {
    @Autowired
    CategoriesServiceImpl categoriesService;

    @Autowired
    CategoriesRepository categoriesRepository;

    @GetMapping("")
    public ApiResponse<List<CategoriesDto>> getAllCategory() {
        List<CategoriesDto> categoriesDto = categoriesService.findAll();
        return ApiResponse.success(HttpStatus.OK, "", categoriesDto);
    }

    @GetMapping("/{categoryId}")
    public ApiResponse<CategoriesDto> findByIdCategory(@PathVariable Integer categoryId) {
        CategoriesDto categoriesDto = categoriesService.findById(categoryId);
        String messageSuccess = "Tìm thấy danh mục với ID: " + categoryId;
        return ApiResponse.success(HttpStatus.OK, messageSuccess, categoriesDto);
    }

    @GetMapping("/search")
    public ApiResponse<List<CategoriesDto>> findByCategoryName(
            @RequestParam(value = "name",defaultValue = "",required = false) String name,
            @RequestParam(value = "slug",defaultValue = "",required = false) String slug
    ) {
        List<CategoriesDto> categoriesDto = categoriesService.findWithParams(name,slug);
        return ApiResponse.success(HttpStatus.OK, "", categoriesDto);
    }

    @GetMapping("/{userId}/pominent-categories")
    public ResponseEntity<?> getProminentCategoriesOfUserId(@PathVariable String userId) {
        return ResponseEntity.ok(categoriesService.getProminentCategoriesOfUserId(userId));
    }
}

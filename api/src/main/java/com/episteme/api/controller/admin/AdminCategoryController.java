package com.episteme.api.controller.admin;

import com.episteme.api.entity.dto.CategoriesDto;
import com.episteme.api.exceptions.ApiResponse;
import com.episteme.api.services.CategoriesServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/categories")
@PreAuthorize("hasAuthority('ADMIN')")
public class AdminCategoryController {
    @Autowired
    CategoriesServiceImpl categoriesService;

    @GetMapping("")
    public ApiResponse<List<CategoriesDto>> getAllCategory() {
        List<CategoriesDto> categoriesDto = categoriesService.findAll();
        return ApiResponse.success(HttpStatus.OK, "", categoriesDto);
    }

    @PostMapping("")
    public ApiResponse<?> createCategory(@RequestBody CategoriesDto categoriesDto) {
        CategoriesDto categories = categoriesService.save(categoriesDto);
        String messageSuccess = "Thêm danh mục thành công!!";
        return ApiResponse.success(HttpStatus.CREATED ,messageSuccess, categories);
    }

    @PutMapping("/{categoryId}")
    public ApiResponse<?> updateCategory(@RequestBody CategoriesDto categoriesDto,
                                         @PathVariable Integer categoryId ) {
        CategoriesDto categories = categoriesService.update(categoriesDto, categoryId);
        String messageSuccess = "Sửa danh mục thành công!!";
        return ApiResponse.success(HttpStatus.OK ,messageSuccess, categories);
    }

    @DeleteMapping("/{categoryId}")
    public ApiResponse<?> deleteCategory(@PathVariable Integer categoryId) {
        categoriesService.deleteCategoryById(categoryId);
        String messageSuccess = "Xóa danh mục thành công!!";
        return ApiResponse.success(HttpStatus.OK ,messageSuccess, null);
    }

    @GetMapping("/{categoryId}")
    public ApiResponse<CategoriesDto> findByIdCategory(@PathVariable Integer categoryId) {
        CategoriesDto categoriesDto = categoriesService.findById(categoryId);
        String messageSuccess = "Tìm thấy danh mục với ID: " + categoryId;
        return ApiResponse.success(HttpStatus.OK, messageSuccess, categoriesDto);
    }


}

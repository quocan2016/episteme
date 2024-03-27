package com.episteme.api.controller.admin;


import com.episteme.api.entity.dto.PostDto;
import com.episteme.api.exceptions.ApiResponse;
import com.episteme.api.services.PostServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/posts")
@PreAuthorize("hasAuthority('ADMIN')")
public class AdminPostController {
    @Autowired
    PostServiceImpl postService;



    @GetMapping("")
    public ApiResponse<List<PostDto>> getAllPostForAdmin() {
        return ApiResponse.success(HttpStatus.OK, "success", postService.findAllForAdmin());
    }

    @GetMapping("/pending")
    public ApiResponse<List<PostDto>> getAllPostPending() {
        return ApiResponse.success(HttpStatus.OK, "success", postService.findPostPending());
    }

    @PutMapping("/{postId}")
    public ApiResponse<PostDto> updatePost(@RequestBody PostDto postDto,
                                           @PathVariable Long postId) {
        PostDto updatePost = postService.updatePostForAdmin(postDto, postId);
        String successMessage = "Cập nhật bài đăng thành công!";
        return ApiResponse.success(HttpStatus.OK, successMessage, updatePost);
    }

}

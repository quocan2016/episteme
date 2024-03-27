package com.episteme.api.controller;

import com.episteme.api.entity.dto.CommentDto;
import com.episteme.api.entity.dto.PostDto;
import com.episteme.api.exceptions.ApiResponse;
import com.episteme.api.entity.dto.PostResponseDto;
import com.episteme.api.services.CommentServiceImpl;
import com.episteme.api.services.PostServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/posts")
public class PostController {
    @Autowired
    PostServiceImpl postService;

    @Autowired
    private CommentServiceImpl commentService;

    @GetMapping("")
    public ApiResponse<PostResponseDto> getPostsByType(
            @RequestParam(value = "q", defaultValue = "", required = false) String keywords,
            @RequestParam(value = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "8", required = false) Integer pageSize,
            @RequestParam(value = "sortBy", defaultValue = "title", required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir,
            @RequestParam(value = "type", required = false) Optional<String> type) {
        if (type.isPresent()) {
            PostResponseDto postResponse = this.postService.findByType(pageNumber, pageSize, type.get());
            return ApiResponse.success(HttpStatus.OK, "success", postResponse);
        }
        return ApiResponse.success(HttpStatus.OK, "success", postService.getAllPosts(pageNumber, pageSize, sortBy, sortDir));
    }

    @GetMapping("/increase-view/{id}")
    public ApiResponse<?> increaseViews(
            @PathVariable("id") Long id) {
        postService.autoIncreaseViews(id);
        return ApiResponse.success(HttpStatus.OK, "View đã tăng", null);
    }

    @GetMapping("/{id}")
    public ApiResponse<PostDto> getPost(
            @PathVariable("id") Long id) {
        PostDto post = postService.findById(id);
        String successMessage = "Tìm thấy post có id " + id;
        return ApiResponse.success(HttpStatus.OK, successMessage, post);
    }

    @GetMapping("/by-slug/{slug}")
    public ApiResponse<PostDto> getPostBySlug(
            @PathVariable("slug") String slug) {
        PostDto post = postService.findBySlug(slug);
        String successMessage = "Tìm thấy post có slug " + slug;
        return ApiResponse.success(HttpStatus.OK, successMessage, post);
    }

    @PutMapping("/{postId}")
    @PreAuthorize("hasAnyAuthority('USER','ADMIN')")
    public ApiResponse<PostDto> updatePost(@RequestBody PostDto postDto,
                                           @PathVariable Long postId) {
        PostDto updatePost = postService.updatePostWithCategories(postDto, postId);
        String successMessage = "Cập nhật bài đăng thành công!";
        return ApiResponse.success(HttpStatus.OK, successMessage, updatePost);
    }

    @DeleteMapping("/{postId}")
    @PreAuthorize("hasAnyAuthority('USER','ADMIN')")
    public ApiResponse<PostDto> deletePost(@PathVariable("postId") Long postId) {
        postService.delete(postId);
        String successMessage = "Xóa bài đăng thành công!";
        return ApiResponse.success(HttpStatus.OK, successMessage, null);
    }

    @GetMapping("/draft")
    @PreAuthorize("hasAnyAuthority('USER','ADMIN')")
    public ApiResponse<?> getAllDraftPost() {
        List<PostDto> postDto = this.postService.findALlDraftPost();
        return ApiResponse.success(HttpStatus.OK, "", postDto);
    }

    @GetMapping("/search")
    public ApiResponse<PostResponseDto> search(@RequestParam(value = "q", defaultValue = "", required = false) String keywords,
                                               @RequestParam(value = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
                                               @RequestParam(value = "pageSize", defaultValue = "10", required = false) Integer pageSize
                                               ) {
        return ApiResponse.success(HttpStatus.OK, "sucesss", postService.findByKeywords(pageNumber, pageSize, keywords));
    }




    // with post
    @GetMapping("/{postId}/comments")
    public ResponseEntity<List<CommentDto>> getListComment(@PathVariable Long postId) {
        List<CommentDto> commentDtoList = commentService.findAllCommentByPostId(postId);
        return ResponseEntity.ok(commentDtoList);
    }


    @PostMapping("/{postId}/comments")
    @PreAuthorize("hasAnyAuthority('USER','ADMIN')")
    public ApiResponse<CommentDto> create(@PathVariable Long postId, @PathVariable Optional<Long> commentId,
                                          @RequestBody CommentDto commentDto) {
        return ApiResponse.success(HttpStatus.OK, "success",
                commentService.saveNewComment(commentDto, postId, commentId));
    }


    @PostMapping("/{postId}/comments/reply/{commentId}")
    @PreAuthorize("hasAnyAuthority('USER','ADMIN')")
    public ApiResponse<CommentDto> reply(@PathVariable Long postId, @PathVariable Optional<Long> commentId,
                                         @RequestBody CommentDto commentDto) {
        return ApiResponse.success(HttpStatus.OK, "success",
                commentService.saveNewComment(commentDto, postId, commentId));
    }

}

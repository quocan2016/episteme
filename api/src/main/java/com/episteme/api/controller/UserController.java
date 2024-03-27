package com.episteme.api.controller;

import com.episteme.api.entity.dto.*;
import com.episteme.api.exceptions.ApiResponse;
import com.episteme.api.entity.dto.UserResponse;
import com.episteme.api.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    @Autowired
    private UsersServiceImpl usersService;

    @Autowired
    PostServiceImpl postService;

    @Autowired
    BookmarkServiceImpl bookmarkService;

    @Autowired
    SocialNetworkServiceImpl socialNetworkService;

    @Autowired
    CategoriesServiceImpl categoriesService;

    @GetMapping("")
    public ApiResponse<UserResponse> getUsers(
            @RequestParam(value = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false) Integer pageSize,
            @RequestParam(value = "sortBy", defaultValue = "fullname", required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir) {
        UserResponse userResponse = this.usersService.getAllUsers(pageNumber, pageSize, sortBy, sortDir);
        return ApiResponse.success(HttpStatus.OK, "success", userResponse);
    }

    @GetMapping("/{id}")
    public ApiResponse<AuthorDto> getAuthor(@PathVariable String id) {
        return ApiResponse.success(HttpStatus.OK, "success", usersService.findAuthorById(id));
    }

    @GetMapping("/search")
    public ApiResponse<List<AuthorDto>> search(
            @RequestParam(value = "q", defaultValue = "", required = false) String keywords) {
        return ApiResponse.success(HttpStatus.OK, "success", usersService.findByKeywords(keywords));
    }

    // Danh sách người minh đang theo dõi
    @GetMapping("/{id}/followings")
    public ApiResponse<List<UsersDto>> listFollowing(@PathVariable String id) {
        return ApiResponse.success(HttpStatus.OK, "success", socialNetworkService.findAllFollowingByUserId(id));
    }

    // Danh sách người đang theo dõi mình
    @GetMapping("/{id}/followers")
    public ApiResponse<List<UsersDto>> listFollowers(@PathVariable String id) {
        return ApiResponse.success(HttpStatus.OK, "success", socialNetworkService.findAllFollowersByUserId(id));
    }

    // Số ngưới mình theo dõi và số người theo dõi mình
    @GetMapping("/{id}/follows/count")
    public ApiResponse<FollowUserResponseDto> countFollowOfUser(@PathVariable String id) {
        return ApiResponse.success(HttpStatus.OK, "success", socialNetworkService.followOfUser(id));
    }

    @GetMapping("/token/{token}")
    public ApiResponse<UsersDto> getUser(@PathVariable("token") String token) {

        return ApiResponse.success(HttpStatus.OK, "success", usersService.getUserWithToken(token));
    }

    @PostMapping("/{id}/posts")
    public ApiResponse<PostDto> addPost(@RequestBody PostDto postDto, @PathVariable("id") String userId) {
        PostDto savedPost = postService.savePostWithCategories(postDto, userId);
        String successMessage = "Thêm thành công!";
        return ApiResponse.success(HttpStatus.CREATED, successMessage, savedPost);
    }

    @GetMapping("/{userId}/bookmarks")
    public ApiResponse<List<BookmarkDto>> getListBookmarks(@PathVariable String userId) {
        List<BookmarkDto> bookmarkDtoList = bookmarkService.findBookmarkByUserId(userId);
        return ApiResponse.success(HttpStatus.OK, "success", bookmarkDtoList);
    }

    @GetMapping("/{userId}/bookmarks/{postId}")
    public ApiResponse<?> getBookmark(@PathVariable String userId,@PathVariable Long postId) {
        BookmarkDto bookmark = bookmarkService.findBookmarkByUserIdAndPostId(userId,postId);
        return ApiResponse.success(HttpStatus.OK, "Success", bookmark);
    }

    @GetMapping("/{id}/posts")
    public ApiResponse<List<PostDto>> getPostsByUserId(@PathVariable("id") String userId) {
        List<PostDto> posts = postService.findAllPostByUserId(userId);
        String successMessage = "success";
        return ApiResponse.success(HttpStatus.OK, successMessage, posts);
    }

    @GetMapping("/{id}/drafts")
    public ApiResponse<List<PostDto>> getDraftsByUserId(@PathVariable("id") String userId

    ) {
        List<PostDto> posts = postService.findAllDraftByUserId(userId);
        String successMessage = "success";
        return ApiResponse.success(HttpStatus.OK, successMessage, posts);
    }



    //Tác giả nổi bật -done
    @GetMapping("/poppular/authors")
    public ApiResponse<List<AuthorDto>> getPopularOfAuthors() {
        return ApiResponse.success(HttpStatus.OK, "success", usersService.getPopularAuthor());
    }

    //Số lượng bài viết của một User -done
    @GetMapping("/{id}/post-number")
    public ApiResponse<Integer> numberPostsOfUser(@PathVariable("id") String id) {
        return ApiResponse.success(HttpStatus.OK, "success", postService.numberPostsOfUser(id));
    }

    //Tổng số lượt xem của một User -done
    @GetMapping("/{id}/posts-views")
    public ApiResponse<Integer> sumPostsViewOfUser(@PathVariable("id") String id) {
        return ApiResponse.success(HttpStatus.OK, "success", postService.sumPostsViewOfUser(id));
    }
    //Bài viết đã lưu của một User
    @GetMapping("/{id}/bookmarks-number")
    public ApiResponse<Integer> sumBookmarkViewOfUser(@PathVariable("id") String id) {
        return ApiResponse.success(HttpStatus.OK, "success", bookmarkService.numberBookmarkOfUser(id));
    }

    @GetMapping("/{userId}/pominent-categories")
    public ResponseEntity<?> getProminentCategoriesOfUserId(@PathVariable String userId) {
        return ResponseEntity.ok(categoriesService.getProminentCategoriesOfUserId(userId));
    }

    @PutMapping("/{id}")
    public ApiResponse<?> update(@RequestBody AuthorDto authorDto, @PathVariable String id){
        try {
            AuthorDto user = usersService.updateForUser(authorDto,id);
            return ApiResponse.success(HttpStatus.OK,"Update success",user);
        }catch (Exception e) {
            return ApiResponse.error(HttpStatus.BAD_REQUEST,e.getMessage());
        }
    }

}

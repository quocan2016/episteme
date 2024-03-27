package com.episteme.api.controller;

import com.episteme.api.entity.dto.BookmarkDto;
import com.episteme.api.entity.dto.PostDto;
import com.episteme.api.entity.dto.UsersDto;
import com.episteme.api.exceptions.ApiResponse;
import com.episteme.api.services.BookmarkServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/bookmarks")
public class BookmarkController {
    @Autowired
    BookmarkServiceImpl bookmarkService;

    @PostMapping("")
    @PreAuthorize("hasAnyAuthority('USER','ADMIN')")
    public ApiResponse<BookmarkDto> addBookmark(@RequestBody BookmarkDto bookmarkDto) {
        return ApiResponse.success(HttpStatus.CREATED,"Thêm bookmark thành công",bookmarkService.save(bookmarkDto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('USER','ADMIN')")
    public ApiResponse<BookmarkDto> deleteBookmark(@PathVariable Long id) {
        bookmarkService.delete(id);
        return ApiResponse.success(HttpStatus.NO_CONTENT,"Xóa bookmark thành công",null);
    }
}

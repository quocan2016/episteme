package com.episteme.api.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.episteme.api.entity.dto.CommentDto;
import com.episteme.api.exceptions.ApiResponse;
import com.episteme.api.services.CommentServiceImpl;

@RestController
@RequestMapping("/api/v1/comments")
public class CommentController {
	@Autowired
	private CommentServiceImpl commentService;

	@PutMapping("/{commentId}")
	public ApiResponse<CommentDto> update(@RequestBody CommentDto commentDto, @PathVariable Long postId,
			@PathVariable Long commentId) {
		return ApiResponse.success(HttpStatus.OK, "success",
				commentService.UpdateComment(commentDto, postId, commentId));
	}

	@DeleteMapping("/{cmtId}")
	public ApiResponse<Void> delete(@PathVariable Long cmtId) {
		commentService.delete(cmtId);
		return ApiResponse.success(HttpStatus.OK, "success", null);
	}
}

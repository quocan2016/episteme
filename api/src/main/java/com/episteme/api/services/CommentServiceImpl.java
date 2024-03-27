package com.episteme.api.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.episteme.api.entity.Comment;
import com.episteme.api.entity.Post;
import com.episteme.api.entity.Users;
import com.episteme.api.entity.dto.CommentDto;
import com.episteme.api.entity.dto.PostDto;
import com.episteme.api.entity.dto.UsersDto;
import com.episteme.api.exceptions.NotFoundException;
import com.episteme.api.repository.CommentRepository;
import com.episteme.api.repository.PostRepository;

@Service
public class CommentServiceImpl implements CommentService {
	@Autowired
	private CommentRepository commentRepository;
	@Autowired
	private PostRepository postRepository;
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private UsersServiceImpl usersService;
	@Autowired
	private PostServiceImpl postService;

	@Override
	public CommentDto save(CommentDto commentDto) {
		return null;
	}

	public CommentDto saveNewComment(CommentDto commentDto, long postId, Optional<Long> commentId) {
		Comment comment = this.dtoToComment(commentDto);
		Users user = usersService.findByIdUser(commentDto.getUserId());
		PostDto postDto = postService.findById(postId);
		Post post = postService.dtoToPost(postDto);
		comment.setPost(post);
		comment.setCreateAt(LocalDateTime.now());
		comment.setUpdateAt(LocalDateTime.now());
		comment.setUser(user);
		// kiểm tra có parent_comment_id không để xác nhận tạo comment mới hay reply 1
		// comment có sẵn
		Long cmtId = commentId.orElse((long) 0);
		if (cmtId != 0) {
			// check exist comment
			Comment existComment = this.dtoToComment(commentDto);
			existComment = commentRepository.findById(cmtId)
					.orElseThrow(() -> new NotFoundException("Can't find comment has id: " + commentId));
			comment.setParentComment(existComment);
		} else {
			comment.setParentComment(null);
		}
		Comment saveComment = this.commentRepository.save(comment);
		return this.commentToDto(saveComment);
	}

	public CommentDto UpdateComment(CommentDto commentDto, long postId, long commentId) {
		// check exist comment
		Comment existComment = this.dtoToComment(commentDto);
		existComment = commentRepository.findById(commentId)
				.orElseThrow(() -> new NotFoundException("Can't find comment has id: " + commentId));
		// check exist post
		Post existingPost = postRepository.findById(postId)
				.orElseThrow(() -> new NotFoundException("Can't find post has id: " + postId));
		existComment.setUpdateAt(LocalDateTime.now());
		existComment.setPost(existingPost);
		existComment.setContent(commentDto.getContent());
		Comment updatedComment = this.commentRepository.save(existComment);
		return this.commentToDto(updatedComment);
	}

	@Override
	public CommentDto update(CommentDto comment, Long commentId) {
		return null;
	}

	@Override
	public void delete(Long id) {
		Comment comment = this.commentRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("Can't find comment has id: " + id));
		comment.getComments().forEach(cmtSub -> commentRepository.delete(cmtSub));
		this.commentRepository.delete(comment);
	}

	@Override
	public List<CommentDto> findAll() {
		List<Comment> comments = this.commentRepository.findAll();


		List<CommentDto> commentDtos = comments.stream().map(comment -> this.commentToDto(comment))
				.collect(Collectors.toList());
		return commentDtos;
	}

	public List<CommentDto> findAllCommentByPostId(Long postId) {
		List<Comment> comments = commentRepository.findAllCommentByPostId(postId);
		List<CommentDto> commentDtoList = comments.stream().map(comment -> commentToDto(comment))
				.collect(Collectors.toList());
		return commentDtoList;
	}

	@Override
	public CommentDto findById(Long id) {
		Comment comment = this.commentRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("Can't find comment id: " + id));
		return this.commentToDto(comment);
	}

	public Comment dtoToComment(CommentDto commentDto) {
		return this.modelMapper.map(commentDto, Comment.class);
	}

	public CommentDto commentToDto(Comment comment) {
		CommentDto commentDto = modelMapper.map(comment, CommentDto.class);
		return commentDto;
	}

}

package com.episteme.api.repository;

import com.episteme.api.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query("select cmt from Comment cmt where cmt.post.postId = ?1 and cmt.parentComment IS NULL order by cmt.updateAt desc")
    List<Comment> findAllCommentByPostId(Long postId);
}

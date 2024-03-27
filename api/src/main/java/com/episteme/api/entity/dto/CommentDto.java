package com.episteme.api.entity.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CommentDto {
    private Long id;
    private String userId;
    private String content;
    @JsonFormat(pattern = "hh:mma dd/MM/yyyy")
    private LocalDateTime createAt;
    @JsonFormat(pattern = "hh:mma dd/MM/yyyy")
    private LocalDateTime updateAt;
    @JsonManagedReference
    private List<CommentDto> comments;
    @JsonBackReference
    private CommentDto parentComment;
}

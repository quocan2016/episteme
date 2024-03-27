package com.episteme.api.entity.dto;

import com.episteme.api.entity.enums.PostStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PostDto {
    private Long id;
    private AuthorDto author;
    private String title;
    private String slug;
    private String content;
    private String summary;
    private String thumbnail;
    @JsonFormat(pattern = "hh:mma dd/MM/yyyy")
    private LocalDateTime createAt;
    @JsonFormat(pattern = "hh:mma dd/MM/yyyy")
    private LocalDateTime updateAt;
    private PostStatus status;
    private Long view;
    private Integer total_bookmark;
    private Integer total_comment;
    private List<CategoriesDto> categories;
}

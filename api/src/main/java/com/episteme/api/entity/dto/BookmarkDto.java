package com.episteme.api.entity.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BookmarkDto {
    private long id;
    @JsonFormat(pattern = "hh:mma dd/MM/yyyy")
    private LocalDateTime saveTime;
    private UsersDto user;
    private PostDto post;
}


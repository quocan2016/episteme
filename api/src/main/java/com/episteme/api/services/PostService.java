package com.episteme.api.services;

import com.episteme.api.entity.dto.NumberCreate;
import com.episteme.api.entity.dto.PostDto;
import com.episteme.api.entity.dto.PostResponseDto;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public interface PostService extends IService<PostDto, Long> {
    PostResponseDto getAllPosts(Integer pageNumber, Integer pageSize, String sortBy, String sortDir);


    List<PostDto> findAllDraftByUserId(String userId);
    Integer sumPostsViewOfUser(String id);
    Integer numberPostsOfUser(String id);
    Integer numberCreateAtNow();
    NumberCreate numberCreate(LocalDate startDate, LocalDate endDate);

    PostResponseDto findByKeywords(Integer pageNumber, Integer pageSize,String keywords);
}

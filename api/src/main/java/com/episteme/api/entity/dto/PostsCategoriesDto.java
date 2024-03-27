package com.episteme.api.entity.dto;

import com.episteme.api.entity.Categories;
import com.episteme.api.entity.Post;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PostsCategoriesDto {
    private Post post;
    private Categories categories;
}

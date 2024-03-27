package com.episteme.api.entity.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CategoriesDto {
    private int id;
    private String name;
    private String slug;
}

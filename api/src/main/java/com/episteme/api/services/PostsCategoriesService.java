package com.episteme.api.services;

import com.episteme.api.entity.PostsCategoriesPK;
import com.episteme.api.entity.dto.PostsCategoriesDto;
import org.springframework.stereotype.Component;

@Component
interface PostsCategoriesService extends IService<PostsCategoriesDto, PostsCategoriesPK> {
}

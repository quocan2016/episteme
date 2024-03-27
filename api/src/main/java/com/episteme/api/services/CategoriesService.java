package com.episteme.api.services;

import com.episteme.api.entity.Categories;
import com.episteme.api.entity.dto.CategoriesDto;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface CategoriesService extends IService<CategoriesDto, Integer> {

}


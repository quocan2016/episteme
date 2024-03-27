package com.episteme.api.services;

import com.episteme.api.entity.dto.CommentDto;
import org.springframework.stereotype.Component;

@Component
public interface CommentService extends IService<CommentDto, Long> {
}

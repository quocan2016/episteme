package com.episteme.api.services;

import com.episteme.api.entity.dto.BookmarkDto;
import org.springframework.stereotype.Component;

@Component
public interface BookmarkService extends IService<BookmarkDto, Long> {
    Integer numberBookmarkOfUser(String userId);
}

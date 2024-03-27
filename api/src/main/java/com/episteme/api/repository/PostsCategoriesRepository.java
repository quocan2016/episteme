package com.episteme.api.repository;

import com.episteme.api.entity.Categories;
import com.episteme.api.entity.Post;
import com.episteme.api.entity.PostsCategories;
import com.episteme.api.entity.PostsCategoriesPK;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostsCategoriesRepository extends JpaRepository<PostsCategories, PostsCategoriesPK> {

    @Query("SELECT pc.category FROM PostsCategories pc WHERE pc.post.postId = ?1")
    List<Categories> findCategoriesByPostId(Long id);

    @Query("SELECT pc.post FROM PostsCategories pc WHERE pc.category.slug = ?1")
    List<Post> findPostByCategoriesSlug(String slug);
    List<PostsCategories> findByPost(Post post);
    @Transactional
    void deleteByCategory_CategoryId(Integer categoryId);

}

package com.episteme.api.repository;

import com.episteme.api.entity.Categories;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoriesRepository extends JpaRepository<Categories, Integer> {
    Optional<Categories> findBySlug(String slug);
    @Query("SELECT c FROM Categories c WHERE c.name LIKE %:name% AND c.slug LIKE :slug")
    List<Categories> findWithParams(String name,String slug);
    @Transactional
    void deleteByCategoryId(Integer categoryId);

    @Query(value = "SELECT c.* FROM users u " +
            "INNER JOIN post p ON p.user_id = u.user_id " +
            "INNER JOIN posts_categories pc ON pc.post_id = p.post_id " +
            "INNER JOIN categories c ON c.category_id = pc.category_id " +
            "WHERE  u.user_id = ?1 " +
            "GROUP BY c.category_id, c.name, c.slug ORDER BY COUNT(c.category_id) DESC", nativeQuery = true)
    List<Categories> getProminentCategoriesOfUserId(String userID);

}

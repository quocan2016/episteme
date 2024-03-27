package com.episteme.api.repository;

import com.episteme.api.entity.Post;
import com.episteme.api.entity.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UsersRepository extends JpaRepository<Users, String> {
    Optional<Users> findByEmailAndPasswordNotNull(String username);

    Optional<Users> findByEmailAndPasswordNull(String username);

    Optional<Users> findByEmail(String username);

    @Query("select o  from Users o where  o.fullname like %?1% or o.email like %?1% ")
    List<Users> findByKeywords(String keywords);

    @Query("SELECT u.userId, u.fullname, u.email, p.postId, p.title, p.view " +
            "FROM Users u " +
            "JOIN SocialNetwork s ON u.userId = s.followerUser.userId " +
            "JOIN Post p ON u.userId = p.user.userId " +
            "WHERE u.posts IS NOT EMPTY " +
            "AND p.view = (SELECT MAX(p2.view) FROM Post p2 WHERE p2.user.userId = u.userId) " +
            "GROUP BY u.userId, u.fullname, u.email, p.postId, p.title, p.view " +
            "ORDER BY COUNT(s.followerUser) DESC")
    Page<Object[]> findTop3UsersWithMostFollowersAndHighestViewPost(Pageable pageable);
    @Query("SELECT u FROM Users u LEFT JOIN SocialNetwork s ON u.userId = s.id.following.userId GROUP BY u.userId HAVING COUNT(s.followerUser) > 0 ORDER BY COUNT(s.followerUser) DESC")
    Page<Users> findUsersMostFollow(Pageable pageable);

    //Hàm đếm sô lượng người đăng ký
    @Query("SELECT COUNT(u.userId) FROM Users u WHERE u.registeredAt >= :startDate AND u.registeredAt < :endDate")
    Integer countUsersForDate(LocalDateTime startDate, LocalDateTime endDate);
}

package com.episteme.api.repository;

import com.episteme.api.entity.SocialNetwork;
import com.episteme.api.entity.SocialNetworkPK;
import com.episteme.api.entity.Users;
import com.episteme.api.entity.dto.SocialNetworkDto;
import com.episteme.api.entity.dto.UsersDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SocialNetworkRepository extends JpaRepository<SocialNetwork, SocialNetworkPK> {
    @Query("select sn.followerUser from SocialNetwork sn where sn.followingUser.userId = ?1")
    List<Users> findAllFollowerNetworkByUserId(String userId);

    @Query("select sn.followingUser from SocialNetwork sn where sn.followerUser.userId = ?1")
    List<Users> findAllFollowingNetworkByUserId(String userId);

    @Query("SELECT sn.followingUser FROM SocialNetwork sn " +
            "GROUP BY sn.followingUser " +
            "ORDER BY COUNT(sn.followingUser) DESC")
    List<Users> findUsersWithMostFollowers(Pageable pageable);
  
    // Số người theo dõi mình
    @Query("SELECT COUNT(sn) FROM SocialNetwork sn WHERE sn.id.following.userId = :followingUserId ")
    Long countByFollowerUserId(@Param("followingUserId") String followingUserId);
    // Số người mình đang theo dõi
    @Query("SELECT COUNT(sn) FROM SocialNetwork sn WHERE sn.id.followers.userId = :followerUserId")
    Long countByFollowingUserId(@Param("followerUserId") String followerUserId);

    @Query("select sn from SocialNetwork sn where sn.followerUser.userId like ?1 and sn.followingUser.userId like ?2")
    Optional<SocialNetwork> getSocialNetworkById(String followerUserId,String followingUserId);
}

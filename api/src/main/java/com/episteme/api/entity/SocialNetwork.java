package com.episteme.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "social_network")
public class SocialNetwork {
    @EmbeddedId
    private SocialNetworkPK id;

    @ManyToOne
    @JoinColumn(name = "followers", insertable = false, updatable = false)
    @JsonBackReference
    private Users followerUser;

    @ManyToOne
    @JoinColumn(name = "following", insertable = false, updatable = false)
    @JsonBackReference
    private Users followingUser;
}

package com.episteme.api.entity;

import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Embeddable
public class SocialNetworkPK implements Serializable {
    @ManyToOne
    @JoinColumn(name = "followers")
    private Users followers;

    @ManyToOne
    @JoinColumn(name = "following")
    private Users following;
}

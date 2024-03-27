package com.episteme.api.services;

import com.episteme.api.entity.SocialNetwork;
import com.episteme.api.entity.SocialNetworkPK;
import com.episteme.api.entity.Users;
import com.episteme.api.entity.dto.FollowUserResponseDto;
import com.episteme.api.entity.dto.SocialNetworkDto;
import com.episteme.api.entity.dto.UsersDto;
import com.episteme.api.exceptions.DuplicateRecordException;
import com.episteme.api.exceptions.NotFoundException;
import com.episteme.api.repository.SocialNetworkRepository;
import com.episteme.api.repository.UsersRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SocialNetworkServiceImpl implements SocialNetworkService {
    @Autowired
    private SocialNetworkRepository socialNetworkRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private UsersServiceImpl usersService;
    @Autowired
    private UsersRepository userRepo;
    @Override
    public SocialNetworkDto save(SocialNetworkDto socialNetworkDto) {
        String followingUserId=socialNetworkDto.getFollowingUserId();
        String followerUserId=socialNetworkDto.getFollowerUserId();
        Users usersFollowing = userRepo.findById(followingUserId).orElseThrow(()-> new NotFoundException("Không tìm thấy FollowingUserId:"+followingUserId));

        Users usersFollower = userRepo.findById(followerUserId).orElseThrow(()-> new NotFoundException("Không tìm thấy FollowerUserId:"+followerUserId));
        if (followingUserId.equals(followerUserId)) {
            throw new DuplicateRecordException("Không thể follow chính bản thân được");
        }
        if (socialNetworkRepository.existsById(new SocialNetworkPK(usersFollower, usersFollowing))) {
            throw new DuplicateRecordException("Bạn đã follow họ");
        }
        SocialNetwork socialNetwork = new SocialNetwork(new SocialNetworkPK(usersFollower, usersFollowing),usersFollower,usersFollowing);
        SocialNetwork saveSocialNetwork = this.socialNetworkRepository.save(socialNetwork);
        return this.socialNetworkToDto(saveSocialNetwork);
    }
    @Override
    public void unfollow(SocialNetworkDto socialNetworkDto) {
        String followingUserId=socialNetworkDto.getFollowingUserId();
        String followerUserId=socialNetworkDto.getFollowerUserId();
        Users usersFollower = userRepo.findById(followerUserId).orElseThrow(()-> new NotFoundException("Không tìm thấy FollowerUserId:"+followerUserId));
        Users usersFollowing = userRepo.findById(followingUserId).orElseThrow(()-> new NotFoundException("Không tìm thấy FollowingUserId:"+followingUserId));
        if (followingUserId.equals(followerUserId)) {
            throw new DuplicateRecordException("Không thể unfollow chính bản thân được");
        }
        if (!socialNetworkRepository.existsById(new SocialNetworkPK(usersFollower, usersFollowing))) {
            throw new DuplicateRecordException("Bạn chưa follow họ");
        }
        SocialNetworkPK socialNetworkPK = new SocialNetworkPK(usersFollower, usersFollowing);
        socialNetworkRepository.deleteById(socialNetworkPK);
    }

    public Boolean checkFollow(SocialNetworkDto socialNetworkDto) {
        return socialNetworkRepository.getSocialNetworkById(socialNetworkDto.getFollowerUserId(),socialNetworkDto.getFollowingUserId()).isPresent();
    }

    @Override
    public List<UsersDto> findAllFollowersByUserId(String userId) {
        List<Users> users = socialNetworkRepository.findAllFollowerNetworkByUserId(userId);
        List<UsersDto> usersDtoList = users.stream().map(post -> usersService.usersToDto(post)).collect(Collectors.toList());
        return usersDtoList;
    }
    @Override
    public List<UsersDto> findAllFollowingByUserId(String userId) {
        List<Users> users = socialNetworkRepository.findAllFollowingNetworkByUserId(userId);
        List<UsersDto> usersDtoList = users.stream().map(post -> usersService.usersToDto(post)).collect(Collectors.toList());
        return usersDtoList;
    }
    @Override
    public SocialNetwork dtoToSocialNetwork(SocialNetworkDto socialNetworkDto) {
        return this.modelMapper.map(socialNetworkDto, SocialNetwork.class);
    }
    @Override
    public SocialNetworkDto socialNetworkToDto(SocialNetwork socialNetwork) {
        return modelMapper.map(socialNetwork, SocialNetworkDto.class);
    }


    @Override
    public FollowUserResponseDto followOfUser(String UserId){
        Users usersFollower = userRepo.findById(UserId).orElseThrow(()-> new NotFoundException("Không tìm thấy UserId:"+UserId));
        Long countFollower = socialNetworkRepository.countByFollowerUserId(UserId);
        Long countFollowing = socialNetworkRepository.countByFollowingUserId(UserId);
        return new FollowUserResponseDto(countFollower,countFollowing);
    }

    @Override
    public SocialNetworkDto update(SocialNetworkDto socialNetworkDto, SocialNetworkPK socialNetworkPK) {
        return null;
    }

    @Override
    public List<SocialNetworkDto> findAll() {
        return null;
    }

    @Override
    public SocialNetworkDto findById(SocialNetworkPK socialNetworkPK) {
        return null;
    }
    @Override
    public void delete(SocialNetworkPK Id) {
        SocialNetwork socialNetwork = this.socialNetworkRepository.findById(Id).orElseThrow(() -> new NotFoundException("Can't find Social Network"));
        this.socialNetworkRepository.delete(socialNetwork);
    }


}

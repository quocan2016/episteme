package com.episteme.api.services;

import com.episteme.api.entity.Categories;
import com.episteme.api.entity.Post;
import com.episteme.api.entity.PostsCategories;
import com.episteme.api.entity.PostsCategoriesPK;
import com.episteme.api.entity.dto.CategoriesDto;
import com.episteme.api.entity.dto.PostsCategoriesDto;
import com.episteme.api.exceptions.NotFoundException;
import com.episteme.api.repository.PostsCategoriesRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostsCategoriesServiceImpl implements PostsCategoriesService {
    @Autowired
    private PostsCategoriesRepository postsCategoriesRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private CategoriesServiceImpl categoriesService;

    @Override
    public PostsCategoriesDto save(PostsCategoriesDto postsCategoriesDto) {
        PostsCategories postsCategories = this.dtoToPostsCategories(postsCategoriesDto);
        PostsCategories savePostsCategories = this.postsCategoriesRepository.save(postsCategories);
        return this.postsCategoriesToDto(savePostsCategories);
    }

    @Override
    public PostsCategoriesDto update(PostsCategoriesDto postsCategoriesDto, PostsCategoriesPK postsCategoriesPK) {
        return null;
    }

    @Override
    public void delete(PostsCategoriesPK postsCategoriesPK) {
        PostsCategories postsCategories1 = this.postsCategoriesRepository.findById(postsCategoriesPK).orElseThrow(() -> new NotFoundException("Can't find post by category id: " + postsCategoriesPK));
        this.postsCategoriesRepository.delete(postsCategories1);
    }

    @Override
    public List<PostsCategoriesDto> findAll() {
        List<PostsCategories> categories = this.postsCategoriesRepository.findAll();
        List<PostsCategoriesDto> categoriesDtos = categories.stream().map(category -> this.postsCategoriesToDto(category)).collect(Collectors.toList());
        return categoriesDtos;
    }

    @Override
    public PostsCategoriesDto findById(PostsCategoriesPK postsCategoriesPK) {
        return null;
    }

    public PostsCategories dtoToPostsCategories(PostsCategoriesDto postsCategoriesDto) {
        return this.modelMapper.map(postsCategoriesDto, PostsCategories.class);
    }

    public PostsCategoriesDto postsCategoriesToDto(PostsCategories postsCategories) {
        return this.modelMapper.map(postsCategories, PostsCategoriesDto.class);
    }

    public List<CategoriesDto> findAllCategoriesNameByPostId(Long postId) {
        List<Categories> categoriesList = this.postsCategoriesRepository.findCategoriesByPostId(postId);
        List<CategoriesDto> categoriesDtoList = categoriesList.stream().map(category -> this.categoriesService.categoriesToDto(category)).collect(Collectors.toList());
        return categoriesDtoList;
    }

    public List<PostsCategories> saveAllPostCategories(List<PostsCategories> postCategories) {
        return postsCategoriesRepository.saveAll(postCategories);
    }
    public void deleteAllByPost(Post post) {
        // Truy vấn tất cả các liên kết giữa bài đăng và danh mục dựa trên bài đăng cụ thể
        List<PostsCategories> postCategories = postsCategoriesRepository.findByPost(post);

        // Xóa tất cả các liên kết trong danh sách postCategories
        postsCategoriesRepository.deleteAll(postCategories);
    }
}

package com.episteme.api.services;

import com.episteme.api.entity.Categories;
import com.episteme.api.entity.Post;
import com.episteme.api.entity.dto.CategoriesDto;
import com.episteme.api.entity.dto.PostDto;
import com.episteme.api.exceptions.ApiResponse;
import com.episteme.api.exceptions.DuplicateRecordException;
import com.episteme.api.exceptions.NotFoundException;
import com.episteme.api.repository.CategoriesRepository;
import com.episteme.api.repository.PostsCategoriesRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.text.Normalizer;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoriesServiceImpl implements CategoriesService {
    @Autowired
    private CategoriesRepository categoriesRepository;
    @Autowired
    private PostsCategoriesRepository postsCategoriesRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CategoriesDto save(CategoriesDto categoriesDto) {
        if(checkForDuplicateRecordSave(categoriesDto)) {
            throw new DuplicateRecordException("Có vẻ slug của bạn đã bị trùng với slug của một bài đăng nào đó!!");
        }

        Categories categories = this.dtoToCategories(categoriesDto);
        Categories saveCategory = this.categoriesRepository.save(categories);
        return this.categoriesToDto(saveCategory);
    }

    @Override
    public CategoriesDto update(CategoriesDto categoriesDto, Integer id) {
        // Tu viet sau chua thong nhat duoc Dto
        Categories categories = categoriesRepository.findById(id).orElseThrow(() ->{
            throw new NotFoundException("Không tìm thấy danh mục với ID: " + id);
        });

        if(checkForDuplicateRecordUpdate(categoriesDto, id)) {
            throw new DuplicateRecordException("Có vẻ slug của bạn đã bị trùng với slug của một bài đăng nào đó!!");
        }

        assert categories != null;
        categories.setName(categoriesDto.getName());
        categories.setSlug(categoriesDto.getSlug());

        Categories categoriesUpdate = categoriesRepository.save(categories);
        return this.categoriesToDto(categoriesUpdate);
    }

    @Override
    public void delete(Integer id) {
        Categories categories = this.categoriesRepository.findById(id).orElseThrow(() ->
                new NotFoundException("Không tìm thấy danh mục với ID: " + id));
        this.categoriesRepository.delete(categories);
    }

    public void deleteCategoryById(Integer categoryId) {
        this.categoriesRepository.findById(categoryId).orElseThrow(() ->
                new NotFoundException("Không tìm thấy danh mục với ID: " + categoryId));
        //Xóa postCategories có chứa categoryId trước
        postsCategoriesRepository.deleteByCategory_CategoryId(categoryId);

        //Sau đó xóa danh mục từ bảng categories
        categoriesRepository.deleteByCategoryId(categoryId);
    }

    @Override
    public List<CategoriesDto> findAll() {
        List<Categories> categories = this.categoriesRepository.findAll();
        List<CategoriesDto> categoriesDtos = categories.stream().map(category -> this.categoriesToDto(category)).collect(Collectors.toList());
        return categoriesDtos;
    }

    @Override
    public CategoriesDto findById(Integer id) { //Nhận dữ liệu là id -> CategoriesDto
        Categories categories = this.categoriesRepository.findById(id).orElseThrow(() ->
                new NotFoundException("Không tìm thấy danh mục với ID: " + id));
        return this.categoriesToDto(categories);
    }


    public Categories findByIdCategories(Integer id) {  //Nhận dữ liệu là id -> Categories
        return this.categoriesRepository.findById(id).orElseThrow(() ->
                new NotFoundException("Không tìm thấy danh mục với ID: " + id));
    }

    public List<CategoriesDto> findWithParams(String name,String slug) {
        List<Categories> categories = categoriesRepository.findWithParams(name,slug);
        if(categories.isEmpty()) throw new NotFoundException("Không tìm thấy danh mục với các param truyền vào");
        return categories.stream().map(this::categoriesToDto).collect(Collectors.toList());
    }

    public Categories dtoToCategories(CategoriesDto categoriesDto) {
        return this.modelMapper.map(categoriesDto, Categories.class);
    }

    public CategoriesDto categoriesToDto(Categories category) {
        return this.modelMapper.map(category, CategoriesDto.class);
    }

    public List<Categories> findAllById(List<Integer> categoryIds) {
        return categoriesRepository.findAllById(categoryIds);
    }

    private boolean checkForDuplicateRecordSave(CategoriesDto categoriesDto) {
        String slug = categoriesDto.getSlug();

        Optional<Categories> existingCategoryOptional = categoriesRepository.findBySlug(slug);

        return existingCategoryOptional.isPresent();
    }
    private boolean checkForDuplicateRecordUpdate(CategoriesDto categoriesDto, Integer id) {
        String slug = categoriesDto.getSlug();

        // Thực hiện truy vấn trong cơ sở dữ liệu để kiểm tra xem slug đã tồn tại hay chưa
        Optional<Categories> existingCategoryOptional = categoriesRepository.findBySlug(slug);

        if (existingCategoryOptional.isPresent()) {
            Categories existingPost = existingCategoryOptional.get();
            // Nếu slug mới không trùng với slug hiện tại của bài post và cũng không trùng với chính ID của bài post
            // Slug mới bị trùng với một post khác, không cho phép cập nhật
            return existingPost.getCategoryId() != (id);
        }

        // Nếu không có slug nào bị trùng hoặc chỉ trùng với chính bài post hiện tại
        return false;
    }

    public ApiResponse<List<Categories>> getProminentCategoriesOfUserId(String userId){
        return ApiResponse.success(HttpStatus.OK, "success", categoriesRepository.getProminentCategoriesOfUserId(userId));
    }

}

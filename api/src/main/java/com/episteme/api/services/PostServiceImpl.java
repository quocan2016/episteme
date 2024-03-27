package com.episteme.api.services;

import com.episteme.api.entity.*;
import com.episteme.api.entity.dto.*;
import com.episteme.api.entity.enums.PostStatus;
import com.episteme.api.exceptions.NotFoundException;
import com.episteme.api.repository.PostRepository;
import com.episteme.api.repository.PostsCategoriesRepository;
import com.episteme.api.repository.SocialNetworkRepository;
import com.episteme.api.repository.UsersRepository;
import com.episteme.api.entity.dto.PostResponseDto;
import com.github.slugify.Slugify;
import jakarta.servlet.http.HttpSession;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PostServiceImpl implements PostService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private CategoriesServiceImpl categoriesService;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private UsersServiceImpl usersService;
    @Autowired
    private PostsCategoriesServiceImpl postsCategoriesService;
    @Autowired
    private PostsCategoriesRepository postsCategoriesRepository;
    @Autowired
    private SocialNetworkRepository socialNetworkRepository;
    @Autowired
    private HttpSession session;
    @Autowired
    private UsersRepository usersRepository;


    public PostDto savePostWithCategories(PostDto postDto, String userId) {
        Post post = dtoToPost(postDto);
        Users user = usersService.findByIdUser(userId);
        post.setCreateAt(LocalDateTime.now());
        post.setUpdateAt(LocalDateTime.now());
        post.setSlug("slug");
        post.setView(0L);
        if (postDto.getStatus()==PostStatus.Pending) {
            post.setStatus(PostStatus.Pending);
        }else if(postDto.getStatus()==PostStatus.Draft) {
            post.setStatus(PostStatus.Draft);
        }else {
            post.setStatus(PostStatus.Pending);
        }
        post.setUser(user);

        Post savePost = this.postRepository.save(post);
        convertSlugAndSave(post, savePost);

        List<Categories> categories = new ArrayList<>();
        postDto.getCategories().forEach(c -> categories.add(categoriesService.findByIdCategories(c.getId())));
        savePostCategoriesForPost(categories, savePost);
        return this.postDto(savePost);
    }

    public PostDto updatePostForAdmin(PostDto postDto, Long postId) {
        // Kiểm tra nếu bài đăng không tồn tại thì không tiến hành cập nhật
        Post existingPost = postRepository.findById(postId).orElseThrow(() ->
                new NotFoundException("Không tìm thấy bài đăng với ID: " + postId)
        );
        // Cập nhật thông tin bài đăng từ PostDto
        existingPost.setTitle(postDto.getTitle());
        existingPost.setContent(postDto.getContent());
        existingPost.setSummary(postDto.getSummary());
        existingPost.setThumbnail(postDto.getThumbnail());
        existingPost.setUpdateAt(LocalDateTime.now());
        existingPost.setStatus(postDto.getStatus());

        Post updatedPost = postRepository.save(existingPost);
        convertSlugAndSave(existingPost, updatedPost);

        List<Categories> categories = new ArrayList<>();
        postDto.getCategories().forEach(c -> categories.add(categoriesService.findByIdCategories(c.getId())));
        postsCategoriesService.deleteAllByPost(updatedPost);
        savePostCategoriesForPost(categories, existingPost);
        return this.postDto(updatedPost);
    }

    public PostDto updatePostWithCategories(PostDto postDto, Long postId) {
        // Kiểm tra nếu bài đăng không tồn tại thì không tiến hành cập nhật
        Post existingPost = postRepository.findById(postId).orElseThrow(() ->
                new NotFoundException("Không tìm thấy bài đăng với ID: " + postId)
        );
        Post post = dtoToPost(postDto);
        // Cập nhật thông tin bài đăng từ PostDto
        existingPost.setTitle(postDto.getTitle());
        existingPost.setContent(postDto.getContent());
        existingPost.setThumbnail(postDto.getThumbnail());
        existingPost.setSummary(postDto.getSummary());
        existingPost.setUpdateAt(LocalDateTime.now());
        if (postDto.getStatus()==PostStatus.Pending) {
            existingPost.setStatus(PostStatus.Pending);
        }else if(postDto.getStatus()==PostStatus.Draft) {
            existingPost.setStatus(PostStatus.Draft);
        }else if(postDto.getStatus()==PostStatus.Deleted) {
            existingPost.setStatus(PostStatus.Deleted);
        }
        else {
            existingPost.setStatus(PostStatus.Deleted);
        }

        Post updatedPost = postRepository.save(existingPost);
        convertSlugAndSave(existingPost, updatedPost);

        List<Categories> categories = new ArrayList<>();
        postDto.getCategories().forEach(c -> categories.add(categoriesService.findByIdCategories(c.getId())));
        postsCategoriesService.deleteAllByPost(updatedPost);
        savePostCategoriesForPost(categories, existingPost);
        return this.postDto(updatedPost);
    }

    public PostDto createDraft(Long postId) {
        Post existingPost = this.postRepository.findById(postId).orElseThrow(() ->
                new NotFoundException("Không tìm thấy bài đăng với ID: " + postId)
        );
        existingPost.setStatus(PostStatus.Draft);
        Post postDraft = this.postRepository.save(existingPost);

        return this.postDto(postDraft);
    }

    public PostDto updateDraftToNormal(PostDto postDto, Long postId) {
        Post existingPost = postRepository.findById(postId).orElseThrow(() ->
                new NotFoundException("Không tìm thấy bài đăng với ID: " + postId)
        );
        existingPost.setTitle(postDto.getTitle());
        existingPost.setContent(postDto.getContent());
        existingPost.setSummary(postDto.getSummary());
        existingPost.setUpdateAt(LocalDateTime.now());
        existingPost.setStatus(PostStatus.Published);

        Post updatedDraftPost = postRepository.save(existingPost);
        convertSlugAndSave(existingPost, updatedDraftPost);

        List<Categories> categories = new ArrayList<>();
        postDto.getCategories().forEach(c -> categories.add(categoriesService.findByIdCategories(c.getId())));
        postsCategoriesService.deleteAllByPost(updatedDraftPost);
        savePostCategoriesForPost(categories, existingPost);
        return this.postDto(updatedDraftPost);
    }

    public List<PostDto> findALlDraftPost() {
        List<Post> posts = this.postRepository.findByStatus(PostStatus.Draft);
        List<PostDto> postDtos = posts.stream().map(post -> this.postDto(post)).collect(Collectors.toList());
        return postDtos;
    }

    public void deletePost(Long postId, String userId) {
        // Kiểm tra nếu bài đăng không tồn tại thì không tiến hành xóa
        Post existingPost = postRepository.findById(postId).orElseThrow(() -> {
            throw new NotFoundException("Không tìm thấy bài đăng với ID: " + postId);
        });

        if (!existingPost.getUser().getUserId().equals(userId)) {
            throw new RuntimeException("Bạn không có quyền xóa bài đăng này.");
        }
        // Xóa tất cả các liên kết giữa bài đăng và danh mục
        postsCategoriesService.deleteAllByPost(existingPost);

        // Xóa bài đăng
        postRepository.delete(existingPost);
    }

    @Override
    public PostDto save(PostDto postDto) {
        return null;
    }

    @Override
    public PostDto update(PostDto postDto, Long aLong) {
        return null;
    }

    @Override
    public void delete(Long id) {
        Post existingPost = postRepository.findById(id).orElse(null);
        if (existingPost == null) {
            throw new NotFoundException("Không tìm thấy bài đăng với ID: " + id);
        }
        postsCategoriesService.deleteAllByPost(existingPost);
        // Xóa bài đăng
        postRepository.delete(existingPost);
    }

    @Override
    public List<PostDto> findAll() {
        List<Post> posts = this.postRepository.findAll();
        List<PostDto> postDtos = posts.stream().map(post -> this.postDto(post)).collect(Collectors.toList());
        return postDtos;
    }

    public List<PostDto> findAllForAdmin() {
        List<Post> posts = this.postRepository.findAllForAdmin();
        List<PostDto> postDtos = posts.stream().map(post -> this.postDto(post)).collect(Collectors.toList());
        return postDtos;
    }


    public List<PostDto> findPostPending() {
        List<Post> posts = this.postRepository.findByStatusPending();
        List<PostDto> postDtos = posts.stream().map(post -> this.postDto(post)).collect(Collectors.toList());
        return postDtos;
    }

    @Override
    public PostDto findById(Long id) {
        Post post = this.postRepository.findById(id).orElseThrow(() -> new NotFoundException("Can't find post id: " + id));
        return this.postDto(post);
    }



    @Override
    public PostResponseDto findByKeywords(Integer pageNumber, Integer pageSize,String keywords) {

        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        Page<Post> posts = postRepository.findByKeywords(keywords,pageable);

        // get content for page object
        List<Post> listOfPosts = posts.getContent();

        List<PostDto> content = listOfPosts.stream().map(post -> this.postDto(post)).collect(Collectors.toList());
        PostResponseDto postResponse = new PostResponseDto();
        postResponse.setContent(content);
        postResponse.setPageNumber(posts.getNumber());
        postResponse.setPageSize(posts.getSize());
        postResponse.setTotalElements(posts.getTotalElements());
        postResponse.setTotalPages(posts.getTotalPages());
        postResponse.setLastPage(posts.isLast());
        return postResponse;


    }

    public PostResponseDto findByType(Integer pageNumber, Integer pageSize, String type) {
        if (type.equals("newest")) {
            Pageable pageable = PageRequest.of(pageNumber, pageSize);

            Page<Post> posts = postRepository.findPostByNewest(pageable);

            // get content for page object
            List<Post> listOfPosts = posts.getContent();

            List<PostDto> content = listOfPosts.stream().map(post -> this.postDto(post)).collect(Collectors.toList());
            PostResponseDto postResponse = new PostResponseDto();
            postResponse.setContent(content);
            postResponse.setPageNumber(posts.getNumber());
            postResponse.setPageSize(posts.getSize());
            postResponse.setTotalElements(posts.getTotalElements());
            postResponse.setTotalPages(posts.getTotalPages());
            postResponse.setLastPage(posts.isLast());
            return postResponse;
        } else if (type.equals("popular")) {
            Pageable pageable = PageRequest.of(pageNumber, pageSize);

            Page<Post> posts = postRepository.findPostsPopular(pageable);

            // get content for page object
            List<Post> listOfPosts = posts.getContent();

            List<PostDto> content = listOfPosts.stream().map(post -> this.postDto(post)).collect(Collectors.toList());

            PostResponseDto postResponse = new PostResponseDto();
            postResponse.setContent(content);
            postResponse.setPageNumber(posts.getNumber());
            postResponse.setPageSize(posts.getSize());
            postResponse.setTotalElements(posts.getTotalElements());
            postResponse.setTotalPages(posts.getTotalPages());
            postResponse.setLastPage(posts.isLast());
            return postResponse;
        } else if (type.equals("follow")) {
            Pageable pageable = PageRequest.of(pageNumber, pageSize);
            Page<Object[]> list = usersRepository.findTop3UsersWithMostFollowersAndHighestViewPost(pageable);
            List<Long> longList= new ArrayList<>();
            for (int i=0; i<list.getContent().size();i++){
                longList.add((Long) list.getContent().get(i)[3]);
            }
            List<PostDto>postDtoList= postRepository.findAllById(longList).stream().map(post -> this.postDto(post)).collect(Collectors.toList());
            PostResponseDto postResponse = new PostResponseDto();
            postResponse.setContent(postDtoList);
            postResponse.setPageNumber(list.getNumber());
            postResponse.setPageSize(list.getSize());
            postResponse.setTotalElements(list.getTotalElements());
            postResponse.setTotalPages(list.getTotalPages());
            postResponse.setLastPage(list.isLast());
            return postResponse;
        } else {

            throw new NotFoundException("Không tìm thấy Posts theo Type");
        }
    }


    public Post dtoToPost(PostDto postDto) {
        return this.modelMapper.map(postDto, Post.class);
    }

    public PostDto postDto(Post post) {
        try {
            PostDto postDto = new PostDto();
            postDto.setId(post.getPostId());
            postDto.setTitle(post.getTitle());
            postDto.setSlug(post.getSlug());
            postDto.setContent(post.getContent());
            postDto.setSummary(post.getSummary());
            postDto.setThumbnail(post.getThumbnail());
            postDto.setCreateAt(post.getCreateAt());
            postDto.setUpdateAt(post.getUpdateAt());
            postDto.setStatus(post.getStatus());
            postDto.setView(post.getView());
            postDto.setTotal_comment(post.getCommentList()==null ? 0 : post.getCommentList().size());
            postDto.setTotal_bookmark(post.getBookmarkList()==null ? 0 : post.getBookmarkList().size());
//            UsersDto usersDto = this.usersService.findById(post.getUser().getUserId());
            postDto.setAuthor(this.modelMapper.map(post.getUser(),AuthorDto.class));
            List<CategoriesDto> categoriesDtoList = this.postsCategoriesService.findAllCategoriesNameByPostId(post.getPostId());
            postDto.setCategories(categoriesDtoList);
            return postDto;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<PostDto> findAllPostByCategoriesSlug(String slug) {
        List<Post> posts = this.postsCategoriesRepository.findPostByCategoriesSlug(slug);
        List<PostDto> postDtoList = posts.stream().map(post -> this.postDto(post)).collect(Collectors.toList());
        return postDtoList;
    }

    public List<PostDto> findAllPostByUserId(String userId) {
        List<Post> posts = this.postRepository.findAllPostByUserId(userId);
        List<PostDto> postDtoList = posts.stream().map(post -> this.postDto(post)).collect(Collectors.toList());
        return postDtoList;
    }

    public PostDto findBySlug(String slug) {
        Optional<Post> optional = postRepository.findBySlug(slug);
        Post post = optional.orElseThrow(() -> new NotFoundException("Không tìm thấy post có slug: " + slug));
        return this.postDto(post);
    }

    public void savePostCategoriesForPost(List<Categories> categories, Post post) {
        if (categories == null || post == null) {
            throw new NotFoundException("Không tìm thấy: " + categories + post);
        }
        List<PostsCategories> postsCategories = new ArrayList<>();
        // Tạo danh sách các liên kết giữa post và category
        for (Categories category : categories) {
            PostsCategoriesDto postCategoryDto = new PostsCategoriesDto();
            postCategoryDto.setPost(post);
            postCategoryDto.setCategories(category);
            PostsCategories postCategories = new PostsCategories(new PostsCategoriesPK(post, category), post, category);
            postsCategories.add(postCategories);
        }
        // Lưu tất cả liên kết vào bảng "postcategories" một lần
        postsCategoriesService.saveAllPostCategories(postsCategories);
    }

    private boolean checkForDuplicateRecordSave(PostDto postDto) {
        String slug = postDto.getSlug();

        Optional<Post> existingPostOptional = postRepository.findBySlug(slug);

        return existingPostOptional.isPresent();
    }

    private boolean checkForDuplicateRecordUpdate(PostDto postDto, Long postId) {
        String slug = postDto.getSlug();

        // Thực hiện truy vấn trong cơ sở dữ liệu để kiểm tra xem slug đã tồn tại hay chưa
        Optional<Post> existingPostOptional = postRepository.findBySlug(slug);

        if (existingPostOptional.isPresent()) {
            Post existingPost = existingPostOptional.get();
            // Nếu slug mới không trùng với slug hiện tại của bài post và cũng không trùng với chính ID của bài post
            // Slug mới bị trùng với một post khác, không cho phép cập nhật
            return existingPost.getPostId() != (postId);
        }

        // Nếu không có slug nào bị trùng hoặc chỉ trùng với chính bài post hiện tại
        return false;
    }

    public static String convertToSlug(String title, Long id) {
        Slugify slugify = new Slugify();
        String slugTitle = slugify.slugify(title);
        String slugId = slugify.slugify(String.valueOf(id));
        return slugTitle + "-" + slugId;
    }

    public void convertSlugAndSave(Post post, Post savePost) {
        String slug = convertToSlug(post.getTitle(), post.getPostId());
        savePost.setSlug(slug);
        // Cập nhật bài viết lại để lưu slug mới
        this.postRepository.save(savePost);
    }

    public void autoIncreaseViews(Long postId) {
        List<Long> historyPost = (List<Long>) session.getAttribute("historyPost");
        if (historyPost == null) {
            historyPost = new ArrayList<>();
        }

        boolean postExists = false;
        for (Long id : historyPost) {
            if (id.equals(postId)) {
                postExists = true;
                break;
            }
        }

        if (!postExists) {
            historyPost.add(postId);
            session.setAttribute("historyPost", historyPost);
            postRepository.autoIncreaseViews(postId);
        }
    }



    @Override
    public PostResponseDto getAllPosts(Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        // create Pageable instance
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

        Page<Post> posts = postRepository.findAll(pageable);

        // get content for page object
        List<Post> listOfPosts = posts.getContent();

        List<PostDto> content = listOfPosts.stream().map(post -> this.postDto(post)).collect(Collectors.toList());

        PostResponseDto postResponse = new PostResponseDto();
        postResponse.setContent(content);
        postResponse.setPageNumber(posts.getNumber());
        postResponse.setPageSize(posts.getSize());
        postResponse.setTotalElements(posts.getTotalElements());
        postResponse.setTotalPages(posts.getTotalPages());
        postResponse.setLastPage(posts.isLast());

        return postResponse;
    }

    @Override
    public List<PostDto> findAllDraftByUserId(String userId) {

        List<Post> posts = postRepository.findPostsByStatusDraft(userId);


        List<PostDto> content = posts.stream().map(post -> this.postDto(post)).collect(Collectors.toList());
        return content;
    }



    //Api 6/8
    @Override
    public Integer sumPostsViewOfUser(String id) {
        usersRepository.findById(id).orElseThrow( ()-> new NotFoundException("Không tìm thấy id của User"));
        return postRepository.sumPostsViewOfUser(id);
    }
    @Override
    public Integer numberPostsOfUser(String id) {
        usersRepository.findById(id).orElseThrow( ()-> new NotFoundException("Không tìm thấy id của User"));
        return postRepository.numberPostsOfUser(id);
    }
    @Override
    public Integer numberCreateAtNow() {
        LocalDate startDate = LocalDate.now();
        return postRepository.countPostByPostDate(startDate.atStartOfDay(), startDate.atTime(23, 59, 59));
    }
    @Override
    public NumberCreate numberCreate(LocalDate startDate, LocalDate endDate) {
        List<CounterNewPost> countNewUserList = new ArrayList<>();
        // Đếm ngày trong khoảng truyền vào
        long daysBetween = ChronoUnit.DAYS.between(startDate.atStartOfDay(), endDate.atTime(23, 59, 59));
        startDate = startDate.minusDays(1);
        for (long i = 0; i <= daysBetween; i++) {
            startDate = startDate.plusDays(1);
            Integer y = postRepository.countPostByPostDate(startDate.atStartOfDay(), startDate.atTime(23, 59, 59));
            String x = startDate.format(DateTimeFormatter.ofPattern("dd-MM"));
            countNewUserList.add(new CounterNewPost(x.replace("-", "/"), y));
        }
        NumberCreate numberRegisters = new NumberCreate();
        numberRegisters.setData(countNewUserList);
        return numberRegisters;
    }
}
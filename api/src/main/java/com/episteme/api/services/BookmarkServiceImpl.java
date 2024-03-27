package com.episteme.api.services;

import com.episteme.api.entity.Bookmark;
import com.episteme.api.entity.Post;
import com.episteme.api.entity.Users;
import com.episteme.api.entity.dto.BookmarkDto;
import com.episteme.api.entity.dto.PostDto;
import com.episteme.api.entity.dto.UsersDto;
import com.episteme.api.exceptions.DuplicateRecordException;
import com.episteme.api.exceptions.NotFoundException;
import com.episteme.api.repository.BookmarkRepository;
import com.episteme.api.repository.PostRepository;
import com.episteme.api.repository.UsersRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookmarkServiceImpl implements BookmarkService {
	@Autowired
	private BookmarkRepository bookmarkRepository;

	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private UsersServiceImpl usersService;
	@Autowired
	private PostServiceImpl postService;
	@Autowired
	private PostRepository postRepository;

    @Autowired
    private UsersRepository usersRepository;


    @Override
    public BookmarkDto save(BookmarkDto bookmarkDto) {
        Bookmark bookmark = this.dtoToBookmark(bookmarkDto);
        bookmark.setSaveTime(LocalDateTime.now());
        Bookmark saveBookmark = this.bookmarkRepository.save(bookmark);
        return this.bookmarkToDto(saveBookmark);
    }


	@Override
	public void delete(Long bookmarkId) {
		Bookmark bookmark = this.bookmarkRepository.findById(bookmarkId)
				.orElseThrow(() -> new NotFoundException("Can't find bookmark id: " + bookmarkId));
		this.bookmarkRepository.delete(bookmark);
	}

	public List<BookmarkDto> findBookmarkByUserId(String userId) {
		List<Bookmark> bookmarkList = bookmarkRepository.findBookmarkByUserId(userId);
		List<BookmarkDto> bookmarkDtoList = bookmarkList.stream().map(bookmark -> bookmarkToDto(bookmark))
				.collect(Collectors.toList());
		return bookmarkDtoList;
	}

	public BookmarkDto findBookmarkByUserIdAndPostId(String userId,Long postId) {
		Optional<Bookmark> bookmark = bookmarkRepository.findBookmarkByUserIdAndPostId(userId,postId);

		return bookmark.isPresent() ? bookmarkToDto(bookmark.get()) : null;
	}

    public void removeBookmark(BookmarkDto bookmarkDto) {
       Optional<Bookmark> optional = bookmarkRepository.findByPostAndUser(bookmarkDto.getPost().getId(),bookmarkDto.getUser().getId());
       Bookmark bookmark = optional.orElseThrow(() -> new NotFoundException("Không tìm thấy bookmark"));
       bookmarkRepository.delete(bookmark);
    }

    public Bookmark dtoToBookmark(BookmarkDto bookmarkDto) {
        Bookmark bookmark = new Bookmark();
        bookmark.setUser(usersRepository.findById(bookmarkDto.getUser().getId()).orElseThrow());
        bookmark.setPost(postRepository.findById(bookmarkDto.getPost().getId()).orElseThrow());
        bookmark.setBookmarkId(bookmarkDto.getId());
        bookmark.setSaveTime(bookmark.getSaveTime());

        return bookmark;
    }

	public BookmarkDto bookmarkToDto(Bookmark bookmark) {
		BookmarkDto bookmarkDto = new BookmarkDto();
		bookmarkDto.setId(bookmark.getBookmarkId());
		bookmarkDto.setSaveTime(bookmark.getSaveTime());
		// Nạp và đặt giá trị cho usersDto
		UsersDto usersDto = this.usersService.findById(bookmark.getUser().getUserId()); // Ví dụ: userService là service
																						// để lấy thông tin users
		bookmarkDto.setUser(usersDto);

		// Nạp và đặt giá trị cho postDto
		PostDto postDto = this.postService.findById(bookmark.getPost().getPostId()); // Ví dụ: postService là service để
																						// lấy thông tin post
		bookmarkDto.setPost(postDto);

		return bookmarkDto;
	}

	@Override
	public BookmarkDto update(BookmarkDto bookmarkDto, Long aLong) {
		return null;
	}

	@Override
	public List<BookmarkDto> findAll() {
		return null;
	}

	@Override
	public BookmarkDto findById(Long aLong) {
		return null;
	}
	// code 6/8
	@Override
	public Integer numberBookmarkOfUser(String userId){
		usersService.findById(userId);
		return bookmarkRepository.numberBookMarkOfUser(userId);
	}
}

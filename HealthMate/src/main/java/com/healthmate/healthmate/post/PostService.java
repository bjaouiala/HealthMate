package com.healthmate.healthmate.post;

import com.healthmate.healthmate.file.FileStorageService;
import com.healthmate.healthmate.user.User;
import com.healthmate.healthmate.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final PostMapper postMapper;
    private final FileStorageService fileStorageService;
    private final UserRepository userRepository;

    public Long savePost(PostRequest postRequest, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        User currentUser = userRepository.findById(user.getId()).orElseThrow(()-> new EntityNotFoundException("no user found for the given id"));
        Post post = postMapper.toPost(postRequest);
        post.setUser(currentUser);
        return postRepository.save(post).getId();
    }

    public Long savePostFile(MultipartFile multipartFile, Long id) {
        Post post = postRepository.findById(id).orElseThrow(()-> new EntityNotFoundException("post not found"));
        String path = fileStorageService.saveFile(multipartFile, Integer.valueOf(""+post.getId()));
        post.setPostPath(path);
        postRepository.save(post);
        return id;
    }

    public PageResponse<PostResponse> getPostByUserId( Authentication connectedUser, Integer page, Integer size) {
        User user = (User) connectedUser.getPrincipal();
        Pageable pageable = PageRequest.of(page,size, Sort.by("createdDate").descending());
        Page<Post> postResponses = postRepository.findByUserId(user.getId(),pageable);
        List<PostResponse> postResponses1 = postResponses.stream().map(postMapper::fromPost).toList();
        return new PageResponse<>(
                postResponses1,
                postResponses.getNumber(),
                postResponses.getSize(),
                postResponses.getTotalElements(),
                postResponses.getTotalPages(),
                postResponses.isFirst(),
                postResponses.isLast()

        );
    }

    public PageResponse<PostResponse> getAllPosts(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page,size, Sort.by("createdDate").descending());
        Page<Post> postResponses = postRepository.findAll(pageable);
        List<PostResponse> postResponses1 = postResponses.stream().map(postMapper::fromPost).toList();
        return new PageResponse<>(
                postResponses1,
                postResponses.getNumber(),
                postResponses.getSize(),
                postResponses.getTotalElements(),
                postResponses.getTotalPages(),
                postResponses.isFirst(),
                postResponses.isLast()
        );
    }
}

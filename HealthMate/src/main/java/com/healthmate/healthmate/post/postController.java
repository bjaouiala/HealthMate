package com.healthmate.healthmate.post;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
public class postController {
    private final PostService postService;

    @PostMapping
    public ResponseEntity<Long> savePost(@Valid @RequestBody PostRequest postRequest,Authentication connectedUser){
        return ResponseEntity.ok(postService.savePost(postRequest,connectedUser));
    }

    @PostMapping(value = "/post-file/{post-id}" ,consumes = "multipart/form-data")
    public ResponseEntity<?> SavePostFile(@RequestPart(name = "file")MultipartFile multipartFile,@PathVariable("post-id") Long id){
        return ResponseEntity.ok(postService.savePostFile(multipartFile,id));
    }

    @GetMapping("/my-post")
    public ResponseEntity<PageResponse<PostResponse>> getPostByUserId(
                                                                      Authentication connectedUser,
                                                                      @RequestParam(name = "page",defaultValue = "0",required = false) Integer page,
                                                                      @RequestParam(name = "size",defaultValue = "2",required = false) Integer size
                                                                      ){
        return ResponseEntity.ok(postService.getPostByUserId(connectedUser,page,size));

    }
    @GetMapping
    public ResponseEntity<PageResponse<PostResponse>> getAllPosts(
                                                                      @RequestParam(name = "page",defaultValue = "0",required = false) Integer page,
                                                                      @RequestParam(name = "size",defaultValue = "2",required = false) Integer size
                                                                      ){
        return ResponseEntity.ok(postService.getAllPosts(page,size));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Long> updatePost(@PathVariable("id")Long id,@RequestPart MultipartFile multipartFile){
        return null;

    }


}

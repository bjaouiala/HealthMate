package com.healthmate.healthmate.comment;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("comments")
public class CommentController {
    private final CommentsService commentsService;
    @PostMapping
    public ResponseEntity<CommentResponse> addCommentsWithPostId(@Valid @RequestBody CommentsRequest request, Authentication authentication){
        return ResponseEntity.ok(commentsService.addCommentsWithPostId(request,authentication));
    }

    @GetMapping
    public ResponseEntity<List<CommentResponse>> getCommentByPostId(@RequestParam("postId") Long postId){
        return ResponseEntity.ok(commentsService.getCommentByPostId(postId));
    }
}

package com.healthmate.healthmate.comment;

import com.healthmate.healthmate.post.Post;
import com.healthmate.healthmate.post.PostRepository;
import com.healthmate.healthmate.user.User;
import com.healthmate.healthmate.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentsService {
    private final UserRepository userRepository;
    private final CommentMapper commentMapper;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    public CommentResponse addCommentsWithPostId(CommentsRequest request, Authentication authentication) {
        User connectedUser = (User) authentication.getPrincipal();
       User user = userRepository.findById(connectedUser.getId()).orElseThrow(()->new EntityNotFoundException("no user found"));
       Post post =  postRepository.findById(request.getPostId()).orElseThrow(()-> new EntityNotFoundException("no post found"));
       Comment comment = commentMapper.toComment(request);
       comment.setPost(post);
       comment.setUser(user);
       Comment comment1 = commentRepository.save(comment);
       return CommentResponse.builder()
               .username(comment1.getUser().getFullName())
               .createdDate(comment1.getCreatedDate())
               .id(comment1.getId())
               .comment(comment1.getComment())
               .build();


    }

    public List<CommentResponse> getCommentByPostId(Long postId) {
        List<CommentResponse> commentResponses = commentRepository.findByPostId(postId).stream().map(commentMapper::fromComment).collect(Collectors.toList());

        List<String> createsBy = commentResponses.stream().map(CommentResponse::getCreatedBy).distinct()
                .toList();

        Map<String,User> userByEmail = userRepository.findByEmailIn(createsBy)
                        .stream()
                                .collect(Collectors.toMap(User::getEmail,user->user));

       List<CommentResponse> commentResponses1 = commentResponses.stream().map(comment->{
            User user = userByEmail.get(comment.getCreatedBy());
            if (user != null){
                comment.setUsername(user.getFullName());
            }
            return comment;
        }).collect(Collectors.toList());


        return commentResponses1;
    }
}

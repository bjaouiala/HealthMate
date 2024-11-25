package com.healthmate.healthmate.comment;

import org.springframework.stereotype.Service;

@Service
public class CommentMapper {
    public Comment toComment(CommentsRequest request) {
        return Comment.builder()
                .comment(request.getComment())
                .build();
    }

    public CommentResponse fromComment(Comment comment) {
        return CommentResponse.builder()
                .comment(comment.getComment())
                .createdDate(comment.getCreatedDate())
                .id(comment.getId())
                .createdBy(comment.getCreatedBy())
                .build();
    }
}

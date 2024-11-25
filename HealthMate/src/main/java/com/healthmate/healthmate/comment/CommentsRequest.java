package com.healthmate.healthmate.comment;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CommentsRequest {
    private String comment;
    private Long postId;
}

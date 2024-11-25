package com.healthmate.healthmate.comment;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Builder
@Getter
@Setter
public class CommentResponse {
    private Long id;
    private String username;
    private String comment;
    private String createdBy;
    private LocalDate createdDate;
}

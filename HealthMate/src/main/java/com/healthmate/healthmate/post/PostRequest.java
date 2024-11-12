package com.healthmate.healthmate.post;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class PostRequest {
    private String description;
    private String postPath;
}

package com.healthmate.healthmate.post;

import com.healthmate.healthmate.file.FileStorageService;
import com.healthmate.healthmate.file.FileUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PostMapper {


    public Post toPost(PostRequest postRequest) {
       return Post.builder()
                .description(postRequest.getDescription())
                .build();

    }

    public PostResponse fromPost(Post post) {
       return PostResponse.builder()
                .postFile(FileUtils.readFileFromLocation(post.getPostPath()))
                .createdDate(post.getCreatedDate())
                .description(post.getDescription())
                .build();
    }
}

package com.healthmate.healthmate.post;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostResponse {
    private String description;
    private Date createdDate;
    private String createdBy;
    private byte[] postFile;


}

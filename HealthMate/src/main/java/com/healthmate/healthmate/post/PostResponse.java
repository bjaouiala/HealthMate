package com.healthmate.healthmate.post;

import lombok.*;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostResponse {
    private Long id;
    private String description;
    private LocalDate createdDate;
    private String createdBy;
    private byte[] postFile;


}

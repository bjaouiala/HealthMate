package com.healthmate.healthmate.comment;

import com.healthmate.healthmate.post.Post;
import com.healthmate.healthmate.user.User;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
public class Comment {
    @Id
    @GeneratedValue
    private Long id;
    private String comment;
    @CreatedBy
    private String createdBy;
    @LastModifiedBy
    private String lastModifiedBy;
    @CreatedDate
    private LocalDate createdDate;
    @LastModifiedDate
    private Date lastModifiedDate;
    @ManyToOne
    private User user;
    @ManyToOne
    private Post post;

}

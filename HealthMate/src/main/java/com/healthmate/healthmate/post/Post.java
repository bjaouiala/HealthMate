package com.healthmate.healthmate.post;

import com.healthmate.healthmate.comment.Comment;
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
import java.util.List;

@Entity
@Builder
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Post {
    @Id
    @GeneratedValue
    private Long id;
    private String postPath;
    @CreatedBy
    private String createdBy;
    @LastModifiedBy
    private String lastModifiedBy;
    @CreatedDate
    private LocalDate createdDate;
    @LastModifiedDate
    private Date lastModifiedDate;
    private String description;
    @OneToMany(mappedBy = "post")
    private List<Comment> comments;
    @ManyToOne
    private User user;

}

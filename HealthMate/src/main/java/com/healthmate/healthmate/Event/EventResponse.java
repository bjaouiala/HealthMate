package com.healthmate.healthmate.Event;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

import java.time.LocalDateTime;
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class EventResponse {
    private Long id;


    private LocalDateTime createdDate;


    private String location;


    private String organizer;

    private EventStatus status;

    private String title ;
    private  String description ;
    private LocalDateTime eventDate;

}

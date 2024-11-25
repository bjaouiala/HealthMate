package com.healthmate.healthmate.Event;

import com.healthmate.healthmate.user.User;
import com.healthmate.healthmate.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private UserRepository userRepository;

    public EventResponse createEvent(Authentication authentication, Event event) {
        // Retrieve current user from Authentication
        User currentUser = (User) authentication.getPrincipal();

        // Optionally, fetch user from database (if needed)
        User user = userRepository.findById(currentUser.getId())
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID " + currentUser.getId()));

        // Set the user on the event
        event.setUser(user); // Assuming you have a setUser method in your Event class
        EventResponse eventResponse = EventResponse.builder().organizer(event.getOrganizer())
                .createdDate(event.getCreatedDate())
                .status(event.getStatus())
                .location(event.getLocation())
                .build();
        eventRepository.save(event);

        return eventResponse;

    }

    public EventResponse updateEvent(Long eventId, Authentication authentication, Event eventDetails) {
        // Retrieve current user from Authentication
        User currentUser = (User) authentication.getPrincipal();

        // Fetch user from database
        User user = userRepository.findById(currentUser.getId())
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID " + currentUser.getId()));

        // Fetch the existing event from the database
        Event existingEvent = eventRepository.findById(eventId)
                .orElseThrow(() -> new EntityNotFoundException("Event not found with ID " + eventId));

        // Check if the current user is the organizer of the event (optional)
        if (!existingEvent.getUser().getId().equals(user.getId())) {
            throw new SecurityException("You are not authorized to update this event");
        }

        // Update fields of the existing event with details from the provided event object
        existingEvent.setTitle(eventDetails.getTitle());
        existingEvent.setDescription(eventDetails.getDescription());
        existingEvent.setEventDate(eventDetails.getEventDate());
        existingEvent.setLocation(eventDetails.getLocation());
        existingEvent.setOrganizer(eventDetails.getOrganizer());
        existingEvent.setStatus(eventDetails.getStatus());

        // Save the updated event back to the database
        Event updatedEvent = eventRepository.save(existingEvent);

        // Create and return an EventResponse object
        return EventResponse.builder()
                .id(updatedEvent.getId())
                .description(updatedEvent.getDescription())
                .eventDate(updatedEvent.getEventDate())
                .organizer(updatedEvent.getOrganizer())
                .createdDate(updatedEvent.getCreatedDate())
                .status(updatedEvent.getStatus())
                .location(updatedEvent.getLocation())
                .title(updatedEvent.getTitle())  .build();// Include title if needed


    }

    // Get list of all events
    public List<EventResponse> getAllEvents() {
        return eventRepository.findAll().stream()
                .map(event -> EventResponse.builder()
                        .id(event.getId())
                        .title(event.getTitle())
                        .description(event.getDescription())
                        .eventDate(event.getEventDate())
                        .location(event.getLocation())
                        .organizer(event.getOrganizer())
                        .status(event.getStatus())
                        .createdDate(event.getCreatedDate())
                        .build())
                .collect(Collectors.toList());
    }

    // Get a single event by ID
    public EventResponse getEventById(Long eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EntityNotFoundException("Event not found with ID " + eventId));

        return EventResponse.builder()
                .title(event.getTitle())
                .description(event.getDescription())
                .eventDate(event.getEventDate())
                .location(event.getLocation())
                .organizer(event.getOrganizer())
                .status(event.getStatus())
                .createdDate(event.getCreatedDate())
                .build();
    }

    // Delete an event by ID
    public void deleteEvent(Long eventId) {
        Event existingEvent = eventRepository.findById(eventId)
                .orElseThrow(() -> new EntityNotFoundException("Event not found with ID " + eventId));

        eventRepository.delete(existingEvent);
    }
}

package com.healthmate.healthmate.Event;

import com.healthmate.healthmate.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200/events/**") // Add this line
@RestController
@RequestMapping("/events")
public class EventController {

    @Autowired
    private EventService eventService;



    @PostMapping
    public ResponseEntity<EventResponse> createEvent(@RequestBody Event event, Authentication authentication) {

        // Call service method to create an event
        EventResponse createdEvent = eventService.createEvent(authentication, event);

        return ResponseEntity.ok(createdEvent);
    }

    @PutMapping("/{eventId}")
    public ResponseEntity<EventResponse> updateEvent(@PathVariable Long eventId,
                                                     @RequestBody Event event,
                                                     Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.badRequest().body(null); // Handle case where no authenticated user is found
        }

        // Call service method to update the event
        EventResponse updatedEventResponse = eventService.updateEvent(eventId, authentication, event);

        return ResponseEntity.ok(updatedEventResponse);
    }

    // Get list of all events
    @GetMapping
    public ResponseEntity<List<EventResponse>> getAllEvents() {
        List<EventResponse> events = eventService.getAllEvents();
        return ResponseEntity.ok(events);
    }

    // Get a single event by ID
    @GetMapping("/{eventId}")
    public ResponseEntity<EventResponse> getEventById(@PathVariable Long eventId) {
        EventResponse eventResponse = eventService.getEventById(eventId);
        return ResponseEntity.ok(eventResponse);
    }

    // Delete an event by ID
    @DeleteMapping("/{eventId}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long eventId) {
        eventService.deleteEvent(eventId);
        return ResponseEntity.noContent().build(); // Return 204 No Content status
    }

}

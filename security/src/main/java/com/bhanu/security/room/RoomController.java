package com.bhanu.security.room;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomRepository roomRepository;

    // Only Admin can add new rooms
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<Room> addRoom(@RequestBody Room room) {
        room.setStatus(RoomStatus.AVAILABLE); // new rooms always start as available
        return ResponseEntity.ok(roomRepository.save(room));
    }

    // Any logged-in user (admin, receptionist, guest) can browse all rooms
    @GetMapping
    public ResponseEntity<List<Room>> getAllRooms() {
        return ResponseEntity.ok(roomRepository.findAll());
    }

    // Guests search by type; for "search by date" you'll need the Booking entity
    // (next step) to check which rooms are free for a given date range.
    @GetMapping("/search")
    public ResponseEntity<List<Room>> searchByType(@RequestParam RoomType type) {
        return ResponseEntity.ok(roomRepository.findByType(type));
    }

    // Admin or Receptionist can update room status (e.g. during check-in/check-out)
    @PreAuthorize("hasAnyRole('ADMIN','RECEPTIONIST')")
    @PatchMapping("/{id}/status")
    public ResponseEntity<Room> updateStatus(@PathVariable Integer id, @RequestParam RoomStatus status) {
        var room = roomRepository.findById(id).orElseThrow();
        room.setStatus(status);
        return ResponseEntity.ok(roomRepository.save(room));
    }
}


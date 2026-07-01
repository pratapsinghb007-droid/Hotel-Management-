package com.bhanu.security.room;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Integer> {
    List<Room> findByStatus(RoomStatus status);
    List<Room> findByType(RoomType type);
}

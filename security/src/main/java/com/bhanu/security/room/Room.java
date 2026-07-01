package com.bhanu.security.room;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "room")
public class Room {

    @Id
    @GeneratedValue
    private Integer id;

    private String roomNumber;

    @Enumerated(EnumType.STRING)
    private RoomType type;

    private Double price;

    private Integer capacity;

    @Enumerated(EnumType.STRING)
    private RoomStatus status;
}

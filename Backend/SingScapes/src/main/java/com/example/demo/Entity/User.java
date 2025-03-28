package com.example.demo.Entity;

import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Getter
@Setter
@Entity
@Table(name = "users")  // Map to "users" table in PostgreSQL
public class User {

    // Option A: Use String ID (you must provide a value)
    @Id
    private String id;

    // Option B: Use a Long ID that's auto-generated (comment out Option A above)
    // @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    // private Long id;

    @Column(nullable = true)
    private String userName;

    @Column(nullable = true)
    private String password;

    @Column(nullable = true)
    private String email;

    private String phoneNumber;

    private Boolean isAdmin;
}


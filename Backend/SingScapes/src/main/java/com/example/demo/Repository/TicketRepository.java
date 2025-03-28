package com.example.demo.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.Ticket;

public interface TicketRepository extends JpaRepository<Ticket,String> {

    List<Ticket> findAllByAttraction_Id(UUID attractionId);

    
    
}

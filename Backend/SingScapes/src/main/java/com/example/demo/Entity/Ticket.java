package com.example.demo.Entity;
import java.sql.Date;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
@Table(name = "\"Ticket\"")
public class Ticket {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = true)
    private String type;

    @Column(nullable = true)
    private String price;

    @Column(nullable = true)
    private Date date;

    // Foreign key relationship to Attraction
    @ManyToOne
    @JoinColumn(name = "attraction_id", referencedColumnName = "id")
    private Attraction attraction;

}

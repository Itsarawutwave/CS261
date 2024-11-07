package com.example.crud;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_name", nullable = false)
    private String userName;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name="eng_name", nullable = false)
    private String engName;

    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "faculty", nullable = false)
    private String faculty;

}

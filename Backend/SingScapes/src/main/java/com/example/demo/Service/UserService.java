package com.example.demo.Service;

import com.example.demo.Entity.User;
import com.example.demo.Repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserService {


    @Autowired
    private final UserRepository userRepository;

    // Constructor injection of the repository
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Create a new user.
     * If you're using a String 'id', you can generate it here (e.g., using UUID).
     */
    public User createUser(User user) {
        // If your ID is a String, generate one if it's not provided:
        if (user.getId() == null || user.getId().isEmpty()) {
            user.setId(UUID.randomUUID().toString());
        }
        return userRepository.save(user);
    }

    /**
     * Retrieve all users.
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Retrieve a user by ID. Throws an exception if not found,
     * or you could return null / optional instead.
     */
    public User getUserById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
    }

    /**
     * Retrieve a user by email.
     */
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElse(null);
    }

    /**
     * Update an existing user.
     */
    public User updateUser(String id, User userDetails) {
        User existingUser = getUserById(id); // fetch existing user or throw if not found

        // Update fields
        existingUser.setUserName(userDetails.getUserName());
        existingUser.setPassword(userDetails.getPassword());
        existingUser.setEmail(userDetails.getEmail());
        existingUser.setPhoneNumber(userDetails.getPhoneNumber());
        existingUser.setIsAdmin(userDetails.getIsAdmin());

        return userRepository.save(existingUser);
    }

    /**
     * Delete a user by ID.
     */
    public void deleteUser(String id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("Cannot delete. User not found with ID: " + id);
        }
        
        userRepository.deleteById(id);
    }
}


// package com.example.demo.Controller;

// import com.example.demo.Entity.User;
// import com.example.demo.Service.UserService;
// import com.example.demo.Service.OTPService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.jdbc.core.JdbcTemplate;
// import org.springframework.web.bind.annotation.*;
// import java.util.List;
// import java.util.Map;

// @RestController
// @RequestMapping("/users")
// public class UserController {

//     @Autowired
//     private final UserService userService;

//     @Autowired
//     private final OTPService otpService;

//     @Autowired
//     private JdbcTemplate jdbcTemplate;

    

//     public UserController(UserService userService, OTPService otpService) {
//         this.userService = userService;
//         this.otpService = otpService;
//     }

//     // CREATE
//     @PostMapping
//     public ResponseEntity<User> createUser(@RequestBody User user) {
//         User createdUser = userService.createUser(user);
        

//         return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
//     }

//     // READ ALL (Admin only)
//     @GetMapping
//     public ResponseEntity<List<User>> getAllUsers(
//             @RequestHeader("X-User-Email") String email,
//             @RequestHeader("X-OTP") String otp) {
//         // Verify OTP
//         if (!otpService.verifyOTP(email, otp)) {
//             return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//         }
        
//         // Check if user is admin
//         User user = userService.getUserByEmail(email);
//         if (user == null || !user.getIsAdmin()) {
//             return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
//         }
        
//         List<User> users = userService.getAllUsers();
//         return ResponseEntity.ok(users);
//     }

//     // READ ONE
//     @GetMapping("/{id}")
//     public ResponseEntity<User> getUserById(@PathVariable String id) {
//         User user = userService.getUserById(id);
//         return ResponseEntity.ok(user);
//     }

//     // UPDATE
//     @PutMapping("/{id}")
//     public ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody User userDetails) {
//         User updatedUser = userService.updateUser(id, userDetails);
//         return ResponseEntity.ok(updatedUser);
//     }

//     // DELETE
//     @DeleteMapping("/{id}")
//     public ResponseEntity<Void> deleteUser(@PathVariable String id) {
//         userService.deleteUser(id);
//         return ResponseEntity.noContent().build();
//     }
// }


import React, { useState, useRef } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const CustomerSupport = () => {
  const navigate = useNavigate();
  const form = useRef(); // Ref for EmailJS
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_9hb3zv8",      
        "template_4uerngi",     
        form.current,
        "ZTbt6XePuR4A_vicf"       
      )
      .then(
        (result) => {
          Swal.fire({
            title: "Email sent",
            text: "Sent",
            icon: "success",
            confirmButtonText: "OK",
          });
          setSubmitted(true);
        },
        (error) => {
          console.log("Email error:", error.text);
          alert("Something went wrong. Please try again.");
        }
      );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <main
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f4f4f4",
          padding: "24px",
        }}
      >
        <Paper
          elevation={3}
          style={{
            padding: "24px",
            maxWidth: "800px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Customer Support
          </Typography>
          <Typography variant="body1" gutterBottom>
            Have a question or need assistance? Fill out the form below, and
            we'll get back to you as soon as possible.
          </Typography>

          {submitted ? (
            <Typography
              variant="h6"
              style={{ color: "green", marginTop: "16px" }}
            >
              Thank you for contacting us! We'll respond shortly.
            </Typography>
          ) : (
            <Box
              component="form"
              ref={form}
              onSubmit={handleSubmit}
              style={{ marginTop: "16px" }}
            >
              <TextField
                name="user_name"
                label="Your Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <TextField
                name="user_email"
                label="Your Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                name="message"
                label="Your Message"
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: "16px" }}
              >
                Submit
              </Button>
            </Box>
          )}
        </Paper>
      </main>
      <footer
        style={{
          backgroundColor: "#00002a",
          color: "white",
          textAlign: "center",
          padding: "16px",
          fontSize: "14px",
        }}
      >
        &copy; 2025 SingScape. Created by Group FDAC - SC2006.
      </footer>
    </div>
  );
};

export default CustomerSupport;

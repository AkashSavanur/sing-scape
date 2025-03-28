import React, { useState, useEffect } from "react";
import { Button, Grid, TextField, Box, Paper } from "@mui/material";
import Navbar from "../Components/Navbar";

const ManageAttractionsScreen = () => {
  const [attractions, setAttractions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Add Attraction");
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    location: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    loadAttractions();
  }, []);

  const loadAttractions = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setAttractions([
        {
          id: 1,
          name: "Marina Bay Sands",
          description: "Iconic hotel with a skyway and infinity pool.",
          location: "10 Bayfront Ave, Singapore",
          image: "https://example.com/marina-bay-sands.jpg",
        },
        {
          id: 2,
          name: "Gardens by the Bay",
          description: "Futuristic park with supertree structures.",
          location: "18 Marina Gardens Dr, Singapore",
          image: "https://example.com/gardens-by-the-bay.jpg",
        },
      ]);
      setLoading(false);
    }, 1000);
  };

  const openModal = (title, attraction = null) => {
    setModalTitle(title);
    if (attraction) {
      setFormData(attraction);
    } else {
      setFormData({
        id: "",
        name: "",
        description: "",
        location: "",
        image: "",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      // Update existing attraction
      setAttractions((prevAttractions) =>
        prevAttractions.map((item) =>
          item.id === formData.id ? { ...item, ...formData } : item
        )
      );
      showToast("Attraction updated successfully!");
    } else {
      // Add new attraction
      setAttractions((prevAttractions) => [
        ...prevAttractions,
        { ...formData, id: Date.now() },
      ]);
      showToast("Attraction added successfully!");
    }
    closeModal();
  };

  const handleDeleteAttraction = (id) => {
    if (window.confirm("Are you sure you want to delete this attraction?")) {
      setAttractions((prevAttractions) =>
        prevAttractions.filter((item) => item.id !== id)
      );
      showToast("Attraction deleted successfully!");
    }
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main
        className="container"
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "24px",
        }}
      >
        <Paper elevation={3} style={{ padding: "24px", width: "100%", maxWidth: "1200px" }}>
          <h1>Manage Attractions</h1>

          <Button
            variant="contained"
            color="primary"
            onClick={() => openModal("Add Attraction")}
            style={{ marginBottom: "1.5rem" }}
          >
            ＋ Add New Attraction
          </Button>

          {toastMessage && (
            <Box
              style={{
                backgroundColor: "#28a745",
                color: "white",
                padding: "10px",
                borderRadius: "6px",
                marginBottom: "16px",
              }}
            >
              {toastMessage}
            </Box>
          )}

          {/* Loading Spinner */}
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div className="spinner"></div>
              <p>Loading attractions...</p>
            </div>
          ) : (
            <Grid container spacing={3} justifyContent="center">
              {attractions.map((attraction) => (
                <Grid item xs={12} sm={6} md={4} key={attraction.id}>
                  <Box
                    className="attraction-card"
                    style={{
                      backgroundColor: "white",
                      borderRadius: "12px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      padding: "1.5rem",
                    }}
                  >
                    <img
                      src={attraction.image}
                      alt={attraction.name}
                      className="attraction-image"
                      style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }}
                    />
                    <div className="attraction-name" style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                      {attraction.name}
                    </div>
                    <div className="attraction-description" style={{ fontSize: "0.9rem", color: "#666" }}>
                      {attraction.description}
                    </div>
                    <div className="attraction-location" style={{ fontSize: "0.9rem", color: "#007bff" }}>
                      📍 {attraction.location}
                    </div>
                    <Box className="attraction-actions" style={{ display: "flex", gap: "1rem" }}>
                      <Button
                        className="action-button update"
                        variant="contained"
                        color="primary"
                        onClick={() => openModal("Update Attraction", attraction)}
                      >
                        Update
                      </Button>
                      <Button
                        className="action-button delete"
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDeleteAttraction(attraction.id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </Paper>
      </main>

      {/* Footer */}
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

      {/* Attraction Form Modal */}
      {isModalOpen && (
        <Box
          className="modal"
          style={{
            display: "flex",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <Box
            className="modal-content"
            style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "12px",
              width: "90%",
              maxWidth: "500px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <span
              className="close-btn"
              onClick={closeModal}
              style={{ float: "right", fontSize: "1.5rem", cursor: "pointer" }}
            >
              &times;
            </span>
            <h2>{modalTitle}</h2>
            <form onSubmit={handleFormSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    variant="outlined"
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    fullWidth
                    required
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Location"
                    variant="outlined"
                    name="location"
                    value={formData.location}
                    onChange={handleFormChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Image URL"
                    variant="outlined"
                    name="image"
                    value={formData.image}
                    onChange={handleFormChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Box display="flex" justifyContent="center" marginTop="16px">
                  <Button type="submit" variant="contained" color="primary">
                    Save
                  </Button>
                </Box>
              </Grid>
            </form>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default ManageAttractionsScreen;

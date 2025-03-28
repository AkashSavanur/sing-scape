import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import AttractionCard from "../Components/AttractionCard";
import { TextField, MenuItem, Select, FormControl, InputLabel, Grid, Box } from "@mui/material";

const uss = "/Images/uss.jpeg";
const flyer = "/Images/flyer.jpg";
const museum = "/Images/museum.jpeg";
const zoo = "/Images/zoo.jpg";

const attractionsData = [
  {
    id: 1,
    name: "Universal Studios Singapore",
    description: "A world-class theme park with thrilling rides and attractions.",
    image: uss,
    rating: 4.8,
    price: 80,
    type: "Theme Park",
    location: "Sentosa",
  },
  {
    id: 2,
    name: "Singapore Zoo",
    description: "One of the best wildlife parks with interactive exhibits.",
    image: zoo,
    rating: 4.7,
    price: 45,
    type: "Zoo",
    location: "Mandai",
  },
  {
    id: 3,
    name: "ArtScience Museum",
    description: "An iconic museum featuring futuristic exhibitions.",
    image: museum,
    rating: 4.5,
    price: 25,
    type: "Museum",
    location: "Marina Bay",
  },
  {
    id: 4,
    name: "Singapore Flyer",
    description: "View the beautiful skyline from a bird's view.",
    image: flyer,
    rating: 4.8,
    price: 40,
    type: "Viewing",
    location: "Marina Bay",
  },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("None");

  const filteredAttractions = attractionsData.filter(
    (attraction) =>
      attraction.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "All" || attraction.type === selectedCategory)
  );

  const sortedAttractions = [...filteredAttractions].sort((a, b) => {
    if (sortBy === "Price") return a.price - b.price;
    if (sortBy === "Rating") return b.rating - a.rating;
    if (sortBy === "Location") return a.location.localeCompare(b.location);
    return 0;
  });

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main style={{ flex: 1, padding: "24px", backgroundColor: "#f4f4f4" }}>
        {/* Search and Filter Section */}
        <Box display="flex" justifyContent="center" marginBottom="24px">
          <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ maxWidth: "800px" }}>
            {/* Search Input */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Search attractions..."
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Grid>

            {/* Filter Dropdown */}
            <Grid item xs={6} sm={3}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Filter by</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  label="Filter by"
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Theme Park">Theme Park</MenuItem>
                  <MenuItem value="Zoo">Zoo</MenuItem>
                  <MenuItem value="Museum">Museum</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Sort Dropdown */}
            <Grid item xs={6} sm={3}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Sort by</InputLabel>
                <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} label="Sort by">
                  <MenuItem value="None">None</MenuItem>
                  <MenuItem value="Price">Price</MenuItem>
                  <MenuItem value="Rating">Rating</MenuItem>
                  <MenuItem value="Location">Location</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}>
          {sortedAttractions.length > 0 ? (
            sortedAttractions.map((attraction) => (
              <AttractionCard key={attraction.id} attraction={attraction} />
            ))
          ) : (
            <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold" }}>No attractions found.</p>
          )}
        </div>
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
}
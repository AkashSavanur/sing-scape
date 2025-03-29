import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import AttractionCard from "../Components/AttractionCard";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Box,
} from "@mui/material";
import axios from "axios";

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("None");
  const [attractionsData, setAttractionsData] = useState([]);

  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        const response = await axios.get("http://localhost:8080/attractions");
        console.log(response);
        setAttractionsData(response.data);
      } catch (error) {
        console.error("Failed to fetch attractions:", error);
      }
    };

    fetchAttractions();
  }, []);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:8080/attractions", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  });

  const filteredAttractions = attractionsData.filter(
    (attraction) =>
      attraction.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "All" || attraction.type === selectedCategory)
  );

  const sortedAttractions = [...filteredAttractions].sort((a, b) => {
    if (sortBy === "Price") return a.price - b.price; // will be ignored if price not present
    if (sortBy === "Rating") return b.rating - a.rating;
    if (sortBy === "Location") return a.location.localeCompare(b.location);
    return 0;
  });

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Navbar />

      <main style={{ flex: 1, padding: "24px", backgroundColor: "#f4f4f4" }}>
        <Box display="flex" justifyContent="center" marginBottom="24px">
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            style={{ maxWidth: "800px" }}
          >
            <Grid item xs={12} sm={6}>
              <TextField
                label="Search attractions..."
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Grid>

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
                  <MenuItem value="Viewing">Viewing</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} sm={3}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Sort by</InputLabel>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  label="Sort by"
                >
                  <MenuItem value="None">None</MenuItem>
                  <MenuItem value="Rating">Rating</MenuItem>
                  <MenuItem value="Location">Location</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "center",
          }}
        >
          {sortedAttractions.length > 0 ? (
            sortedAttractions.map((attraction, index) => (
              <AttractionCard key={index} attraction={attraction} />
            ))
          ) : (
            <p
              style={{
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              No attractions found.
            </p>
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

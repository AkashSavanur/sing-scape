import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import AttractionCard from "../Components/AttractionCard";
import {
  TextField,
  Button,
  Box,
  Paper,
  Grid,
} from "@mui/material";
import supabase from "../helper/SupabaseClient";

export default function ProfileScreen() {
  const [user, setUser] = useState({ name: "", phoneNumber: "", email: "" });
  const [editingField, setEditingField] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) return;

      const { data: profile } = await supabase
        .from("Profile")
        .select("full_name, phone_no, email")
        .eq("user_id", user.id)
        .single();
      
      if (profile) {
        setUser({
          name: profile.full_name,
          phoneNumber: profile.phone_no,
          email: profile.email,
        });
      }
    };
    fetchUserData();
  }, []);

  const handleEditField = (field) => {
    setEditingField(field);
  };

  const handleChange = (field, value) => {
    setUser({ ...user, [field]: value });
  };

  const handleSaveProfile = async () => {
    await supabase
      .from("Profile")
      .update({
        full_name: user.name,
        phone_no: user.phoneNumber,
        email: user.email,
      })
      .eq("user_id", user.id);

    setEditingField(null);
  };

/*   if (!user) return <div>Loading...</div>; */

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
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
          <h1>Profile Management</h1>
          <Box>
            <h2>Edit Profile</h2>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  value={user.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  fullWidth
                  disabled={editingField !== "name"}
                />
                <Button onClick={() => handleEditField(editingField === "name" ? null : "name")}>
                  {editingField === "name" ? "Cancel" : "Edit Name"}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  value={user.email}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone Number"
                  value={user.phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  fullWidth
                  disabled={editingField !== "phoneNumber"}
                />
                <Button onClick={() => handleEditField(editingField === "phoneNumber" ? null : "phoneNumber")}>
                  {editingField === "phoneNumber" ? "Cancel" : "Edit Phone"}
                </Button>
              </Grid>
            </Grid>
            {editingField && (
              <Button variant="contained" onClick={handleSaveProfile}>
                Save Changes
              </Button>
            )}
          </Box>
        </Paper>
      </main>
      <footer style={{ backgroundColor: "#00002a", color: "white", textAlign: "center", padding: "16px" }}>
        &copy; 2025 SingScape. Created by Group FDAC - SC2006.
      </footer>
    </div>
  );
}
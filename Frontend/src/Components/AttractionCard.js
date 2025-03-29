import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const AttractionCard = ({ attraction }) => {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate(`/attraction/${encodeURIComponent(attraction.name)}`);
  };

  const imageSrc = `/Images/${attraction.name}.jpeg` || placeholderImage;

  return (
    <Card style={{ width: 300, margin: "16px", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
      <CardMedia
        component="img"
        height="140"
        image={imageSrc}
        alt={attraction.name}
      />
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {attraction.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {attraction.description}
        </Typography>
        <Typography variant="body2" style={{ marginTop: "4px" }}>
          <strong>Type:</strong> {attraction.type} | <strong>Location:</strong> {attraction.location}
        </Typography>
        <Typography variant="body2" style={{ fontWeight: "bold", marginTop: "8px" }}>
          Rating: ⭐ {attraction.rating}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "12px", width: "100%" }}
          onClick={handleBooking}
        >
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default AttractionCard;

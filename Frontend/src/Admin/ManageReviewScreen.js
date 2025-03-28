import React, { useState } from 'react';
import Navbar from '../Components/Navbar';

const ManageReviewScreen = () => {
  const [reviews, setReviews] = useState([
    { id: 1, content: 'This is a great place!', flagged: false },
    { id: 2, content: 'I had a wonderful experience.', flagged: false },
    { id: 3, content: 'The service was excellent.', flagged: false },
  ]);

  const handleFlag = (id) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, flagged: !review.flagged } : review
    ));
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this review?');
    if (confirmDelete) {
      setReviews(reviews.filter(review => review.id !== id));
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{ flex: 1, padding: "24px", backgroundColor: "#f4f4f4", alignItems: 'center', justifyContent: "center", textAlign: "center" }}>
        <h1 style={styles.header}>Manage Reviews</h1>
        <div style={styles.reviewList}>
          {reviews.map(review => (
            <div key={review.id} style={styles.reviewItem}>
              <p>{review.content}</p>
              <div style={styles.buttonContainer}>
                <button 
                  style={review.flagged ? styles.flaggedButton : styles.flagButton} 
                  onClick={() => handleFlag(review.id)}
                >
                  {review.flagged ? 'Unflag' : 'Flag'}
                </button>
                <button 
                  style={styles.deleteButton} 
                  onClick={() => handleDelete(review.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
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
};

const styles = {
  header: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '24px',
  },
  reviewList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '80%',
    margin: '0 auto',
  },
  reviewItem: {
    backgroundColor: '#ffffff',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    display: 'flex',
    gap: '8px',
  },
  flagButton: {
    backgroundColor: '#ffcc00',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 16px',
    cursor: 'pointer',
  },
  flaggedButton: {
    backgroundColor: '#ff6666',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 16px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 16px',
    cursor: 'pointer',
    color: '#ffffff',
  },
};

export default ManageReviewScreen;
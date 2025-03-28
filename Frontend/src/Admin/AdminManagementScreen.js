import React from 'react';
import Navbar from '../Components/Navbar';

const AdminManagementScreen = () => {
  const handleNavigation = (url) => {
    window.location.href = url;
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar />

      <main style={{ flex: 1, padding: "24px", backgroundColor: "#f4f4f4", alignItems: 'center', justifyContent: "center", textAlign: "center" }}>
        <h1 style={styles.header}>Admin Management</h1>
        <div style={styles.gridContainer}>
          <div style={styles.gridItem} onClick={() => handleNavigation('/admin/manage-user')}>
            <span style={styles.icon}>👤</span>
            <span style={styles.label}>Manage User</span>
          </div>
          <div style={styles.gridItem} onClick={() => handleNavigation('/admin/manage-partner')}>
            <span style={styles.icon}>🤝</span>
            <span style={styles.label}>Manage Partner</span>
          </div>
          <div style={styles.gridItem} onClick={() => handleNavigation('/admin/manage-attraction')}>
            <span style={styles.icon}>🏞️</span>
            <span style={styles.label}>Manage Attraction</span>
          </div>
          <div style={styles.gridItem} onClick={() => handleNavigation('/admin/manage-review')}>
            <span style={styles.icon}>📝</span>
            <span style={styles.label}>Manage Review</span>
          </div>
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
  // General Styles
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f0f2f5',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },

  // Header style
  header: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '24px',
  },

  // Grid Layout
  gridContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    flexWrap: 'wrap',
  },

  // Grid Item
  gridItem: {
    backgroundColor: '#ffffff',
    border: '1px solid #e0e0e0',
    borderRadius: '15px',
    padding: '25px',
    width: '22%',
    minWidth: '150px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textDecoration: 'none',
    color: 'inherit',
    cursor: 'pointer',
  },

  // Icon style
  icon: {
    fontSize: '36px',
    marginBottom: '10px',
  },

  // Label style
  label: {
    fontSize: '18px',
    fontWeight: 'bold',
  },

  // Footer style
  footer: {
    backgroundColor: '#00002a',
    color: 'white',
    textAlign: 'center',
    padding: '16px',
    fontSize: '14px',
    width: '100%',
    marginTop: 'auto',
  },
};

export default AdminManagementScreen;

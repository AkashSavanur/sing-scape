import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';

// Inline styles for the component (you can move these to a separate CSS file if needed)
const styles = {
  container: {
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
  },
  header: {
    background: '#ffffff',
    padding: '1rem 2rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  loadingSpinner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    padding: '2rem',
  },
  spinner: {
    border: '4px solid rgba(0, 0, 0, 0.1)',
    borderLeftColor: '#007bff',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite',
  },
  gridContainer: {
    marginTop: '2rem',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  },
  userItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem',
    borderBottom: '1px solid #eee',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  userAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'linear-gradient(45deg, #007bff, #00b4d8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  userStatus: {
    fontSize: '0.875rem',
    color: '#666',
  },
  banButton: {
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  banButtonDisabled: {
    background: '#e9ecef',
    color: '#adb5bd',
    cursor: 'not-allowed',
  },
  unbanButton: {
    background: 'linear-gradient(45deg, #4CAF50, #66bb6a)',
    color: 'white',
  },
  toast: {
    position: 'fixed',
    bottom: '30px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(0, 0, 0, 0.9)',
    color: 'white',
    padding: '15px 30px',
    borderRadius: '8px',
    opacity: 0,
    visibility: 'hidden',
    transition: 'all 0.3s ease',
    zIndex: 1000,
  },
  toastShow: {
    opacity: 1,
    visibility: 'visible',
  },
};

const ManageUsersScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    // Simulating async loading of user data
    setTimeout(() => {
      setUsers([
        { id: 1, name: 'Alice', isBanned: false },
        { id: 2, name: 'Bob', isBanned: true },
        { id: 3, name: 'Charlie', isBanned: false },
        { id: 4, name: 'Diana', isBanned: true },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleBanToggle = (userId) => {
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.map((user) =>
        user.id === userId ? { ...user, isBanned: !user.isBanned } : user
      );
      return updatedUsers;
    });
    showToast(`User ${userId} has been ${users.find(u => u.id === userId).isBanned ? 'unbanned' : 'banned'}`);
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{ flex: 1, padding: "24px", backgroundColor: "#f4f4f4", alignItems: 'center', justifyContent: "center", textAlign: "center" }}>

        <h1>Manage Users</h1>
        {loading ? (
          <div style={styles.loadingSpinner}>
            <div style={styles.spinner}></div>
            <p>Loading users...</p>
          </div>
        ) : (
          <div style={styles.gridContainer}>
            {users.map((user) => (
              <div key={user.id} style={styles.userItem}>
                <div style={styles.userInfo}>
                  <div style={styles.userAvatar}>{user.name.charAt(0)}</div>
                  <div>
                    <div>{user.name}</div>
                    <div style={styles.userStatus}>{user.isBanned ? '🚫 Banned' : '✅ Active'}</div>
                  </div>
                </div>
                <button
                  style={{
                    ...styles.banButton,
                    ...(user.isBanned ? styles.unbanButton : {}),
                    ...(user.isBanned ? styles.banButtonDisabled : {}),
                  }}
                  onClick={() => handleBanToggle(user.id)}
                  disabled={user.isBanned}
                >
                  {user.isBanned ? 'Unban User' : 'Ban User'}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Toast */}
        {toastMessage && (
          <div style={{ ...styles.toast, ...(toastMessage ? styles.toastShow : {}) }}>
            {toastMessage}
          </div>
        )}
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

export default ManageUsersScreen;

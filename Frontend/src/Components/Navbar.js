import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  // 从localStorage获取用户信息（假设登录时存储了用户数据）
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <header
      style={{
        position: 'sticky',
        backgroundColor: "#fff",
        color: "black",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 32px",
        fontSize: "32px",
        fontWeight: "bold",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* SingScape Logo */}
      <span onClick={() => navigate('/home')} style={{ cursor: "pointer" }}>
        SingScape
      </span>

      {/* Navigation Buttons */}
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        {/* 管理员专属按钮 */}
        {user?.isAdmin && (
          <button
            style={{
              backgroundColor: "transparent",
              border: "2px solid black",
              padding: "8px 16px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              borderRadius: "5px",
              transition: "all 0.3s ease",
              color: "black"
            }}
            onClick={() => navigate("/admin/manage-review")}
          >
            Manage Reviews
          </button>
        )}

        {/* Customer Support Button */}
        <button
          style={{
            backgroundColor: "transparent",
            border: "2px solid black",
            padding: "8px 16px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            borderRadius: "5px",
            transition: "all 0.3s ease",
            color: "black"
          }}
          onClick={() => navigate("/customer-support")}
        >
          Customer Support
        </button>

        {/* Profile Button */}
        {user?.token && (
          <button
            style={{
              backgroundColor: "black",
              color: "white",
              border: "none",
              padding: "8px 16px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              borderRadius: "5px",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#333")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "black")}
            onClick={() => navigate(`/profile`)}
          >
            Profile
          </button>
        )}

        {/* 登录/注册按钮 */}
        {!user?.token && (
          <>
            <button
              style={{
                backgroundColor: "transparent",
                border: "2px solid black",
                padding: "8px 16px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                borderRadius: "5px",
                transition: "all 0.3s ease",
                color: "black"
              }}
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              style={{
                backgroundColor: "black",
                color: "white",
                border: "none",
                padding: "8px 16px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                borderRadius: "5px",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#333")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "black")}
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
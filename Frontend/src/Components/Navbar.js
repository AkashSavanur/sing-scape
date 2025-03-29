import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../helper/SupabaseClient";
import Swal from "sweetalert2";


const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be signed out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, sign me out"
    });
  
    if (result.isConfirmed) {
      await supabase.auth.signOut();
      setUser(null);
      Swal.fire("Signed out!", "You have been successfully signed out.", "success");
      navigate("/login");
    }
  };

  return (
    <header
      style={{
        position: "sticky",
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
      <span onClick={() => navigate('/home')} style={{ cursor: "pointer" }}>
        SingScape
      </span>

      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        {/* Optional admin check (if you store role info in user metadata) */}
        {user?.user_metadata?.isAdmin && (
          <button
            style={buttonStyle}
            onClick={() => navigate("/admin/manage-review")}
          >
            Manage Reviews
          </button>
        )}

        <button
          style={buttonStyle}
          onClick={() => navigate("/customer-support")}
        >
          Customer Support
        </button>

        {user ? (
          <>
            <button
              style={filledButtonStyle}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#333")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "black")}
              onClick={() => navigate("/profile")}
            >
              Profile
            </button>

            <button
              style={buttonStyle}
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <button
              style={buttonStyle}
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              style={filledButtonStyle}
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

const buttonStyle = {
  backgroundColor: "transparent",
  border: "2px solid black",
  padding: "8px 16px",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
  borderRadius: "5px",
  transition: "all 0.3s ease",
  color: "black"
};

const filledButtonStyle = {
  backgroundColor: "black",
  color: "white",
  border: "none",
  padding: "8px 16px",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
  borderRadius: "5px",
  transition: "all 0.3s ease",
};

export default Navbar;

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "./helper/SupabaseClient";
import LandingScreen from "./Pages/LandingScreen";
import SignUpScreen from "./Pages/SignUpScreen";
import LoginScreen from "./Pages/LoginScreen";
import ResetPasswordScreen from "./Pages/ResetPasswordScreen";
import HomeScreen from "./Pages/HomeScreen";
import UniversalStudiosScreen from "./Pages/UniversalStudiosScreen";
import SingaporeZooScreen from "./Pages/SingaporeZooScreen";
import ArtScienceMuseumScreen from "./Pages/ArtScienceMusuemScreen";
import SingaporeFlyerScreen from "./Pages/SingaporeFlyer";
import CustomerSupport from "./Pages/CustomerSupport";
import AdminManagementScreen from "./Admin/AdminManagementScreen";
import ManageUsersScreen from "./Admin/ManageUsersScreen";
import ManageAttractionsScreen from "./Admin/ManageAttractionsScreen";
import ManagePartnerScreen from "./Admin/ManagePartnerScreen";
import ManageReviewScreen from "./Admin/ManageReviewScreen";
import ProfileScreen from "./Pages/ProfileScreen";
import PaymentScreen from "./Pages/PaymentScreen";

function ProtectedRoute({ element }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    checkUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  return user ? element : <Navigate to="/login" replace />;
}

function AdminRoute({ element }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profile")
          .select("is_admin")
          .eq("user_id", user.id)
          .single();
        setUser(user);
        setIsAdmin(profile?.is_admin || false);
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  return user /* && isAdmin */ ? element : <Navigate to="/" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/reset-password" element={<ResetPasswordScreen />} />
        <Route path="/home" element={<ProtectedRoute element={<HomeScreen />} />} />
        <Route path="/attraction/1" element={<ProtectedRoute element={<UniversalStudiosScreen />} />} />
        <Route path="/attraction/2" element={<ProtectedRoute element={<SingaporeZooScreen />} />} />
        <Route path="/attraction/3" element={<ProtectedRoute element={<ArtScienceMuseumScreen />} />} />
        <Route path="/attraction/4" element={<ProtectedRoute element={<SingaporeFlyerScreen />} />} />
        <Route path="/customer-support" element={<ProtectedRoute element={<CustomerSupport />} />} />
        <Route path="/profile" element={<ProtectedRoute element={<ProfileScreen />} />} />
        <Route path="/payment" element={<ProtectedRoute element={<PaymentScreen />} />} />
        <Route path="/admin" element={<AdminRoute element={<AdminManagementScreen />} />} />
        <Route path="/admin/manage-user" element={<AdminRoute element={<ManageUsersScreen />} />} />
        <Route path="/admin/manage-attraction" element={<AdminRoute element={<ManageAttractionsScreen />} />} />
        <Route path="/admin/manage-partner" element={<AdminRoute element={<ManagePartnerScreen />} />} />
        <Route path="/admin/manage-review" element={<AdminRoute element={<ManageReviewScreen />} />} />
      </Routes>
    </Router>
  );
}

export default App;
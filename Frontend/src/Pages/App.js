import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingScreen from "./Pages/LandingScreen";
import SignUpScreen from "./Pages/SignUpScreen";
import LoginScreen from "./Pages/LoginScreen";
import HomeScreen from "./Pages/HomeScreen";
import UniversalStudiosScreen from "./Pages/UniversalStudiosScreen";
import SingaporeZooScreen from "./Pages/SingaporeZooScreen";
import ArtScienceMuseumScreen from "./Pages/ArtScienceMusuemScreen";
import SingaporeFlyerScreen from "./Pages/SingaporeFlyer";
import CustomerSupport from "./Pages/CustomerSupport";
import AdminManagementScreen from "./Admin/AdminManagementScreen";
import ManageUsersScreen from "./Admin/ManageUsersScreen";
import ManageAttractionsScreen from "./Admin/ManageAttractionsScreen";
import ManageReviewScreen from "./Admin/ManageReviewScreen";  // 新增导入
import ProfileScreen from "./Pages/ProfileScreen";
import PaymentScreen from "./Pages/PaymentScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/attraction/1" element={<UniversalStudiosScreen />} />
        <Route path="/attraction/2" element={<SingaporeZooScreen />} />
        <Route path="/attraction/3" element={<ArtScienceMuseumScreen />} />
        <Route path="/attraction/4" element={<SingaporeFlyerScreen />} />
        <Route path="/customer-support" element={<CustomerSupport />} />
        <Route path="/admin" element={<AdminManagementScreen />} />
        <Route path="/admin/manage-user" element={<ManageUsersScreen />} />
        <Route path="/admin/manage-attraction" element={<ManageAttractionsScreen />} />
        <Route path="/admin/manage-review" element={<ManageReviewScreen />} />  {/* 新增路由 */}
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
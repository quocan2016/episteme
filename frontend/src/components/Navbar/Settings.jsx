import { MenuItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

const SettingItem = ({ onClick, label }) => {
  return (
    <>
      <MenuItem onClick={onClick}>
        <Typography textAlign="center">{label}</Typography>
      </MenuItem>
    </>
  );
};

// const settings = ["Tài khoản", "Thông báo", "Dashboard", "Đăng xuất"];
const Settings = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const handleOpenUserProfile = () => navigate(`/profile/me`);
  const handleOpenNotifications = () => console.log("Open Notification");
  const handleOpenDraftPosts = () => console.log("Open Draft");
  const handleOpenAdminPage = () => navigate("/admin");
  const handleLogout = async () => {
    localStorage.removeItem("token_episteme");
    setUser(null);
    navigate("/");
    //  if (location.pathname.includes("profile")) {
    //    navigate("/");
    //  } else {
    //    const indexOfSplash = location.pathname.lastIndexOf("/");
    //    const path = location.pathname.slice(indexOfSplash);
    //    navigate(path);
    //  }
  };
  return (
    <>
      {user.role == "ADMIN" && (
        <SettingItem onClick={handleOpenAdminPage} label="Admin" />
      )}
      <SettingItem onClick={handleOpenUserProfile} label="Tài khoản" />
      <SettingItem onClick={handleOpenNotifications} label="Thông báo" />
      <SettingItem onClick={handleOpenDraftPosts} label="Bài viết nháp" />
      <SettingItem onClick={handleLogout} label="Đăng xuất" />
    </>
  );
};

export default Settings;

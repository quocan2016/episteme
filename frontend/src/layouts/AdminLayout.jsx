import SidebarAdmin from "../components/SideBarAdmin";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import TopbarAdmin from "../components/TopBarAdmin";
import { useAuth } from "../context/auth-context";
import ErrorPage from "./../pages/user/error/ErrorPage";
import { useEffect } from "react";

const AdminLayout = () => {
  const { user } = useAuth();
  useEffect(() => {
    document.title = "Admin";
  }, []);
  if (!user || user.role != "ADMIN") return <ErrorPage />;
  return (
    <ProSidebarProvider>
      <Box display="flex" position="relative">
        <SidebarAdmin />
        <Box
          sx={{
            height: "100%",
            width: "100%",
          }}>
          <TopbarAdmin />
          <Outlet></Outlet>
        </Box>
      </Box>
    </ProSidebarProvider>
  );
};

export default AdminLayout;

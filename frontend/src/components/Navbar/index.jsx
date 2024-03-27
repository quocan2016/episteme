import { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useMode } from "../../context/mode-context";
import MenuIcon from "@mui/icons-material/Menu";
import EditIcon from "@mui/icons-material/Edit";
// import NotificationsIcon from "@mui/icons-material/Notifications";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { flexRowMobile, getBackgroundColor } from "./style";
import { tokens } from "../../constants/theme";
import NavbarLogo from "./NavbarLogo";
import NavLinkButton from "./NavLinkButton";
import SearchIcon from "@mui/icons-material/Search";
import SearchBox from "./SearchBox";
import Settings from "./Settings";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

const pages = [
  {
    text: "Trang chủ",
    to: "/",
  },
  {
    text: "Bài viết",
    to: "/posts",
  },
  {
    text: "Về chúng tôi",
    to: "/aboutUs",
  },
];

function Navbar() {
  const { theme, toggleColorMode } = useMode();
  const { user } = useAuth();

  const token = tokens(theme.palette.mode);
  const textColor = token.text;

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [showSearchBox, setShowSearchBox] = useState(false);

  const handleOpenSearch = () => {
    setShowSearchBox(true);
  };

  const handleCloseSearch = () => {
    setShowSearchBox(false);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundImage: "none",
        backgroundColor: getBackgroundColor(theme),
        height: "64px",
        "& .logo": {
          color: textColor,
          display: {
            xs: "none",
            md: "flex",
          },
          textDecoration: "none",
        },
        "& .logo--sm .logo-img__container": {
          display: "none",
        },
        "& .logo__img": {
          width: 60,
          height: "auto",
          display: { xs: "none", md: "flex" },
          mr: 2,
        },
        "& .logo__text": {
          color: textColor,
        },
        "& .logo--sm": {
          color: textColor,
          display: {
            xs: "flex",
            md: "none",
          },
          textDecoration: "none",
          columnGap: 2,
          "& .logo__text": {
            marginRight: "auto",
          },
          "& .logo__text-sub": {
            display: "none",
          },
        },
        "& .logo__img--sm": {
          width: 60,
          height: "auto",
          display: { xs: "block", md: "none" },
        },

        "& .page__nav": {
          textDecoration: "none",
          color: textColor,
        },
        "& .page__nav.active": {
          color: token.greenAccent,
        },
        "& .btn__login, & .btn__register": {
          color: textColor,
          borderColor: "currentColor",
          borderRadius: 5,
        },
      }}>
      <Container
        maxWidth="lg"
        sx={{
          height: "100%",
        }}>
        {showSearchBox && <SearchBox onClose={handleCloseSearch} />}

        {!showSearchBox && (
          <Toolbar
            disableGutters
            sx={{
              alignItems: "center",
              height: "100%",
              justifyContent: {
                xs: "space-between",
                md: "center",
              },
              "& .logo__container--sm": {
                marginRight: "auto",
              },
            }}>
            <NavbarLogo type="tablet" />
            <Box
              sx={{
                flexGrow: 0,
                display: { xs: "flex", md: "none" },
              }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                  "& a": {
                    textDecoration: "none",
                    color: textColor,
                  },
                }}>
                {/* <MenuItem>
                           <IconButton
                              className="button__switch-theme"
                              onClick={toggleColorMode}
                           >
                              {theme.palette.mode === "dark" ? (
                                 <Box
                                    display="flex"
                                    alignItems="center"
                                    gap="12px"
                                 >
                                    <DarkModeOutlinedIcon /> Dark
                                 </Box>
                              ) : (
                                 <Box
                                    display="flex"
                                    alignItems="center"
                                    gap="12px"
                                 >
                                    <LightModeOutlinedIcon /> Light
                                 </Box>
                              )}
                           </IconButton>
                        </MenuItem> */}
                {pages.map(({ text, to }) => (
                  <MenuItem key={to} onClick={handleCloseNavMenu}>
                    <NavLink to={to}>
                      <Typography textAlign="center">{text}</Typography>
                    </NavLink>
                  </MenuItem>
                ))}
                {user && (
                  <MenuItem>
                    <NavLinkButton
                      to="/create-post"
                      variant="outlined"
                      sx={{
                        color: textColor,
                        borderColor: "currentColor",
                        borderRadius: 5,
                      }}
                      startIcon={<EditIcon color={"inherit"} />}
                      buttonText="Viết bài"
                    />
                  </MenuItem>
                )}
              </Menu>
            </Box>
            <Box className="logo__container--sm" sx={flexRowMobile()}>
              <NavbarLogo type="mobile" />
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                // display: { xs: "none", md: "flex" },
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                "& .page__container": {
                  display: "flex",
                  justifyContent: "center",
                  columnGap: 4,
                  marginInline: "auto",
                },
              }}>
              <Box className="page__container">
                {pages.map(({ text, to }) => (
                  <NavLink
                    className={({ isActive }) =>
                      `page__nav ${isActive ? "active" : ""}`
                    }
                    key={to}
                    to={to}>
                    <Typography
                      variant="h5"
                      component="span"
                      onClick={handleCloseNavMenu}
                      sx={{
                        my: 2,
                        display: "block",
                        color: "inherit",
                      }}>
                      {text}
                    </Typography>
                  </NavLink>
                ))}
              </Box>
            </Box>

            <Box
              sx={{
                flexGrow: 0,
                borderLeft: {
                  xs: 0,
                  md: `2px solid ${theme.palette.divider}`,
                },
                display: "flex",
                alignItems: "center",
                justifyContent: {
                  xs: "flex-end",
                },
                columnGap: 2,
                paddingInline: {
                  xs: "8px 0",
                  md: 2,
                },
                "& a[href='#/create-post']": {
                  display: {
                    xs: "none",
                    md: "flex",
                  },
                },
                "& a[href^='#/']": {
                  textDecoration: "none",
                },
                "& a[href='#/register']": {
                  display: {
                    xs: "none",
                    md: "block",
                  },
                },
                // "& .button__switch-theme": {
                //    display: {
                //       xs: "none",
                //       md: "inline-flex",
                //    },
                // },
              }}>
              {user ? (
                <Box display="flex" gap="8px" alignItems="center">
                  <IconButton
                    onClick={handleOpenSearch}
                    sx={{
                      justifySelf: "flex-end !important",
                      color: token.textColor,
                    }}>
                    <SearchIcon
                      sx={{
                        color: "inherit",
                      }}
                    />
                  </IconButton>
                  <IconButton
                    className="button__switch-theme"
                    onClick={toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                      <DarkModeOutlinedIcon />
                    ) : (
                      <LightModeOutlinedIcon />
                    )}
                  </IconButton>
                  {/* <Badge
                    className="user__notification"
                    color="error"
                    badgeContent={user.noti}
                    sx={{
                      display: {
                        xs: "none",
                        sm: "inline-flex",
                      },
                      color: textColor,
                      cursor: "pointer",
                    }}>
                    <NotificationsIcon />
                  </Badge> */}
                  <NavLinkButton
                    to="/create-post"
                    buttonText="Viết bài"
                    variant="outlined"
                    textColor={textColor}
                    startIcon={<EditIcon color={"inherit"} />}
                  />

                  <Tooltip title={user.id}>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt={user.fullname || user.email}
                        src={user.image || ""}
                      />
                    </IconButton>
                  </Tooltip>
                  <ListMenuItemAccount
                    anchorElUser={anchorElUser}
                    handleCloseUserMenu={handleCloseUserMenu}
                    handleToggleMode={toggleColorMode}
                  />
                </Box>
              ) : (
                <>
                  <Box display="flex" alignItems="center" gap="4px">
                    <IconButton
                      onClick={handleOpenSearch}
                      sx={{
                        justifySelf: "flex-end !important",
                        color: token.textColor,
                      }}>
                      <SearchIcon
                        sx={{
                          color: "inherit",
                        }}
                      />
                    </IconButton>
                    <IconButton
                      className="button__switch-theme"
                      onClick={toggleColorMode}>
                      {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon />
                      ) : (
                        <LightModeOutlinedIcon />
                      )}
                    </IconButton>
                  </Box>
                  <NavLinkButton to="/login">
                    <Button className="btn__login" variant="outlined">
                      Đăng nhập
                    </Button>
                  </NavLinkButton>
                  <NavLinkButton to="/register">
                    <Button className="btn__register" variant="outlined">
                      Đăng ký
                    </Button>
                  </NavLinkButton>
                </>
              )}
            </Box>
          </Toolbar>
        )}
      </Container>
    </AppBar>
  );
}

// eslint-disable-next-line react/prop-types
const ListMenuItemAccount = ({ anchorElUser, handleCloseUserMenu }) => {
  return (
    <Menu
      sx={{ mt: "45px" }}
      id="menu-appbar"
      anchorEl={anchorElUser}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorElUser)}
      onClose={handleCloseUserMenu}>
      <Settings />
    </Menu>
  );
};
export default Navbar;

import {
  Box,
  Button,
  useTheme,
  useMediaQuery,
  Typography,
  IconButton,
  SwipeableDrawer,
  Divider,
  Tab,
  Tabs,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { ColorModeContext, tokens } from "../theme";
import { getUserData } from "../features/auth/authSlice";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const paths = ["/", "/pets", "/about", "/contact"];

  const currentPath = paths.indexOf(pathname);

  const Desktop = useMediaQuery("(min-width: 700px)");

  const [value, setValue] = useState(0);

  useEffect(() => {
    if (currentPath >= 0 && currentPath < 5) {
      setValue(currentPath);
    }
  }, [pathname]);

  const { userData } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userData.length === 0) {
      dispatch(getUserData());
    }
  }, [userData]);

  const admin = userData.length === 0 ? "/login" : "/admin";

  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(open);
  };

  return (
    <Box>
      <Box
        sx={{
          bgcolor: "black",
          padding: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
          onClick={() => navigate("/admin")}
          sx={{
            bgcolor: "purple",
            fontSize: "12px",
            fontWeight: "bold",
            color: "white",
            minWidth: "0",
            ":hover": {
              bgcolor: colors.blueAccent[400],
              color: "black",
            },
            ":focus": {
              outline: "none",
            },
          }}
        >
          Admin
        </Button>
        <Box>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/124/124010.png"
              className="social-btn"
            />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/174/174855.png"
              className="social-btn"
            />
          </a>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="left"
        alignItems="center"
        backgroundColor={colors.primary[500]}
        height="60px"
        boxShadow="0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)"
      >
        <Box
          display="flex"
          alignItems="center"
          onClick={() => navigate("/")}
          sx={{ cursor: "pointer" }}
        >
          <img className="logo-img" src="/logo.png" />
          <Typography
            sx={{
              mr: "15px",
              color: "white",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            Catelter
          </Typography>
        </Box>
        <Box display={Desktop ? "none" : "flex"} ml="auto" p={2}>
          <IconButton
            onClick={colorMode.toggleColorMode}
            sx={{
              color: "white",
              ":focus": {
                outline: "none",
              },
            }}
          >
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon sx={{ fontSize: "28px" }} />
            ) : (
              <LightModeOutlinedIcon sx={{ fontSize: "28px" }} />
            )}
          </IconButton>
          <IconButton
            onClick={toggleDrawer(true)}
            sx={{
              color: "white",
              ":focus": {
                outline: "none",
              },
            }}
          >
            <MenuIcon sx={{ fontSize: "28px" }} />
          </IconButton>
          <SwipeableDrawer
            anchor="right"
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            sx={{
              "& .MuiPaper-root": {
                bgcolor: colors.primary[400],
                backgroundImage: "none",
              },
            }}
          >
            <Box
              onClick={toggleDrawer(false)}
              sx={{
                width: 250,
                "& > a": {
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                  color: colors.grey[100],
                  fontSize: "large",
                  p: "20px 0",
                  ":hover": {
                    color: "black",
                    backgroundColor: "rgb(141, 77, 205)",
                  },
                },
              }}
            >
              <Link to="/">Home</Link>
              <Link to="/pets">Cats</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
              <Divider />
              <Link to="/form">Adoption Form</Link>
            </Box>
          </SwipeableDrawer>
        </Box>
        <Box
          display={Desktop ? "flex" : "none"}
          height="100%"
          sx={{
            "& .MuiTabs-flexContainer": {
              height: "100%",
            },
            "& .MuiButtonBase-root": {
              color: "white",
              fontSize: "16px",
              ":focus": {
                outline: "none",
              },
            },
            "& .css-eby46w-MuiButtonBase-root-MuiTab-root.Mui-selected": {
              color: colors.blueAccent[500],
            },
            "& .MuiTabs-indicator": {
              bgcolor: colors.blueAccent[500],
            },
          }}
        >
          <Tabs value={value}>
            <Tab label="Home" onClick={() => navigate("/")} />
            <Tab label="Cats" onClick={() => navigate("/pets")} />
            <Tab label="About" onClick={() => navigate("/about")} />
            <Tab label="Contact" onClick={() => navigate("/contact")} />
          </Tabs>
        </Box>
        <Box
          display={Desktop ? "flex" : "none"}
          alignItems="center"
          ml="auto"
          mr="15px"
        >
          <IconButton
            onClick={colorMode.toggleColorMode}
            sx={{
              color: "white",
              mr: "10px",
              ":focus": {
                outline: "none",
              },
            }}
          >
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
          <Button
            onClick={() => navigate("/form")}
            sx={{
              bgcolor: colors.blueAccent[500],
              fontSize: "13px",
              fontWeight: "bold",
              ":hover": {
                bgcolor: colors.blueAccent[400],
              },
              ":focus": {
                outline: "none",
              },
            }}
          >
            Adoption Form
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

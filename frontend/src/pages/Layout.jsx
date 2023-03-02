import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useContext } from "react";
import { getUserData } from "../features/auth/authSlice";
import { ColorModeContext, useMode } from "../theme";
import {
  CssBaseline,
  ThemeProvider,
  Box,
  Button,
  useTheme,
  useMediaQuery,
  Typography,
  IconButton,
  SwipeableDrawer,
} from "@mui/material";
import { tokens } from "../theme";
import Navbar from "../components/Navbar";

export default function Layout() {
  const themes = useTheme();
  const colors = tokens(themes.palette.mode);
  const mode = useContext(ColorModeContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isNonMobile = useMediaQuery("(min-width: 700px)");

  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Outlet />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

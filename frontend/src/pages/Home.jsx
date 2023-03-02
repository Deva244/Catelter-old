import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  useTheme,
  Typography,
  useMediaQuery,
  Paper,
  Grow,
} from "@mui/material";
import { tokens } from "../theme";
import { getCats } from "../features/cat/catSlice";
import MessageForm from "../components/MessageForm";
import Pets from "./Pets";
import TeamMembers from "../components/TeamMembers";

export default function Home() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Desktop = useMediaQuery("(min-width:1024px)");

  const [checked, setChecked] = useState(true);

  const { cats, isError, message } = useSelector((state) => state.cat);

  const [catsData, setCatsData] = useState([]);

  useEffect(() => {
    if (cats.length === 0) {
      dispatch(getCats());
    }
    if (cats.length > 0) {
      setCatsData(cats);
    }
    if (isError) {
      toast.error(message);
    }
  }, [cats, isError]);

  if (catsData.length === 0) {
    return null;
  }

  const cardGrow = catsData.map((cat) => {
    return (
      <Grow
        key={cat._id}
        in={checked}
        style={{ transformOrigin: "0 0 0" }}
        {...(checked ? { timeout: 2000 } : {})}
      >
        <Box
          gridColumn="span 1"
          sx={{
            "& > img": {
              borderRadius: "4px",
            },
          }}
        >
          <img src={cat.imageUrl} width="200px" />
        </Box>
      </Grow>
    );
  });

  return (
    <Box>
      <Box
        sx={{
          backgroundImage: "url(frontpage.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: Desktop ? "center" : "left",
          backgroundSize: "cover",
          height: Desktop ? "55rem" : "40rem",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Box>a</Box>
        <Box
          sx={{
            display: Desktop ? "grid" : "none",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "15px",
          }}
        >
          {cardGrow}
        </Box>
      </Box>
      {/* DONATE */}
      <Box
        sx={{
          backgroundImage: "url(/donate_cat.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: Desktop ? "40rem" : "30rem",
        }}
      >
        <Typography
          sx={{
            fontSize: "44px",
            color: colors.grey[900],
            fontWeight: "bold",
            color: colors.primary[500],
            textAlign: "center",
            bgcolor: "rgb( 221, 221, 221, 0.4 )",
            p: "0 10px",
          }}
        >
          Your donations help save more lives
        </Typography>
        <Button
          onClick={() => navigate("/donate")}
          sx={{
            bgcolor: colors.blueAccent[500],
            fontSize: "24px",
            fontWeight: "bold",
            mt: "20px",
            ":hover": {
              bgcolor: colors.blueAccent[400],
            },
            ":focus": {
              outline: "none",
            },
          }}
        >
          Donate
        </Button>
      </Box>
      {/* CONTACT */}
      <Box
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        bgcolor={colors.primary[400]}
        p={Desktop ? "0 15rem" : "0 4rem"}
      >
        <MessageForm />
        <Box display={Desktop ? "block" : "none"}>
          <img src="/Bifi_Mango.jpg" width="498px" height="331.5px" />
        </Box>
      </Box>
      {/* Lost & Found */}
      <Box display="flex" justifyContent="space-around" alignItems="center">
        <Pets
          title="Lost & Found"
          subtitle="Help reunite these pets with their owners"
        />
      </Box>
      {/* TEAM */}
      <Box
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        bgcolor={colors.primary[400]}
      >
        <TeamMembers title="Meet The Team" subtitle="Our team members" />
      </Box>
      {/* FOOTER */}
      <Box className="footer">
        <footer>Footer</footer>
      </Box>
    </Box>
  );
}

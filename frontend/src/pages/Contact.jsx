import { Box, Typography, useMediaQuery } from "@mui/material";
import MessageForm from "../components/MessageForm";

export default function Contact() {
  const Desktop = useMediaQuery("(min-width:700px)");

  return (
    <Box m={Desktop ? "10vh 10vw" : "10vh 6vw"} height="100%">
      <Typography variant="h1">Contact Us</Typography>
      <Typography variant="h5" sx={{ m: "2rem 0" }}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut doloremque
        aut itaque voluptate officiis similique vel omnis in laudantium, beatae
        et perferendis saepe voluptatibus facilis, quia, placeat ducimus odio!
        Necessitatibus.
      </Typography>
      <Box
        bgcolor="#1f2a40"
        sx={{
          "& .css-1muzyox": {
            m: 0,
          },
        }}
      >
        <MessageForm />
      </Box>
    </Box>
  );
}

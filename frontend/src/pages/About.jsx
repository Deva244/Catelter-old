import { Box, Typography, useMediaQuery } from "@mui/material";

export default function About() {
  const Desktop = useMediaQuery("(min-width:700px)");

  return (
    <Box m={Desktop ? "10vh 10vw" : "10vh 6vw"} height="100%">
      <Typography variant="h1">About Us</Typography>
      <Typography variant="h5" sx={{ mt: "2rem" }}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut doloremque
        aut itaque voluptate officiis similique vel omnis in laudantium, beatae
        et perferendis saepe voluptatibus facilis, quia, placeat ducimus odio!
        Necessitatibus.
      </Typography>
    </Box>
  );
}

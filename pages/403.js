import React from "react";

import { Box, Grid, Typography } from "@mui/material";
import DangerousIcon from "@mui/icons-material/Dangerous";

import PrivateRoutes from "../utils/privateRoutes";
import { useRouter } from "next/router";

const Forbidden403 = () => {
  const router = useRouter();

  return (
    <Box sx={{ p: 3 }}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "90vh" }}
      >
        <DangerousIcon color="error" sx={{ fontSize: "6rem" }} />
        <Typography variant="h6" sx={{ fontSize: "1.75rem", fontWeight: 600 }}>
          Access Denied
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: "1rem",
            fontWeight: 400,
            cursor: "pointer",
            color: "primary",
            "&:hover": { textDecoration: "underline" },
          }}
          onClick={() => router.back()}
        >
          Go back to previous page
        </Typography>
      </Grid>
    </Box>
  );
};

export default PrivateRoutes(Forbidden403);

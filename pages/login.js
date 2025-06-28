import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Stack,
  Grid,
  Divider,
  Button,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { useRouter } from "next/router";
import Image from "next/image";

import api from "../services/core";
import { setStorage, getStorage, deleteStorage } from "../utils/storage";
import useToast from "../utils/toast";
import PngWing from "../public/static/logo/pngwing.png";

import Link from "../utils/link";

const Login = () => {
  const router = useRouter();
  const [displayToast] = useToast();
  const passwordRef = useRef(null);

  const [loginValue, setLoginValue] = useState({
    user: "",
    password: "",
  });
  const handleChange = (event) => {
    setLoginValue({ ...loginValue, [event.target.name]: event.target.value });
  };

  const handleKeyDownNIP = (event) => {
    if (event.key === "Enter") {
      passwordRef.focus();
    }
  };

  const handleKeyDownPassword = (event) => {
    if (event.key === "Enter") {
      onFinish();
    }
  };

  async function onFinish() {
    try {
      // ------------------------------------------------------------
      // setLoading((loading = true));
      console.log("loginvalue", loginValue);
      console.log("logins", "Basic " +
      Buffer.from(loginValue.user + ":" + loginValue.password).toString(
        "base64"))
      const login = await api.login(loginValue);
      const { data, metadata } = login.data;
      console.log("loginzz",login)
      console.log("loginzz1",login.config)
      console.log("loginzz2",login.data.metadata)
      console.log("loginzz3",metadata)
      console.log("loginzz4",metadata.username)
      console.log("testLogin", data);
      setStorage("access_token", `${data.token_type} ${data.access_token}`);
      setStorage("expires_at", data.expires_at);
      setStorage("userNIP", metadata.username);
      setStorage("language", "EN");
      // var accessResult = await getAccessList();
      // console.log("access", accessResult);
      // ------------------------------------------------------------
      // router.push("/company-outlet-selection");
      router.push("/");
      // setIsLoading(false)
    } catch (error) {
      console.log(error);
      displayToast("error", "Login failed.");
    }
  }

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#F5F5F5",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100vh",
          position: "absolute",
          left: 0,
        }}
      >
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid
            item
            xs={3}
            sx={{
              zIndex: "5",
            }}
          >
            <Card
              variant="outlined"
              sx={{
                width: "380px",
                background: "#FFFFFF",
                boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.05)",
                borderRadius: " 12px",
                padding: "10px 0px",
              }}
            >
              <CardContent>
                <Stack component="form" spacing={2} noValidate>
                  <Box display={"flex"} justifyContent={"center"}>
                    <Image
                      src={PngWing}
                      width={100}
                      height={100}
                      alt="Png Wing Logo"
                    />
                  </Box>
                  <Divider sx={{ marginTop: "16px" }} />
                  <TextField
                    label="USER"
                    name="user"
                    value={loginValue.user}
                    onChange={handleChange}
                    onKeyDown={handleKeyDownNIP}
                  />
                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    inputRef={(el) => (passwordRef.current = el)}
                    value={loginValue.password}
                    onChange={handleChange}
                    onKeyDown={handleKeyDownPassword}
                  />
                  <Divider sx={{ mt: 2 }} />
                  {/* <Grid container>
                    <Grid item xs={5.8}>
                      <Button
                        disabled={!loginValue.nip || !loginValue.password}
                        onClick={onFinish}
                        sx={{ mt: 3, mr: 1.5 }}
                        variant="contained"
                        fullWidth
                      >
                        BACK
                      </Button>
                    </Grid>
                    <Grid item xs={5.8}>
                      <Button
                        disabled={!loginValue.nip || !loginValue.password}
                        onClick={onFinish}
                        sx={{ mt: 3, ml: 1.5 }}
                        variant="contained"
                        fullWidth
                      >
                        Log In
                      </Button>
                    </Grid>
                  </Grid> */}
                  <Button
                    disabled={!loginValue.user || !loginValue.password}
                    onClick={onFinish}
                    sx={{ mt: 3 }}
                    variant="contained"
                  >
                    Log In
                  </Button>
                  <Button
                    // disabled={!loginValue.nip || !loginValue.password}
                    // onClick={onFinish}
                    onClick={() => router.push("/")}
                    sx={{ mt: 3 }}
                    variant="contained"
                  >
                    Back
                  </Button>
                  {/* <Link
                    href="/reset-password"
                    sx={{ textDecoration: "none" }}
                    align={"center"}
                  >
                    <Typography variant="subtitle2">Reset Password</Typography>
                  </Link> */}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Divider />
          <Typography
            variant="subtitle2"
            sx={{ color: "rgba(0, 0, 0, 0.87)", mt: 1.5 }}
          >
            {process.env.NEXT_PUBLIC_APP_VERSION}
          </Typography>
        </Grid>
      </Box>
    </>
  );
};

export default Login;

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography } from "@mui/material";
import jwt_decode from "jwt-decode";

import { setUser } from "../redux/actions/userAction";
import { getStorage } from "../utils/storage";

const Navbar = () => {
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.userReducer);
  const {
    user: { email },
  } = userReducer;

  const [listNotification, setListNotification] = useState([
    {
      type: "info",
      message: "this is an info notification",
    },
    {
      type: "warning",
      message: "this is a warning notification",
    },
    {
      type: "error",
      message: "this is an error notification",
    },
  ]);
  const [unreadNotifCount, setUnreadNotifCount] = useState(3);
  const [anchor, setAnchor] = useState(null);
  const [notifMenuIsOpen, setNotifMenuIsOpen] = useState(false);

  function setUserData() {
    const token = getStorage("access_token");
    const decoded = jwt_decode(token);
    const payloadUser = {
      email: decoded.email,
      username: decoded.username,
    };
    dispatch(setUser(payloadUser));
  }

  function handleNotificationMenuOpen(event) {
    setAnchor(event.currentTarget);
    setNotifMenuIsOpen(true);
  }

  function handleCloseNotificationMenu() {
    setNotifMenuIsOpen(false);
  }

  return (
    <Box
      display={"flex"}
      justifyContent={"flex-end"}
      sx={{ width: "100%", background: "white", px: 2, py: 1 }}
    >
      <Typography
        variant="h4"
        component="div"
        sx={{ flexGrow: 1, textAlign: "center", fontWeight: 600 }}
      ></Typography>
    </Box>
  );
};

export default Navbar;

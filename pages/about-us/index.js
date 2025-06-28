// import React from "react";

// import { Box } from "@mui/material";

// import PrivateRoutes from "../utils/privateRoutes";

import {
  Box,
  Button,
  Collapse,
  Divider,
  Grid,
  Modal,
  Paper,
  TextField,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
  Stack,
  TableFooter,
  TablePagination,
  Card,
  IconButton,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { getStorage } from "../../utils/storage";
import useToast from "../../utils/toast";
// import api from "../../services/logbook";
import ModalWrapper from "../../components/ModalWrapper";
import ModalInputWrapper from "../../components/ModalInputWrapper";
import { useRouter } from "next/router";
import { debounce, indexOf, isNull, isUndefined } from "lodash";
import PrivateRoutes from "../../utils/privateRoutes";
// import logisticAPI from "../../services/logistic";
// import core from "../../services/core";
import SearchIcon from "@mui/icons-material/Search";
import { formatDate, formatRupiah } from "../../utils/text";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import PngWing from "../../public/static/logo/pngwing.png";
import Image from "next/image";

const AboutUs = () => {
  // return <Box sx={{ p: 3 }}></Box>;
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    bgcolor: "background.paper",
    p: 4,
  };

  const router = useRouter();
  const token = getStorage("access_token");

  return (
    // <Paper sx={{ backgroundColor: "red" }}>
    //   <Typography
    //     variant="h5"
    //     sx={{ textAlign: "center", fontWeight: 600, mt: 1, mb: 2 }}
    //     float="center"
    //     paddingRight={1}
    //     fullWidth
    //   >
    //     Cek Status Order
    //   </Typography>
    // </Paper>

    <Box alignItems="flex-start" sx={{ width: "100%" }}>
      <Collapse in={!token}>
      
      <Paper sx={{ backgroundColor: "blue" }}>
        {/* <Typography
            variant="h5"
            sx={{ textAlign: "center", fontWeight: 600, mb: 2 }}
            float="center"
            paddingRight={1}
            fullWidth
          >
            Cek Status Order
          </Typography> */}
        <Grid container justifyContent={"space-between"} sx={{ p: 2 }}>
          <Grid item xs={1}>
            <Image src={PngWing} width="35%" height="35%" alt="Sidebar Logo" />
          </Grid>
          <Grid item xs={1}>
            <Button sx={{ color: "white" }} onClick={() => router.push("/")}>
              Home
            </Button>
          </Grid>
          <Grid item xs={1}>
            <Button sx={{ color: "white" }}>About Us</Button>
          </Grid>
          <Grid item xs={1}>
            {/* <Button>Test</Button> */}
          </Grid>
          <Grid item xs={1}></Grid>

          <Grid item xs={1}></Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={1}></Grid>
          {/* <Grid item xs={1}></Grid> */}
          {!getStorage("access_token") ? (
            <Grid item xs={1}>
              <Button sx={{ color: "white" }}
              onClick={() => router.push("/login")}
              >LOGIN</Button>
            </Grid>
          ) : (
            <Grid item xs={1}></Grid>
          )}
        </Grid>
      </Paper>
      </Collapse>
      <Paper sx={{ width: "100%", p: 5 }}>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: 600, mt: 1, mb: 2 }}
          float="center"
          paddingRight={1}
          fullWidth
        >
          Cek Status Order Test
        </Typography>
        <Divider />
        <Grid container justifyContent={"space-between"} sx={{ p: 2 }}>
          <Grid container item xs={2}>
            <Typography
              variant="h9"
              sx={{ fontWeight: 600, mt: 1 }}
              paddingRight={1}
              fullWidth
            >
              Nomor Pesanan :
            </Typography>
          </Grid>
          <Grid container item xs={8}>
            <FormControl fullWidth>
              <TextField
                sx={{ backgroundColor: "white" }}
                size="small"
                fullWidth
                // onChange={(e) => setNomorPesanan(e.target.value)}
                // onKeyPress={(event) => enterPressed(event)}
              ></TextField>
            </FormControl>
          </Grid>
          <Grid container item xs={1}></Grid>
          <Grid container item xs={1}>
            <FormControl fullWidth>
              <Button
                color="primary"
                variant="contained"
                size="large"
                // onClick={() => debounceMountSearchStatusOrder()}
              >
                <SearchIcon />
              </Button>
            </FormControl>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 1 }} />
        {/* {listStatusOrder.length !== 0 ? (
            <TableContainer sx={{ mt: 1 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {tableHeader &&
                      tableHeader.map((head, index) => (
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            textAlign: `${head.align}`,
                          }}
                          key={index}
                        >
                          {head.name}
                        </TableCell>
                      ))}
                  </TableRow>
                </TableHead>
  
                <TableBody sx={{ mb: 1 }}>
                  {listStatusOrder &&
                    listStatusOrder.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {item.sale_projectname === undefined
                            ? "-"
                            : item.sale_projectname}
                        </TableCell>
                        <TableCell>{item.sp_id}</TableCell>
                        <TableCell>
                          {formatDate(item.tglsp, "ddd MMMM DD YYYY HH:mm:ss")}
                        </TableCell>
                        <TableCell>
                          {item.sale_trannum === "" ? "-" : item.sale_trannum}
                        </TableCell>
                        <TableCell>
                          {formatDate(
                            item.tgl_sale,
                            "dddd, ddd MMMM DD YYYY HH:mm:ss"
                          ) === ""
                            ? "-"
                            : item.tgl_sale === "0001-01-01T00:00:00Z"
                            ? "-"
                            : formatDate(
                                item.tgl_sale,
                                "ddd MMMM DD YYYY HH:mm:ss"
                              )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <TableContainer sx={{ mt: 1 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {tableHeader &&
                      tableHeader.map((head, index) => (
                        <TableCell
                          sx={{ fontWeight: "bold", textAlign: `${head.align}` }}
                          key={index}
                        >
                          {head.name}
                        </TableCell>
                      ))}
                  </TableRow>
                </TableHead>
                <TableBody></TableBody>
              </Table>
              <Grid sx={{ mt: 20 }}></Grid>
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item>
                  <IconButton sx={{ color: "red" }}>
                    <DoDisturbIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Typography variant="h5">No Items</Typography>
                </Grid>
              </Grid>
              <Grid sx={{ mt: 20 }}></Grid>
            </TableContainer>
          )} */}
      </Paper>

      {/* Modal Confirmation */}
      <Modal
      // open={modalKosong}
      >
        <ModalWrapper sx={{ width: "30%" }}>
          <Box sx={{ width: "100%" }}>
            <Grid>
              <Typography>
                {/* {`SP dengan Nomor Pesanan ${nomorPesanan} Belum Terbentuk`} */}
              </Typography>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Button
              color="primary"
              variant="contained"
              // onClick={() => setModalKosong(false)}
              sx={{
                marginTop: 1,
                float: "right",
              }}
            >
              <b>OK</b>
            </Button>
          </Box>
        </ModalWrapper>
      </Modal>

      <Modal
      // open={isLoading}
      >
        <Box sx={style} style={{ textAlign: "center" }}>
          <Typography>Mohon Tunggu Permintaan Anda Sedang Di Proses</Typography>
          <CircularProgress></CircularProgress>
        </Box>
      </Modal>
    </Box>
  );
};

// export default PrivateRoutes(Dashboard);
export default AboutUs;

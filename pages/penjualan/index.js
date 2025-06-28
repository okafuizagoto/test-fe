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
  InputLabel,
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
  InputAdornment,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { getStorage } from "../../utils/storage";
import useToast from "../../utils/toast";
// import api from "../../services/logbook";
import ModalWrapper from "../../components/ModalWrapper";
import ModalInputWrapper from "../../components/ModalInputWrapper";
// import CurrencyTextField from "../../components/CurrencyTextField";
import { useRouter } from "next/router";
import { debounce, indexOf, isNull, isUndefined } from "lodash";
import PrivateRoutes from "../../utils/privateRoutes";
// import logisticAPI from "../../services/logistic";
// import core from "../../services/core";
import stockApi from "../../services/stock";
import SearchIcon from "@mui/icons-material/Search";
import {
  Add,
  Book,
  RemoveRedEye,
  Search,
  Delete,
  Edit,
  Save,
} from "@mui/icons-material";
import { formatDate, formatRupiah } from "../../utils/text";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import PngWing from "../../public/static/logo/pngwing.png";
import Image from "next/image";
import dayjs from "dayjs";

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
  const language = getStorage("language");
  const [listSales, setListSales] = useState(null);
  const [dataStock, setDataStock] = useState("");
  const [kodeProduk, setKodeProduk] = useState(0);
  const [namaBarang, setNamaBarang] = useState("");
  const [jumlahBarang, setJumlahBarang] = useState(0);
  const [editJumlahBarang, setEditJumlahBarang] = useState("");
  const [selectTypePayment, setSelectTypePayment] = useState("");
  const [cash, setCash] = useState(0);
  const [cashValue, setCashValue] = useState("");
  const [cashFinal, setCashFinal] = useState(0);
  const [isOpen, setIsOpen] = useState([]);
  const [modalAddSales, setModalAddSales] = useState(false);
  const [modalAddPayment, setModalAddPayment] = useState(false);
  const [keyBackspaceBool, setKeyBackspaceBool] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [locale, setLocale] = useState("EN");
  const [today, setDate] = useState(new Date());
  const day = today.toLocaleDateString(locale, { weekday: "long" });
  const insertData = (newData) => {
    // If data is null, initialize it as an empty array and add newData
    // If data is not null, simply add newData to the existing array
    setListSales((prevData) =>
      prevData === null ? [newData] : [...prevData, newData]
    );
  };
  const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, {
    month: "long",
  })}\n\n`;
  const total =
    listSales !== null
      ? listSales.reduce((acc, item) => acc + item.stock_totalsales, 0)
      : 0;
  const listPayment = [
    {
      jenis: "TUNAI",
    },
    {
      jenis: "BANK",
    },
  ];
  // const hour = today.getHours();
  // const wish = `Good ${(hour < 12 && 'Morning') || (hour < 17 && 'Afternoon') || 'Evening'}, `;
  const time = today.toLocaleTimeString(locale, {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
    second: "numeric",
  });
  const tableHeader = [
    { name: "No" },
    { name: "Kode Barang" },
    { name: "Nama Barang" },
    { name: "Jumlah" },
    { name: "Unit" },
    { name: "Price" },
    { name: "Sub Total" },
    { name: "Action" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [locale]);

  dayjs.locale(language);

  useEffect(() => {
    setLocale(language);
  }, [language]);

  useEffect(() => {
    if (listSales !== null) {
      let arrayOfData = [];
      for (let i = 0; i <= listSales.length - 1; i++) {
        arrayOfData.push(true);
      }
      setIsOpen(arrayOfData);
    }
    console.log("listSales", listSales);
    console.log("isOpen", isOpen);
  }, [listSales]);

  const debounceMountGetOneStock = useCallback(
    debounce(mountGetOneStock, 400),
    []
  );

  const handleKeyDownPayment = (event) => {
    console.log("testKey", event.key);
    if (event.key === "Backspace") {
      setKeyBackspaceBool(true);
      setCash(event.target.value);
      setCashValue(event.target.value);
      //   passwordRef.focus();
      if (event.target.value.length === 0) {
        setKeyBackspaceBool(false);
      }
    }
  };

  function onChangeCash(event, value) {
    setCash(value);
    setCashValue(value);
    console.log("testKey", event.key);
    if (keyBackspaceBool === false) {
      var test = 4;
      var tester = 8;
      if (value.length >= test) {
        console.log("MASOOOOOK");
        // if (value.length > test) {
        //   // setCashValue(value.slice(0, 1) + value.slice(2));
        //   setCashValue(value.slice(0, 2) + "." + value.slice(1));
        //   console.log("MASOOOOOKKKK-2");
        // }
        if (value.length === test) {
          setCashValue(value.slice(0, 1) + "." + value.slice(1));
        }

        if (value.length > test) {
          console.log("valueeeeee-berfore-deleted", value);
          // var deletedDots;
          // deletedDots = value.replace(".", "");
          if (value.length > tester) {
            deletedDots = value.replace(/\./g, "");
          }
          if (value.length <= tester) {
            var deletedDots;
            deletedDots = value.replace(".", "");
          }
          console.log("valueeeeee-deleted", deletedDots);
          console.log("valueeeeee-deleted(value)", value);
          // if (value.length === tester) {
          //   console.log("masooookkkkkk", value.length);
          //   value = value.slice(0, 1) + "." + value.slice(1);
          //   console.log("valuuee", value);
          // }
          // console.log();
          console.log("value.length", value.length);
          // setCashValue(value.slice(0, 1) + value.slice(2));
          // setCashValue(value.replace(".", ""));
          console.log("valueeeeee", value);
          if (value.length === tester) {
            value =
              deletedDots.slice(0, value.length - test) +
              "." +
              deletedDots.slice(value.length - test);
          }
          if (value.length > tester) {
            value =
              deletedDots.slice(0, value.length - test - 1) +
              "." +
              deletedDots.slice(value.length - test - 1);
            console.log("valueeeeeeAppendDeletedDots", value);
          }
          if (value.length < tester) {
            setCashValue(
              deletedDots.slice(0, value.length - test) +
                "." +
                deletedDots.slice(value.length - test)
            );
            console.log("MASOOOOOK-2");
            console.log("valueeeeee1", value);
          }
          if (value.length === tester) {
            console.log("masooookkkkkk", value.length);
            setCashValue(value.slice(0, 1) + "." + value.slice(1));
            console.log("valuuee", value);
          }
          if (value.length > tester) {
            console.log("masooookkkkkk2", value.length);
            console.log("valueeeeee2", value);
            console.log("valueeeeee-count", value.length - (tester - 1));
            setCashValue(
              value.slice(0, value.length - (tester - 1)) +
                "." +
                value.slice(value.length - (tester - 1))
            );
            console.log("valuuee2", value);
            console.log(
              "valuuee2-test",
              value.slice(0, 2) + "." + value.slice(2)
            );
          }
          // setCashValue(value.slice(0, 2) + "." + value.slice(1));
        }
        // console.log("testSlice", value.slice(0, 0));
        // console.log("testSlice1", value.slice(0, 1));
        // console.log("testSlice2", value.slice(0, 2));
        // console.log("testSlice3", value.slice(0, 3));
        // console.log("testSlice4", value.slice(0, 4));
        // console.log("testSlice5", value.slice(0, 5));
        // console.log("testSlice6", value.slice(0, 6));
        // var testing = value.slice(0, 1) + value.slice(2, 6);
        // console.log("testSlice-fixing", testing);
        // console.log("testSlice-fixing2", testing);
      }
    }
  }

  async function savePaymentType() {
    if (selectTypePayment === "TUNAI") {
      console.log("saveDeletedDots", parseInt(cash.replace(/\./g, "")));
      setCashFinal(parseInt(cash.replace(/\./g, "")));
      console.log("testAAAAA", selectTypePayment);
      console.log("testCash", cash);
      console.log("testCashValue", cashValue);
      console.log("selectTypePayment", selectTypePayment);
      console.log("cash", cash);
      setCashValue("");
      setCash("");
      setSelectTypePayment("");
      setModalAddPayment(false);
    }
    if (selectTypePayment === "BANK") {
      setCashValue("");
      setCash("");
      setCashFinal(0);
      setModalAddPayment(false);
    }
  }

  async function cancelAll() {
    setListSales(null);
    setCashFinal("");
    setSelectTypePayment("");
  }

  // async function mountGetOneStock() {
  //   setIsLoading(true);
  //   try {
  //     const getOneStock = await core.getOneStock();
  //     const { data, error } = getOneStock.data;
  //     //   listProject.push(options);
  //     if (error.status === false) {
  //       if (listSales === null) {
  //         var { stock_code, stock_name, stock_pack, stock_price } = data;
  //         var obj = { stock_code, stock_name, stock_pack, stock_price };
  //         for (let i = 0; i <= data.length - 1; i++) {
  //           arrayOfData.push(true);
  //         }
  //         // setIsOpen(arrayOfData);
  //         setListSales(data);
  //         // setDataPrice([...dataPrice, obj]);
  //       }
  //       // else {
  //       //   var correspondingProject;
  //       //   data.map((item) => {
  //       //     correspondingProject = list.find(
  //       //       (code) => code.pro_code === item.pro_code
  //       //     );
  //       //   });
  //       //   if (correspondingProject === undefined) {
  //       //     if (list.length === 0) {
  //       //       for (let i = 0; i <= data.length - 1; i++) {
  //       //         arrayOfData.push(true);
  //       //       }
  //       //       setIsOpen(arrayOfData);
  //       //     } else {
  //       //       for (let i = 0; i <= list.length; i++) {
  //       //         arrayOfData.push(true);
  //       //       }
  //       //       setIsOpen(arrayOfData);
  //       //     }
  //       //     var { pro_code, pro_disc, pro_disc2 } = data[0];
  //       //     var objs = { pro_code, pro_disc, pro_disc2 };
  //       //     setListPrice((before) => [...before, data[0]]);
  //       //     setDataPrice((before) => [...before, objs]);
  //       //   }
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // }

  async function mountGetOneStock(kode) {
    setIsLoading(true);
    try {
      const getOneStock = await stockApi.getOneStock("", kode);
      const { data, error } = getOneStock.data;
      //   listProject.push(options);
      if (error.status === false) {
        setDataStock(data);
        setNamaBarang(data.stock_name);
        setIsLoading(false);
        console.log("testDATA", data);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  async function appendDataSales() {
    // if (jumlahBarang !== 0) {
    if (listSales === null) {
      var { stock_code, stock_name, stock_pack, stock_price } = dataStock;
      var objQty = jumlahBarang * dataStock.stock_price;
      var obj = {
        stock_code,
        stock_name,
        stock_qty: jumlahBarang,
        stock_pack,
        stock_price,
        stock_totalsales: objQty,
      };
      console.log("testDATA", obj);
      insertData(obj);
      setJumlahBarang(0);
      setKodeProduk("");
      setNamaBarang("");
      // let arrayOfData = [];
      // for (let i = 0; i <= data.length - 1; i++) {
      //   arrayOfData.push(true);
      // }
      // setIsOpen(arrayOfData);
      setModalAddSales(false);
    } else {
      var { stock_code, stock_name, stock_pack, stock_price } = dataStock;
      var objQty = jumlahBarang * dataStock.stock_price;
      var obj = {
        stock_code,
        stock_name,
        stock_qty: jumlahBarang,
        stock_pack,
        stock_price,
        stock_totalsales: objQty,
      };
      insertData(obj);
      setJumlahBarang(0);
      setKodeProduk("");
      setNamaBarang("");
      setModalAddSales(false);
    }
    // }
    // else {
    //   displayToast("error", "Qty must more than 0");
    // }
    console.log("logDataSales", listSales);
    console.log("total", total);
  }

  const deleteProduct = (productName) => {
    const deletedProducts = listSales.filter(
      (product) => product.stock_code !== productName.stock_code
    );
    setListSales(deletedProducts);
  };

  function deleteData(item) {
    // Function to delete a product by nameproduct
    deleteProduct(item)
  }

  function changeButton(item, index) {
    return (
      <Box>
        <Button
          size="small"
          variant="contained"
          sx={{
            backgroundColor: "error.main",
            marginTop: "1em",
            marginRight: "1em",
          }}
          onClick={() => deleteData(item)}
        >
          <Delete />
        </Button>

        {isOpen[index] === false ? (
          <Button
            size="small"
            variant="contained"
            sx={{
              backgroundColor: "error.main",
              marginTop: "1em",
            }}
            onClick={(e) => mountEditSales(e, item, index)}
            // disabled={disableButtonSave}
          >
            <Save />
          </Button>
        ) : (
          <Button
            size="small"
            variant="contained"
            sx={{
              backgroundColor: "warning.main",
              marginTop: "1em",
            }}
            onClick={(e) => saveSales(e, item, index)}
          >
            <Edit />
          </Button>
        )}
      </Box>
    );
  }

  function saveSales(e, item, index) {
    let newIsOpen = [...isOpen];
    newIsOpen.splice(index, 1, !newIsOpen[index]);
    setIsOpen(newIsOpen);
    console.log("isOpen Save", isOpen);
    // setEditExpDate(formatDate(item.ens_expireddate, "YYYY-MM-DD"));
    // setEditQTY(item.ens_qty);
  }

  // eslint-disable-next-line
  const debounceMountEditSales = useCallback(debounce(mountEditSales, 400));
  async function mountEditSales(e, item, index) {
    console.log("itemSave", item);
    // -------------------------------------------
    const updatedProducts = listSales.map((product) => {
      if (product.stock_code === item.stock_code) {
        return {
          ...product,
          stock_qty: parseInt(editJumlahBarang),
          stock_totalsales: item.stock_price * parseInt(editJumlahBarang),
        };
      }
      return product;
    });
    setListSales(updatedProducts);
    // -------------------------------------------

    let newIsOpen = [...isOpen];
    newIsOpen.splice(index, 1, !newIsOpen[index]);
    setIsOpen(newIsOpen);
    // try {
    //   var payload = {
    //     data: {
    //       ens_expireddate: formatDate(editExpDate, "YYYYMMDD"),
    //       ens_qty: parseInt(editQTY),
    //       ens_runningid: listEntriesHeader.ens_runningid,
    //       ens_ptid: PT.pt_id,
    //       ens_code: outCode.out_code,
    //       ens_sttkdate: enddate.toString(),
    //       ens_gondola: item.ens_gondola,
    //       ens_procod: item.ens_procod,
    //       ens_batchnumber: item.ens_batchnumber,
    //     },
    //   };
    //   const editEntries = await api.editEntries(payload);
    //   setEditQTY("");
    //   setEditExpDate("");
    //   console.log("testPayloadEdit", payload);
    //   if (called === true) {
    //     debounceMountListEntries();
    //   } else {
    //     debounceMountCekED();
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }

  return (
    <Box alignItems="flex-start" sx={{ width: "100%", p: 5 }}>
      {/* <Paper sx={{ width: "100%", p: 5 }}> */}
      <Typography
        variant="h5"
        sx={{ textAlign: "center", fontWeight: 600, mt: 1, mb: 2 }}
        float="center"
        paddingRight={1}
        fullWidth
      >
        Point of Sales
      </Typography>
      <Divider />
      <Grid container justifyContent={"space-between"} sx={{ p: 2 }}>
        <Grid item xs={2}>
          {/* <Typography
                variant="h9"
                sx={{ fontWeight: 600, mt: 1 }}
                paddingRight={1}
                fullWidth
              >
                Nomor Pesanan :
              </Typography> */}
            <FormControl fullWidth sx={{ width: "100%" }}>
              <InputLabel id="bulan-label">Choose Type Input</InputLabel>
          <Select label="choose type input" size="small">
            <MenuItem>Keyboard</MenuItem>
            <MenuItem>Barcode</MenuItem>
          </Select>
                      </FormControl>
        </Grid>
        <Grid item xs={8}>
          <FormControl fullWidth>
            <TextField
              sx={{ backgroundColor: "white" }}
              size="small"
              fullWidth
              placeholder="Search"
              // onChange={(e) => setNomorPesanan(e.target.value)}
              // onKeyPress={(event) => enterPressed(event)}
            ></TextField>
          </FormControl>
        </Grid>
        <Grid item xs={0.5}></Grid>
        <Grid container item xs={1.5}>
          <Grid item xs={6}>
            {/* <FormControl fullWidth> */}
            <Button
              color="primary"
              variant="contained"
              size="large"
              // onClick={() => debounceMountSearchStatusOrder()}
            >
              <SearchIcon />
            </Button>
            {/* </FormControl> */}
          </Grid>
          <Grid item xs={6}>
            {/* <FormControl fullWidth> */}
            <Button
              color="primary"
              variant="contained"
              size="large"
              onClick={() => setModalAddSales(true)}
            >
              <Add />
            </Button>
            {/* </FormControl> */}
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        // rowSpacing={1}
        // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item container m={1}>
          {/* <Grid item xs={1} sx={{height:55, backgroundColor: "grey"}}> */}
          <Grid item xs={2} sx={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}>
            <ModalInputWrapper>
              <Typography variant="body1" sx={{ p: 1, fontWeight: 400 }}>
                {language === "ID" ? "Kini" : "Now"}
              </Typography>
            </ModalInputWrapper>
          </Grid>
          <Grid item xs={3}>
            <TextField
              size="small"
              value={date + " " + time}
              disabled
              fullWidth
            ></TextField>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={2} sx={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}>
            <ModalInputWrapper>
              <Typography variant="body1" sx={{ p: 1, fontWeight: 400 }}>
                {language === "ID" ? "Nomor Resi" : "Receipt Number"}
              </Typography>
            </ModalInputWrapper>
          </Grid>
          <Grid item xs={3}>
            <TextField
              size="small"
              // value={date + " " + time}
              fullWidth
            ></TextField>
          </Grid>
        </Grid>

        <Grid item container m={1}>
          <Grid item xs={2} sx={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}>
            <ModalInputWrapper>
              <Typography variant="body1" sx={{ p: 1, fontWeight: 400 }}>
                {language === "ID" ? "Tanggal Transaksi" : "Transaction Date"}
              </Typography>
            </ModalInputWrapper>
          </Grid>
          <Grid item xs={3}>
            <TextField
              size="small"
              //  value={formatDate(
              //   resultHistoryHeader.sale_trandate,
              //   "dddd, DD MMMM YYYY HH:mm:ss"
              // )}
              fullWidth
            ></TextField>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={2} sx={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}>
            <ModalInputWrapper>
              <Typography variant="body1" sx={{ p: 1, fontWeight: 400 }}>
                {language === "ID" ? "Sales Person" : "Sales Person"}
              </Typography>
            </ModalInputWrapper>
          </Grid>
          <Grid item xs={3}>
            <TextField
              size="small"
              // value={date + " " + time}
              fullWidth
            ></TextField>
          </Grid>
        </Grid>
        <Grid item container m={1}>
          <Grid item xs={2} sx={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}>
            <ModalInputWrapper>
              <Typography variant="body1" sx={{ p: 1, fontWeight: 400 }}>
                {language === "ID" ? "Tipe" : "Type"}
              </Typography>
            </ModalInputWrapper>
          </Grid>
          <Grid item xs={3}>
            <TextField
              size="small"
              //  value={formatDate(
              //   resultHistoryHeader.sale_trandate,
              //   "dddd, DD MMMM YYYY HH:mm:ss"
              // )}
              fullWidth
            ></TextField>
          </Grid>
          <Grid item xs={6}></Grid>
        </Grid>
      </Grid>

      <Divider sx={{ mt: 1, mb: 1 }} />

      <Paper>
        {listSales !== null ? (
          <TableContainer>
            <Table size="small" sx={{ mt: 2 }}>
              <TableHead>
                <TableRow>
                  {tableHeader &&
                    tableHeader.map((head, index) => (
                      <TableCell
                        sx={{
                          fontWeight: "600",
                          textAlign: "center",
                        }}
                        key={index}
                      >
                        <Typography
                          fontSize={{
                            lg: 17,
                            md: 15,
                            sm: 10,
                            xs: 8,
                          }}
                        >
                          {head.name}
                        </Typography>
                      </TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {listSales &&
                  listSales.map((item, index) => (
                    <TableRow>
                      <TableCell
                        // sx={{ textAlign: "left" }}
                        align="center"
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell
                        // sx={{ textAlign: "left" }}
                        align="center"
                      >
                        {item.stock_code === "" || item.stock_code === null
                          ? "-"
                          : item.stock_code}
                      </TableCell>
                      <TableCell
                        // sx={{ textAlign: "left" }}
                        align="center"
                      >
                        {item.stock_name === "" || item.stock_name === null
                          ? "-"
                          : item.stock_name}
                      </TableCell>
                      <TableCell
                        // sx={{ textAlign: "left" }}
                        align="center"
                      >
                        {isOpen[index] === false ? (
                          <Grid container>
                            <Grid item xs={12}>
                              <TextField
                                size="small"
                                onChange={(e) =>
                                  setEditJumlahBarang(e.target.value)
                                }
                              ></TextField>
                            </Grid>
                          </Grid>
                        ) : item.stock_qty === "" || item.stock_qty === null ? (
                          "-"
                        ) : (
                          item.stock_qty
                        )}
                      </TableCell>
                      <TableCell
                        // sx={{ textAlign: "left" }}
                        align="center"
                      >
                        {item.stock_pack === "" || item.stock_pack === null
                          ? "-"
                          : item.stock_pack}
                      </TableCell>
                      <TableCell
                        // sx={{ textAlign: "left" }}
                        align="center"
                      >
                        {item.stock_price === 0
                          ? "-"
                          : "Rp" +
                            String(item.stock_price).replace(
                              /\B(?=(\d{3})+(?!\d))/g,
                              "."
                            )}
                      </TableCell>
                      <TableCell
                        // sx={{ textAlign: "left" }}
                        align="center"
                      >
                        {/* {item.sale_proname === "" || item.sale_proname === null
                          ? "-"
                          : item.sale_proname} */}
                        {item.stock_totalsales === 0
                          ? "-"
                          : "Rp" +
                            String(item.stock_totalsales).replace(
                              /\B(?=(\d{3})+(?!\d))/g,
                              "."
                            )}
                      </TableCell>
                      <TableCell
                        // sx={{ textAlign: "left" }}
                        align="center"
                      >
                        {changeButton(item, index)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <TableContainer>
            <Table size="medium">
              <TableHead>
                <TableRow>
                  {tableHeader &&
                    tableHeader.map((head, index) => (
                      <TableCell
                        sx={{
                          fontWeight: "600",
                        }}
                        key={index}
                      >
                        <Typography
                          fontSize={{
                            lg: 17,
                            md: 15,
                            sm: 10,
                            xs: 8,
                          }}
                        >
                          {head.name}
                        </Typography>
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
        )}
      </Paper>
      {listSales !== null ? (
        <Stack alignItems={"flex-end"} sx={{ pt: 2 }}>
          <Box sx={{ width: "35%" }}>
            <Paper sx={{ ml: "1em" }} elevation={12} borderradius={25}>
              <Grid container alignItems="center" justifyContent="center">
                <Typography
                  fontSize={{
                    lg: 17,
                    md: 17,
                    sm: 15,
                    xs: 10,
                  }}
                >
                  {language === "ID" ? "RINCIAN PEMBAYARAN" : "DETAIL PAYMENT"}
                </Typography>
              </Grid>
              <Divider sx={{ borderBottomWidth: 3, ml: 2, mr: 2 }} />

              <Grid container>
                <Grid item xs={6} sx={{ ml: "1em" }}>
                  <Typography> Total </Typography>
                </Grid>
                <Grid item xs={5} sx={{ float: "right" }}>
                  <Typography sx={{ float: "right" }}>
                    {total === 0
                      ? "-"
                      : "Rp" +
                        String(total).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    {/* {total} */}
                  </Typography>
                </Grid>

                <Grid container>
                  <Grid item xs={6} sx={{ ml: "1em" }}>
                    <Typography> Payment </Typography>
                  </Grid>
                  <Grid item xs={5} sx={{ float: "right" }}>
                    <Typography sx={{ float: "right" }}>
                      {cashFinal === 0 && selectTypePayment === ""
                        ? "-"
                        : selectTypePayment === "BANK"
                        ? "Rp" +
                          String(total).replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                        : "Rp" +
                          String(cashFinal).replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            "."
                          )}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={6} sx={{ ml: "1em" }}>
                    <Typography> Change </Typography>
                  </Grid>
                  <Grid item xs={5} sx={{ float: "right" }}>
                    <Typography sx={{ float: "right" }}>
                      {"Rp" +
                        String(
                          selectTypePayment === "BANK" || cashFinal === 0
                            ? 0
                            : cashFinal - total
                        ).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Box>

          <Box fullwidth sx={{ mt: 2 }}>
            <Grid container spacing={1}>
              <Grid item flex={1}>
                <Button
                  sx={{ backgroundColor: "#21b6ae" }}
                  // disabled={grandTotalTransaction === 0}
                  variant="contained"
                  size="small"
                  // onClick={toggleTransfer.bind(this)}
                  onClick={() => setModalAddPayment(true)}
                >
                  PAYMENT
                </Button>
              </Grid>
              <Grid item flex={1}>
                <Button
                  sx={{ backgroundColor: "#D2042D" }}
                  // disabled={grandTotalTransaction === 0}
                  variant="contained"
                  size="small"
                  // onClick={(e) => resetAll(e)}
                  onClick={() => cancelAll()}
                >
                  {language === "ID" ? "BATAL" : "CANCEL"}
                </Button>
              </Grid>
              <Grid item flex={1}>
                <Button
                  sx={{ backgroundColor: "#2cae6b" }}
                  // disabled={btnInsertTransaction}
                  variant="contained"
                  size="small"
                  // onClick={(e) => toggleModalSave(e)}
                  disabled={selectTypePayment === "" || cashFinal === 0}
                >
                  {language === "ID" ? "SIMPAN" : "SAVE"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      ) : (
        ""
      )}
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
      {/* </Paper> */}

      {/* Modal Add Sales */}
      <Modal open={modalAddSales}>
        <ModalWrapper sx={{ width: "50%" }}>
          <Box sx={{ width: "100%" }}>
            <Grid align="center">
              <Typography variant="h5" sx={{ fontWeight: 600, mt: 0.5 }}>
                {/* {`SP dengan Nomor Pesanan ${nomorPesanan} Belum Terbentuk`} */}
                {`Add Product`}
              </Typography>
            </Grid>

            <Divider sx={{ my: 2 }} />
            <Grid container>
              <Grid item xs={2} sx={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}>
                <ModalInputWrapper>
                  <Typography variant="body1" sx={{ p: 1, fontWeight: 400 }}>
                    {language === "ID" ? "Kode Barang" : "Item Code"}
                  </Typography>
                </ModalInputWrapper>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  size="small"
                  // value={date + " " + time}
                  // disabled
                  value={kodeProduk}
                  onChange={(e) => setKodeProduk(e.target.value)}
                  fullWidth
                ></TextField>
              </Grid>
              <Grid item xs={1}>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  disabled={kodeProduk === 0}
                  onClick={() => debounceMountGetOneStock(kodeProduk)}
                >
                  <SearchIcon />
                </Button>
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={2} sx={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}>
                <ModalInputWrapper>
                  <Typography variant="body1" sx={{ p: 1, fontWeight: 400 }}>
                    {language === "ID" ? "Nama Barang" : "Item Name"}
                  </Typography>
                </ModalInputWrapper>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  size="small"
                  // value={date + " " + time}
                  // disabled
                  value={namaBarang}
                  disabled
                  fullWidth
                  sx={
                    namaBarang === ""
                      ? { backgroundColor: "rgba(0, 0, 0, 0.1)" }
                      : ""
                  }
                ></TextField>
              </Grid>
            </Grid>

            <Grid container mt={2}>
              <Grid item xs={2} sx={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}>
                <ModalInputWrapper>
                  <Typography variant="body1" sx={{ p: 1, fontWeight: 400 }}>
                    {language === "ID" ? "Jumlah" : "Qty"}
                  </Typography>
                </ModalInputWrapper>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  size="small"
                  sx={
                    namaBarang === ""
                      ? { backgroundColor: "rgba(0, 0, 0, 0.1)" }
                      : ""
                  }
                  disabled={namaBarang === ""}
                  value={jumlahBarang}
                  onChange={(e) => setJumlahBarang(e.target.value)}
                  // disabled
                  fullWidth
                ></TextField>
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={1}></Grid>
              <Grid
                item
                xs={2}
                // sx={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}
              >
                {/* <ModalInputWrapper>
                  <Typography variant="body1" sx={{ p: 1, fontWeight: 400 }}>
                    {language === "ID" ? "Nama Barang" : "Item Name"}
                  </Typography>
                </ModalInputWrapper> */}
              </Grid>
              <Grid item xs={3}>
                {/* <TextField
                  size="small"
                  // value={date + " " + time}
                  // disabled
                  fullWidth
                ></TextField> */}
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />

            <Grid container>
              <Grid item xs={8}></Grid>
              <Grid item xs={1.85}>
                <Button
                  color="error"
                  // variant="danger"
                  variant="contained"
                  onClick={() => setModalAddSales(false)}
                  // sx={{
                  //   marginTop: 1,
                  //   float: "right",
                  // }}
                  // sx={{ color: "danger" }}
                  fullWidth
                >
                  <b>CANCEL</b>
                </Button>
              </Grid>
              <Grid item xs={0.3}></Grid>
              <Grid item xs={1.85}>
                <Button
                  color="success"
                  variant="contained"
                  onClick={() => appendDataSales()}
                  // sx={{
                  //   marginTop: 1,
                  //   float: "right",
                  // }}
                  // sx={{ color: "success" }}
                  fullWidth
                >
                  <b>OK</b>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </ModalWrapper>
      </Modal>

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

      {/* Modal Add Paynment */}
      <Modal open={modalAddPayment}>
        <ModalWrapper sx={{ width: "50%" }}>
          <Box sx={{ width: "100%" }}>
            <Grid align="center">
              <Typography variant="h5" sx={{ fontWeight: 600, mt: 0.5 }}>
                {/* {`SP dengan Nomor Pesanan ${nomorPesanan} Belum Terbentuk`} */}
                {`Add Product`}
              </Typography>
            </Grid>

            <Divider sx={{ my: 2 }} />
            <Grid container>
              <Grid item xs={3} sx={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}>
                <ModalInputWrapper>
                  <Typography variant="body1" sx={{ p: 1, fontWeight: 400 }}>
                    {language === "ID" ? "Jenis Pembayaran" : "Type of Payment"}
                  </Typography>
                </ModalInputWrapper>
              </Grid>
              <Grid item xs={3}>
                <Select
                  value={selectTypePayment}
                  fullWidth
                  size="small"
                  sx={{
                    backgroundColor: "white",
                  }}
                  onChange={(e) => setSelectTypePayment(e.target.value)}
                >
                  <MenuItem value={"null"} disabled>
                    ==PILIH JENIS PEMBAYARAN==
                  </MenuItem>
                  {listPayment &&
                    listPayment.map((item, index) => (
                      <MenuItem
                        key={index}
                        value={item.jenis}
                      >{`${item.jenis}`}</MenuItem>
                    ))}
                </Select>
              </Grid>
              {/* <Grid item xs={1}>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  disabled={kodeProduk === 0}
                  onClick={() => debounceMountGetOneStock(kodeProduk)}
                >
                  <SearchIcon />
                </Button>
              </Grid> */}
              {/* <Grid item xs={0.5}></Grid>
              <Grid
                item
                xs={2.5}
                sx={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}
              >
                <ModalInputWrapper>
                  <Typography variant="body1" sx={{ p: 1, fontWeight: 400 }}>
                    {language === "ID" ? "" : "Item Name"}
                  </Typography>
                </ModalInputWrapper>
              </Grid> */}
              <Grid item xs={0.5}></Grid>
              <Grid item xs={1}>
                {selectTypePayment === "TUNAI" ? (
                  <TextField size="small" disabled value="Rp."></TextField>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={4.5}>
                {selectTypePayment === "TUNAI" ? (
                  <TextField
                    size="small"
                    // value={date + " " + time}
                    // disabled
                    label="Amount"
                    // value={String(cash).replace(
                    //   /\B(?=(\d{3})+(?!\d))/g,
                    //   "."
                    // )}
                    // value={formatCurrency(cash)}
                    // value={formatToIDR(cash)}
                    // onChange={handleAmountChange}
                    value={cashValue}
                    onChange={(e) => onChangeCash(e, e.target.value)}
                    onKeyDown={handleKeyDownPayment}
                    // onChange={(e) => setCash(e.target.value)}
                    inputProps={{
                      startAdornment: (
                        <InputAdornment position="start" disabled>
                          Rp.
                        </InputAdornment>
                      ),
                    }}
                    // disabledz
                    fullWidth
                    sx={
                      namaBarang === ""
                        ? { backgroundColor: "rgba(0, 0, 0, 0.1)" }
                        : ""
                    }
                  ></TextField>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Grid container>
              <Grid item xs={8}></Grid>
              <Grid item xs={1.85}>
                <Button
                  color="error"
                  // variant="danger"
                  variant="contained"
                  onClick={() => setModalAddPayment(false)}
                  // sx={{
                  //   marginTop: 1,
                  //   float: "right",
                  // }}
                  // sx={{ color: "danger" }}
                  fullWidth
                >
                  <b>CANCEL</b>
                </Button>
              </Grid>
              <Grid item xs={0.3}></Grid>
              <Grid item xs={1.85}>
                <Button
                  color="success"
                  variant="contained"
                  onClick={() => savePaymentType()}
                  // disabled={selectTypePayment !== "" || cash !== 0}
                  // sx={{
                  //   marginTop: 1,
                  //   float: "right",
                  // }}
                  // sx={{ color: "success" }}
                  fullWidth
                >
                  <b>SAVE</b>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </ModalWrapper>
      </Modal>

      <Modal open={isLoading}>
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
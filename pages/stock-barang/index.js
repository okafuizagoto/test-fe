/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import PropTypes from "prop-types";
import { Add, Block, Edit } from "@mui/icons-material";
import {
  Box,
  Divider,
  Link,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  FormControl,
  InputLabel,
  Select,
  Grid,
  Button,
  Tab,
  TextField,
  TableRow,
  TableCell,
  // TabPanel,
  Tabs,
  Typography,
  TabContainer,
  TabHead,
  TabBody,
  TablePagination,
  TableFooter,
  Card,
  CardHeader,
  CardContent,
  Stack,
  Autocomplete,
} from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { AddBox, AddCircleOutline, Search } from "@mui/icons-material";
import { Collapse } from "@mui/material";
import { MenuItem } from "@mui/material";
import api from "../../services/stock";
import { debounce, filter, isNull, isUndefined } from "lodash";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import DeleteIcon from "@mui/icons-material/Delete";
import { AddCircle, CheckBox } from "@mui/icons-material";
import { deleteStorage, getStorage, setStorage } from "../../utils/storage";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
// import { moment } from "@mui/x-date-pickers/AdapterMoment";
import Modal from "@mui/material/Modal";
import { formatDate } from "../../utils/text";
import CircularProgress from "@mui/material/CircularProgress";
// import useDownloader from "react-use-downloader";
import axios from "axios";
// import { useMediaQuery } from "react-responsive";
// import {
//   BrowserView,
//   MobileView,
//   isBrowser,
//   isMobile,
// } from "react-device-detect";
// import MediaQuery from "react-responsive";
// import Style from "../../styles/grid.module.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
// import { useMediaQuery as usemediaQuery } from "@mui/material";
import useToast from "../../utils/toast";
import LogoutIcon from "@mui/icons-material/Logout";
import core from "../../services/core";
import { useRouter } from "next/router";

const style = {
  position: "absolute",
  top: "15%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const styleMobile = {
  position: "absolute",
  top: "25%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 270,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const styleButton = {
  backgroundColor: "primary.main",
  marginLeft: "27em",
};

const styleButtonPagination = {
  backgroundColor: "primary.main",
  marginLeft: "0.1em",
  maxWidth: "1em",
  maxHeight: "2.9em",
  minWidth: "1em",
  minHeight: "2.9em",
};

const styleButtonMobile = {
  backgroundColor: "primary.main",
  marginLeft: "2em",
};

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 100,
  bgcolor: "white",
  pt: 2,
  px: 4,
  pb: 3,
  display: "flex",
};

const styleLoading = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  p: 4,
};

const styleMobileBox = {
  transform: "translate(-8%, -0%)",
  p: 3,
  alignContent: "center",
};
const styleMobileBox1 = {
  transform: "translate(-5%, -0%)",
  p: 3,
  alignContent: "center",
};

const styleBox = {
  p: 3,
  alignContent: "center",
};

function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Open Child Modal</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;
//   const isTabletOrMobile = useMediaQuery({ query: "(max-width:410px)" });
//   const isTabletOrMobile1 = useMediaQuery({
//     query: "(max-width:615px)",
//   });
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
        //   sx={
        //     isTabletOrMobile === true
        //       ? styleMobileBox
        //       : isTabletOrMobile1 === true
        //       ? styleMobileBox1
        //       : styleBox
        //   }
        >
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [listAllStockHeader, setListAllStockHeader] = useState([])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    debounceMountListAllStockHeader()
  }, [])

  const debounceMountListAllStockHeader = useCallback(debounce(mountListAllStockHeader, 400));

  async function mountListAllStockHeader() {
//     const offset = limit * currentPage - limit;
    try {
      const getListAllStockHeader = await api.getAllStockHeader();
      // console.log("offset", offset);
      // console.log("limit", limit);
      const { data, metadata } = getListAllStockHeader.data;
      if (data != null) {
        setListAllStockHeader(data);
        // setMetadataTotalPPNOut(metadata);
        // setPaginationShow(true);
      } else {
        setListAllStockHeader([]);
        // setPaginationShow(false);
        console.log("error");
      }
      // var urlListPPNOUT = getListPPNOUT.config.url;
    } catch (error) {
      // setPaginationShow(false);
      console.log(error);
    }
  }

//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   const debounceMountDeletePPNOUT = useCallback(
//     debounce(mountDeletePPNOUT, 400)
//   );

//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   const debounceMountGeneratePPNOUT = useCallback(
//     debounce(mountGeneratePPNOUT, 400)
//   );

//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   const debounceMountGeneratePPNIN = useCallback(
//     debounce(mountGeneratePPNIN, 400)
//   );

//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   const debounceMountDownloadPPNOUT = useCallback(
//     debounce(mountDownloadPPNOUT, 400)
//   );

//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   const debounceMountDownloadPPNOUT2 = useCallback(
//     debounce(mountDownloadPPNOUT2, 400)
//   );

//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   const debounceMountDownloadPPNIN = useCallback(
//     debounce(mountDownloadPPNIN, 400)
//   );
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   const debounceMountDownloadPPNIN2 = useCallback(
//     debounce(mountDownloadPPNIN2, 400)
//   );
// //   const [collapse, setCollapse] = useState(true);
// //   const [isTabOne, setIsTabOne] = useState(true);
// //   const [isTabTwo, setIsTabTwo] = useState(true);
// //   const [listPPNOUT, setListPPNOUT] = useState([]);
// //   const [listPPNIN, setListPPNIN] = useState([]);
// //   const [selectedStartDatePPNOUT, setSelectedStartDatePPNOUT] = useState("");
// //   const [selectedEndDatePPNOUT, setSelectedEndDatePPNOUT] = useState("");
// //   const [disableInputPPNOUT, setDisableInputPPNOUT] = useState(true);
// //   const [selectedStartDatePPNIN, setSelectedStartDatePPNIN] = useState("");
// //   const [selectedEndDatePPNIN, setSelectedEndDatePPNIN] = useState("");
// //   const [disableInputPPNIN, setDisableInputPPNIN] = useState(true);
// //   const userPT = JSON.parse(getStorage("pt"));
// //   const userNIP = getStorage("userNIP");
//   const [modalDeletePPNOUT, setModalDeletePPNOUT] = useState(false);
// //   const [payloadDeletePPNOUT, setPayloadDeletePPNOUT] = useState([]);
//   const [modalDeletePPNIN, setModalDeletePPNIN] = useState(false);
// //   const [payloadDeletePPNIN, setPayloadDeletePPNIN] = useState([]);
//   const [selectedResultDownloadPPNOUT, setSelectedResultDownloadPPNOUT] =
//     useState([]);
//   const [modalDownloadPPNOUT, setModalDownloadPPNOUT] = useState(false);

//   const [selectedResultDownloadPPNIN, setSelectedResultDownloadPPNIN] =
//     useState([]);
//   const [modalDownloadPPNIN, setModalDownloadPPNIN] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
//   const [validationProses, setValidationProses] = useState(true);
//   const [validationProsesPPNIN, setValidationProsesPPNIN] = useState(true);

//   const [paginationShow, setPaginationShow] = useState(false);
//   const [limit, setLimit] = useState(5);
//   // const [selectedCSV, setSelectedCSV] = useState();

//   const [currentPage, setCurrentPage] = useState(1);
//   const [editCurrentPage, setEditCurrentPage] = useState(1);
// //   const [maxPage, setMaxPage] = useState(0);

//   const [paginationShowPPNIN, setPaginationShowPPNIN] = useState(false);
//   const [limitPPNIN, setLimitPPNIN] = useState(5);
//   // const [selectedCSV, setSelectedCSV] = useState()

//   const [currentPagePPNIN, setCurrentPagePPNIN] = useState(1);
//   const [editCurrentPagePPNIN, setEditCurrentPagePPNIN] = useState(1);
// //   const [maxPagePPNIN, setMaxPagePPNIN] = useState(0);

//   const [payloadDownload, setPayloadDownload] = useState([]);
//   const [payloadDownloadPPNIN, setPayloadDownloadPPNIN] = useState([]);

//   const [responseModalIsOpen, setResponseModalIsOpen] = useState(false);
//   const [responseHeader, setResponseHeader] = useState("");
//   const [responseBody, setResponseBody] = useState("");

//   const [urlGenerate, setUrlGenerate] = useState("");
//   const [modalGeneratePPNIN, setModalGeneratePPNIN] = useState(false);

//   const isDesktopOrLaptop = useMediaQuery({
//     query: "(min-width: 1224px)",
//   });
//   const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
//   const isTabletOrMobile = useMediaQuery({ query: "(max-width: 700px)" });
//   const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
//   const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

//   const [metadataTotalPPNOut, setMetadataTotalPPNOut] = useState("");
//   const [metadataTotalPPNIn, setMetadataTotalPPNIn] = useState("");

//   const [displayToast] = useToast();

//   const [hideTotal, setHideTotal] = useState(true);
//   const [hideTotalIN, setHideTotalIN] = useState(true);

//   const [listOutlet, setListOutlet] = useState([]);
//   const debounceMountGetOutlet = useCallback(debounce(mountGetOutlet, 400), []);
//   const router = useRouter();
//   // const [indexPPNOUT, setIndexPPNOUT] = useState(0)
//   // var indexPPN

//   // useEffect(()=>{
//   //   console.log("lim",limit , currentPage);
//   //   indexPPN = limit * currentPage - limit
//   // },[limit,currentPage])

//   //   const { size, elapsed, percentage, download,
//   //     cancel, error, isInProgress } =
//   // useDownloader();

//   // const fileUrl =
//   //   "https://storage.googleapis.com/staging.cfu-main.appspot.com/sales-ppn-out/2022102516161610254.csv";
//   // const filename = "File.csv";

//   useEffect(() => {
//     if (!isNull(userPT) && !isUndefined(userPT.pt_id)) {
//       debounceMountGetOutlet(userPT.pt_id);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   async function mountGetOutlet(userPT) {
//     const newParams = {
//       pt: userPT,
//     };
//     try {
//       const getOutlet = await core.getUserOutlet(userNIP, newParams);
//       const { data } = getOutlet.data;
//       setListOutlet(data);
//     } catch (error) {
//       console.log("error", error);
//     }
//   }

//   const tableHeader = [
//     {
//       name: "NO",
//     },
//     {
//       name: "ID",
//     },
//     {
//       name: "PROCESS TIME",
//     },
//     {
//       name: "USER PROCESS",
//     },
//     {
//       name: "ACTION",
//     },
//   ];

//   // --------------------- in ---------------------

//   function handleFirstPagePPNIN() {
//     setEditCurrentPagePPNIN(1);
//     setCurrentPagePPNIN(1);
//     if (editCurrentPagePPNIN > maxPagePPNIN) {
//       setEditCurrentPage(maxPagePPNIN);
//       setCurrentPage(maxPagePPNIN);
//     } else if (editCurrentPagePPNIN < 1) {
//       setEditCurrentPagePPNIN(1);
//       setCurrentPagePPNIN(1);
//     }
//   }

//   function handlePrevPagePPNIN() {
//     // setIsLoading(true)
//     var prev = 0;
//     prev = parseInt(editCurrentPagePPNIN) - 1;
//     setEditCurrentPagePPNIN(prev);
//     setCurrentPagePPNIN(prev);
//     if (editCurrentPagePPNIN > maxPagePPNIN) {
//       // setIsLoading(false)
//       setEditCurrentPage(maxPagePPNIN);
//       setCurrentPage(maxPagePPNIN);
//     } else if (editCurrentPagePPNIN < 1) {
//       // setIsLoading(false)
//       setEditCurrentPagePPNIN(1);
//       setCurrentPagePPNIN(1);
//     }
//   }

//   const handleChange1PPNIN = (e) => {
//     var regexNumber = /^-?\d*\.?\d*$/;
//     if (maxPagePPNIN !== "") {
//       if (!regexNumber.test(e.target.value)) {
//       } else {
//         setEditCurrentPagePPNIN(e.target.value);
//       }
//     }
//   };

//   function handleEnterPressPagePPNIN(e) {
//     var code = e.charCode || e.which;
//     if (code === 13) {
//       e.preventDefault();
//       if (parseInt(editCurrentPagePPNIN) > maxPagePPNIN) {
//         setEditCurrentPagePPNIN(maxPagePPNIN);
//         setCurrentPagePPNIN(maxPagePPNIN);
//       } else if (
//         parseInt(editCurrentPagePPNIN) < 0 ||
//         parseInt(editCurrentPagePPNIN) == 0
//       ) {
//         setEditCurrentPagePPNIN(1);
//         setCurrentPagePPNIN(1);
//       } else {
//         setEditCurrentPagePPNIN(e.target.value);
//         setCurrentPagePPNIN(e.target.value);
//       }
//     }
//   }

//   function handleNextPagePPNIN() {
//     // setIsLoading(true)
//     var next = 0;
//     next = parseInt(editCurrentPagePPNIN) + 1;
//     setEditCurrentPagePPNIN(next);
//     setCurrentPagePPNIN(next);
//     if (editCurrentPagePPNIN > maxPagePPNIN) {
//       // setIsLoading(false)
//       setEditCurrentPagePPNIN(maxPagePPNIN);
//       setCurrentPagePPNIN(maxPagePPNIN);
//       // setIndexPPNOUT(5)
//     } else if (editCurrentPagePPNIN < 1) {
//       // setIsLoading(false)
//       setEditCurrentPagePPNIN(1);
//       setCurrentPagePPNIN(1);
//     }
//   }

//   function handleLastPagePPNIN() {
//     setEditCurrentPagePPNIN(maxPagePPNIN);
//     setCurrentPagePPNIN(maxPagePPNIN);
//     if (editCurrentPagePPNIN > maxPagePPNIN) {
//       setEditCurrentPagePPNIN(maxPagePPNIN);
//       setCurrentPagePPNIN(maxPagePPNIN);
//     } else if (editCurrentPagePPNIN < 1) {
//       setEditCurrentPagePPNIN(1);
//       setCurrentPagePPNIN(1);
//     }
//   }

//   useEffect(() => {
//     setEditCurrentPagePPNIN(1);
//     setCurrentPagePPNIN(1);
//   }, [limitPPNIN]);

//   useEffect(() => {
//     debounceMountListPPNIN();
//     debounceMountGetTotalPPNIN();
//   }, [limitPPNIN, currentPagePPNIN]);

//   // --------------------------------------------------------------------------------

//   function handleFirstPage() {
//     setEditCurrentPage(1);
//     setCurrentPage(1);
//     if (editCurrentPage > maxPage) {
//       setEditCurrentPage(maxPage);
//       setCurrentPage(maxPage);
//     } else if (editCurrentPage < 1) {
//       setEditCurrentPage(1);
//       setCurrentPage(1);
//     }
//   }

//   function handlePrevPage() {
//     // setIsLoading(true)
//     var prev = 0;
//     prev = parseInt(editCurrentPage) - 1;
//     setEditCurrentPage(prev);
//     setCurrentPage(prev);
//     if (editCurrentPage > maxPage) {
//       // setIsLoading(false)
//       setEditCurrentPage(maxPage);
//       setCurrentPage(maxPage);
//     } else if (editCurrentPage < 1) {
//       // setIsLoading(false)
//       setEditCurrentPage(1);
//       setCurrentPage(1);
//     }
//   }

//   const handleChange1 = (e) => {
//     var regexNumber = /^-?\d*\.?\d*$/;
//     if (maxPage !== "") {
//       if (!regexNumber.test(e.target.value)) {
//       } else {
//         setEditCurrentPage(e.target.value);
//       }
//     }
//   };

//   function handleEnterPressPage(e) {
//     var code = e.charCode || e.which;
//     if (code === 13) {
//       e.preventDefault();
//       if (parseInt(editCurrentPage) > maxPage) {
//         setEditCurrentPage(maxPage);
//         setCurrentPage(maxPage);
//       } else if (
//         parseInt(editCurrentPage) < 0 ||
//         parseInt(editCurrentPage) == 0
//       ) {
//         setEditCurrentPage(1);
//         setCurrentPage(1);
//       } else {
//         setEditCurrentPage(e.target.value);
//         setCurrentPage(e.target.value);
//       }
//     }
//   }

//   function handleNextPage() {
//     var next = 0;
//     // setIsLoading(true);
//     next = parseInt(editCurrentPage) + 1;
//     setEditCurrentPage(next);
//     setCurrentPage(next);
//     if (editCurrentPage > maxPage) {
//       setEditCurrentPage(maxPage);
//       setCurrentPage(maxPage);
//     } else if (editCurrentPage < 1) {
//       setEditCurrentPage(1);
//       setCurrentPage(1);
//     }
//   }

//   function handleLastPage() {
//     setEditCurrentPage(maxPage);
//     setCurrentPage(maxPage);
//     if (editCurrentPage > maxPage) {
//       setEditCurrentPage(maxPage);
//       setCurrentPage(maxPage);
//     } else if (editCurrentPage < 1) {
//       setEditCurrentPage(1);
//       setCurrentPage(1);
//     }
//   }

//   useEffect(() => {
//     setEditCurrentPage(1);
//     setCurrentPage(1);
//   }, [limit]);

//   useEffect(() => {
//     debounceMountListPPNOUT();
//     debounceMountGetTotalPPNOUT();
//   }, [limit, currentPage]);

// //   async function mountGetTotalPPNOUT() {
// //     try {
// //       const getTotalPPNOUT = await logistic.getTotalPPNOUT(userPT.pt_id);
// //       const { data, metadata } = getTotalPPNOUT.data;
// //       setMaxPage(parseInt(Math.ceil(metadata / limit)));
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   }
//   const debounceMountListPPNOUT = useCallback(debounce(mountListPPNOUT, 400));
//   const debounceMountListPPNIN = useCallback(debounce(mountListPPNIN, 400));
//   const debounceMountGetTotalPPNOUT = useCallback(
//     debounce(mountGetTotalPPNOUT, 400)
//   );

//   async function mountListPPNOUT() {
//     const offset = limit * currentPage - limit;
//     try {
//       const getListPPNOUT = await logistic.getListPPNOUT(
//         userPT.pt_id,
//         offset,
//         limit
//       );
//       console.log("offset", offset);
//       console.log("limit", limit);
//       const { data, metadata } = getListPPNOUT.data;
//       if (data != null) {
//         setListPPNOUT(data);
//         setMetadataTotalPPNOut(metadata);
//         setPaginationShow(true);
//       } else {
//         setListPPNOUT([]);
//         setPaginationShow(false);
//         console.log("error");
//       }
//       var urlListPPNOUT = getListPPNOUT.config.url;
//     } catch (error) {
//       setPaginationShow(false);
//       console.log(error);
//     }
//   }

//   const debounceMountGetTotalPPNIN = useCallback(
//     debounce(mountGetTotalPPNIN, 400)
//   );
//   async function mountListPPNIN() {
//     setIsLoading(true);
//     const offset = limitPPNIN * currentPagePPNIN - limitPPNIN;
//     try {
//       const getListPPNIN = await logistic.getListPPNIN(
//         userPT.pt_id,
//         offset,
//         limitPPNIN
//       );
//       const { data, metadata } = getListPPNIN.data;
//       if (data != null) {
//         setListPPNIN(data);
//         setMetadataTotalPPNIn(metadata);
//         setPaginationShowPPNIN(true);
//         setIsLoading(false);
//       } else {
//         setListPPNIN([]);
//         setPaginationShowPPNIN(false);
//         setIsLoading(false);
//         console.log("error");
//       }
//       console.log("userPT", userPT);
//     } catch (error) {
//       setPaginationShowPPNIN(false);
//       setIsLoading(false);
//       console.log(error);
//     }
//   }

//   const debounceMountSearchPPNOUT = useCallback(
//     debounce(mountSearchPPNOUT, 400)
//   );
//   async function mountSearchPPNOUT(startdate, enddate) {
//     const offset = limit * currentPage - limit;
//     try {
//       const getSearchPPNOUT = await logistic.getSearchPPNOUT(
//         userPT.pt_id,
//         startdate,
//         enddate,
//         offset,
//         limit
//       );
//       const { data, metadata } = getSearchPPNOUT.data;
//       if (data != null) {
//         setListPPNOUT(data);
//         var urlListPPNOUT = getSearchPPNOUT.config.url;
//         console.log("configurlSearch", urlListPPNOUT);
//         console.log("dataSearch", data);
//         displayToast("success", "Data Berhasil Ditemukan");
//         setHideTotal(false);
//       } else {
//         setListPPNOUT([]);
//         console.log("error");
//         displayToast("error", "Data Tidak Ditemukan");
//       }
//     } catch (error) {
//       displayToast("error", "Data Tidak Ditemukan");
//       setPaginationShow(false);
//       console.log(error);
//     }
//   }

//   const debounceMountSearchPPNIN = useCallback(debounce(mountSearchPPNIN, 400));
//   async function mountSearchPPNIN(startdate, enddate) {
//     const offset = limit * currentPage - limit;
//     try {
//       const getSearchPPNIN = await logistic.getSearchPPNIN(
//         userPT.pt_id,
//         startdate,
//         enddate,
//         offset,
//         limit
//       );
//       const { data, metadata } = getSearchPPNIN.data;
//       var urlListPPNIN = getSearchPPNIN.config.url;
//       console.log("configurlSearch", urlListPPNIN);
//       if (data != null) {
//         setListPPNIN(data);
//         console.log("dataSearch", data);
//         displayToast("success", "Data Berhasil Ditemukan");
//         setHideTotalIN(false);
//       } else {
//         setListPPNIN([]);
//         displayToast("error", "Data Tidak Ditemukan");
//       }
//       console.log("configurlSearch", urlListPPNIN);
//     } catch (error) {
//       displayToast("error", "Data Tidak Ditemukan");
//       setPaginationShow(false);
//       console.log(error);
//     }
//   }

//   async function mountGetTotalPPNIN() {
//     try {
//       const getTotalPPNIN = await logistic.getTotalPPNIN(userPT.pt_id);
//       const { data, metadata } = getTotalPPNIN.data;
//       setMaxPagePPNIN(parseInt(Math.ceil(metadata / limitPPNIN)));
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async function deletePPNOUT1(item) {
//     setPayloadDeletePPNOUT(item);
//     setModalDeletePPNOUT(true);
//   }

//   async function mountDeletePPNOUT(item) {
//     setIsLoading(true);
//     try {
//       const deletePPNOUT = await logistic.deletePPNOUT(
//         userPT.pt_id,
//         payloadDeletePPNOUT.efakh_outid
//       );
//       const { data } = deletePPNOUT.data;
//       mountListPPNOUT();
//       setModalDeletePPNOUT(false);
//       setIsLoading(false);
//     } catch (error) {
//       setIsLoading(false);
//       console.log(error);
//     }
//   }

//   async function deletePPNIN1(item) {
//     setPayloadDeletePPNIN(item);
//     setModalDeletePPNIN(true);
//   }

//   async function mountDeletePPNIN(item) {
//     setIsLoading(true);
//     try {
//       const deletePPNIN = await logistic.deletePPNIN(
//         userPT.pt_id,
//         payloadDeletePPNIN.efakh_inid
//       );
//       const { data } = deletePPNIN.data;
//       mountListPPNIN();
//       setModalDeletePPNIN(false);
//       setIsLoading(false);
//     } catch (error) {
//       setIsLoading(false);
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     mountListPPNOUT();
//     mountListPPNIN();
//     return;
//   }, []);

//   useEffect(() => {}, [listPPNOUT, listPPNIN]);

//   useEffect(() => {
//     if (selectedStartDatePPNOUT === 0) {
//       setDisableInputPPNOUT(true);
//     }
//     if ((selectedStartDatePPNOUT !== 0) & (selectedStartDatePPNOUT !== "")) {
//       setDisableInputPPNOUT(false);
//     }
//     if (selectedStartDatePPNIN === 0) {
//       setDisableInputPPNIN(true);
//     }
//     if ((selectedStartDatePPNIN !== 0) & (selectedStartDatePPNIN !== "")) {
//       setDisableInputPPNIN(false);
//     }
//     if ((selectedEndDatePPNOUT !== 0) & (selectedEndDatePPNOUT !== "")) {
//       setValidationProses(false);
//     }
//     if ((selectedEndDatePPNIN !== 0) & (selectedEndDatePPNIN !== "")) {
//       setValidationProsesPPNIN(false);
//     }
//   }, [
//     selectedStartDatePPNIN,
//     selectedStartDatePPNOUT,
//     disableInputPPNOUT,
//     selectedEndDatePPNOUT,
//     selectedEndDatePPNIN,
//   ]);

//   // USING FETCH
//   // async function mountGeneratePPNOUT(startDate, endDate) {
//   //   setIsLoading(true);
//   //   try {
//   //     const generatePPNOUT = await logistic.generatePPNOUT(
//   //       userPT.pt_id,
//   //       userNIP,
//   //       startDate,
//   //       endDate
//   //     );
//   //     console.log("startDate", startDate);
//   //     console.log("endDate", endDate);
//   //     debounceMountListPPNOUT();
//   //     setIsLoading(false);
//   //   } catch (error) {
//   //     console.log(error);
//   //     setResponseModalIsOpen(true);
//   //     setResponseHeader("Data not Found");
//   //     setResponseBody("");
//   //     setIsLoading(false);
//   //   }
//   // }

//   // USING AXIOS
//   async function mountGeneratePPNOUT(startDate, endDate) {
//     setIsLoading(true);
//     try {
//       await logistic.generatePPNOUT(userPT.pt_id, userNIP, startDate, endDate);
//       debounceMountListPPNOUT();
//       setIsLoading(false);
//     } catch (error) {
//       console.log(error);
//       setResponseModalIsOpen(true);
//       setResponseHeader("Data not Found");
//       setResponseBody("");
//       setIsLoading(false);
//     }
//   }

//   // async function mountGeneratePPNIN(startDate, endDate) {
//   async function mountGeneratePPNIN() {
//     setIsLoading(true);
//     console.log("masukkkkkkkkkkkkkkkkkkkkkkkk");
//     try {
//       // if (response.status === 200) {
//       console.log("masukkkkkkkkkkkkkkkkkkkkkkkk2");

//       const generatePPNIN = await logistic.generatePPNIN(
//         userPT.pt_id,
//         userNIP,
//         formatDate(selectedStartDatePPNIN, "YYYYMMDD"),
//         formatDate(selectedEndDatePPNIN, "YYYYMMDD")
//       );

//       debounceMountListPPNIN();
//       setIsLoading(false);
//     } catch (error) {
//       console.log("masukkkkkkkkkkkkkkkkkkkkkkkk3");

//       console.log(error);
//       setResponseModalIsOpen(true);
//       setResponseHeader("Data not Found");
//       setResponseBody("");
//       setIsLoading(false);
//       // }
//     }
//   }
//   async function mountDownloadPPNOUT(item) {
//     // console.log("itemsssssssssssss", item);

//     setPayloadDownload(item);
//     setModalDownloadPPNOUT(true);
//   }

//   async function mountDownloadPPNOUT2() {
//     setIsLoading(true);
//     try {
//       const getListPPNOUT = await logistic.downloadPPNOUT2(
//         userPT.pt_id,
//         payloadDownload.efakh_outid
//       );
//       var urlGenerate = getListPPNOUT.config.baseURL + getListPPNOUT.config.url;

//       // console.log(urlGenerate);
//       // console.log("payload", payloadDownload.efakh_outid);
//       const option = {
//         method: "GET",
//         headers: {
//           Authorization: `${getStorage("access_token")}`,
//           NIP: `${getStorage("userNIP")}`,
//         },
//       };
//       fetch(urlGenerate, option).then((response) => {
//         if (response.status === 200) {
//           response.blob().then((blob) => {
//             let url = window.URL.createObjectURL(blob);
//             let a = document.createElement("a");
//             a.href = url;
//             a.download = payloadDownload.efakh_outid + ".csv";

//             a.click();
//             setModalDownloadPPNOUT(false);
//           });
//         }
//       });
//       setIsLoading(false);
//     } catch (error) {
//       console.log(error);
//       setIsLoading(false);
//     }
//   }

//   async function mountDownloadPPNIN(item) {
//     // console.log("itemssssssssssssssss",item);
//     setPayloadDownloadPPNIN(item);
//     setModalDownloadPPNIN(true);
//   }

//   async function mountDownloadPPNIN2() {
//     setIsLoading(true);
//     try {
//       const getListPPNIN = await logistic.downloadPPNIN2(
//         userPT.pt_id,
//         payloadDownloadPPNIN.efakh_inid
//       );
//       var urlGenerate = getListPPNIN.config.baseURL + getListPPNIN.config.url;

//       // console.log(urlGenerate);
//       // console.log("payload", payloadDownloadPPNIN.efakh_inid);
//       const option = {
//         method: "GET",
//         headers: {
//           Authorization: `${getStorage("access_token")}`,
//           NIP: `${getStorage("userNIP")}`,
//         },
//       };
//       fetch(urlGenerate, option).then((response) => {
//         if (response.status === 200) {
//           response.blob().then((blob) => {
//             let url = window.URL.createObjectURL(blob);
//             let a = document.createElement("a");
//             a.href = url;
//             a.download = payloadDownloadPPNIN.efakh_inid + ".csv";

//             a.click();
//             setModalDownloadPPNIN(false);
//           });
//         }
//       });
//       setIsLoading(false);
//     } catch (error) {
//       console.log(error);
//       setIsLoading(false);
//     }
//   }

//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };

//   function onChangeLimit(e) {
//     setLimit(e.target.value);
//     setCurrentPage(1);
//     setEditCurrentPage(1);
//   }

//   function onChangeLimitPPNIN(e) {
//     setLimitPPNIN(e.target.value);
//     setCurrentPagePPNIN(1);
//     setEditCurrentPagePPNIN(1);
//   }
//   const mx600 = usemediaQuery("(max-width:700px)");

//   function pilihPTLain() {
//     deleteStorage("pt");
//     deleteStorage("outlet");
//     router.push("/company-outlet-selection");
//   }

  return (
    <>
    <Box sx={{ width: "100%", m:3 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Grid container justifyContent={"space-between"} display="flex">
              <Grid item flex={1}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 600, textAlign: "center" }}
                >
                  Stock Barang
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ mt: 2 }}></Divider>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="List Stock Barang" {...a11yProps(0)} />
              <Tab label="Daftar Stock Barang" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <Box>
            <Grid container 
            // className={Style.containers}
            >
              <Grid container display="flex" sx={{ m: 2 }}>
                <Grid
                  item
                  flex={12}
                //   style={{ flexBasis: mx600 ? "45%" : "23%" }}
                ></Grid>
              </Grid>
            </Grid>
          </Box>
          <TabPanel value={value} index={0}>
            <Box>
              <Grid container>
                <Grid item xs = {2}>
                <FormControl fullWidth sx={{ width: "95%" }}>
              <InputLabel id="bulan-label">Choose Type Input</InputLabel>
          <Select label="choose type input" size="small">
            <MenuItem>Keyboard</MenuItem>
            <MenuItem>Barcode</MenuItem>
          </Select>
                      </FormControl>
                </Grid>
                <Grid item xs = {8}>
                  <TextField size="small" fullWidth>

                  </TextField>
                </Grid>
                <Grid item xs = {2}>
                <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "green",
                          align:"center",
                          ml:1
                        }}
                        // onClick={() =>
                        //   debounceMountSearchPPNOUT(
                        //     formatDate(selectedStartDatePPNOUT, "YYYYMMDD"),
                        //     formatDate(selectedEndDatePPNOUT, "YYYYMMDD")
                        //   )
                        // }
                        // disabled={validationProses}
                      >
                        SEARCH
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "green",
                          align:"center",
                          ml:1
                        }}
                        // onClick={() =>
                        //   debounceMountSearchPPNOUT(
                        //     formatDate(selectedStartDatePPNOUT, "YYYYMMDD"),
                        //     formatDate(selectedEndDatePPNOUT, "YYYYMMDD")
                        //   )
                        // }
                        // disabled={validationProses}
                      >
                        <AddCircle sx={{  color: "white" }} />
                      </Button>
                </Grid>
              </Grid>
              <Grid
                    container
                    justifyContent={"space-between"}
                    sx={{ margin: "1%" }}
                  >
                    <FormControl sx={{ width: "95%" }}>
                      <Grid sx={{ textAlign: "center" }}>
                        <TableContainer component={Paper}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell align="center">
                                  <b>NO</b>
                                </TableCell>
                                <TableCell align="left">
                                  <b>Stock Code</b>
                                </TableCell>
                                <TableCell align="left">
                                  <b>Stock Name</b>
                                </TableCell>
                                <TableCell align="left">
                                  <b>Stock Pack</b>
                                </TableCell>
                                <TableCell align="left">
                                  <b>Stock Qty</b>
                                </TableCell>
                                <TableCell align="left">
                                  <b>Stock Price</b>
                                </TableCell>
                                <TableCell align="left">
                                  <b>Stock Qty Update</b>
                                </TableCell>
                                <TableCell align="left">
                                  <b>Stock Last Update</b>
                                </TableCell>
                                <TableCell align="left">
                                  <b>Stock Update By</b>
                                </TableCell>
                                <TableCell align="center">
                                  <b>ACTION</b>
                                </TableCell>
                              </TableRow>
                            </TableHead>

                            <TableBody>
                              {listAllStockHeader &&
                                listAllStockHeader.map((item, index) => (
                                  <TableRow key={index}>
                                    <TableCell align="center">
                                      {/* {index +
                                        (limit * currentPage - limit) +
                                        1} */}
                                         {index + 1}
                                    </TableCell>

                                    <TableCell>
                                      {item.stock_code === "" ||
                                      item.stock_code === null
                                        ? "-"
                                        : item.stock_code}{" "}
                                    </TableCell>
                                    <TableCell>
                                      {item.stock_name === "" ||
                                      item.stock_name === null
                                        ? "-"
                                        : item.stock_name}
                                    </TableCell>
                                    <TableCell>
                                      {item.stock_pack === "" ||
                                      item.stock_pack === null
                                        ? "-"
                                        : item.stock_pack}
                                    </TableCell>
                                    <TableCell>
                                      {item.stock_qty === "" ||
                                      item.stock_qty === null
                                        ? "-"
                                        : item.stock_qty}
                                    </TableCell>
                                    <TableCell>
                                      {item.stock_price === "" ||
                                      item.stock_price === null
                                        ? "-"
                                        : item.stock_price}
                                    </TableCell>
                                    <TableCell>
                                      {item.stock_qty_update === "" ||
                                      item.stock_qty_update === null
                                        ? "-"
                                        : formatDate(
                                            item.stock_qty_update,
                                            "dddd, DD MMMM YYYY HH:mm:ss"
                                          )}
                                    </TableCell>
                                    <TableCell>
                                      {item.stock_last_update === "" ||
                                      item.stock_last_update === null
                                        ? "-"
                                        : formatDate(
                                            item.stock_last_update,
                                            "dddd, DD MMMM YYYY HH:mm:ss"
                                          )}
                                    </TableCell>
                                    <TableCell>
                                      {item.stock_update_by === "" ||
                                      item.stock_update_by === null
                                        ? "-"
                                        : item.stock_update_by}
                                    </TableCell>
                                    <TableCell>
                                      <Button
                                        variant="contained"
                                        startIcon={
                                          <ArrowDownwardIcon sx={{ ml: 1 }} />
                                        }
                                        size="large"
                                        sx={{ mr: 2, backgroundColor: "green" }}
                                        // onClick={() =>
                                        //   debounceMountDownloadPPNOUT(item)
                                        // }
                                      ></Button>
                                      <Button
                                        parameter
                                        variant="contained"
                                        sx={{ backgroundColor: "red" }}
                                        startIcon={
                                          <DeleteIcon sx={{ ml: 1 }} />
                                        }
                                        size="large"
                                        // onClick={() => deletePPNOUT1(item)}
                                      ></Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <Grid textAlign="center">
                          {/* <Collapse in={listPPNOUT.length === 0}>
                            <Box
                              sx={{
                                height: 300,
                                justifyContent: "center",
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <Typography variant="h4" sx={{ color: "red" }}>
                                No Item <Block sx={{ width: 30, height: 30 }} />
                              </Typography>
                            </Box>
                          </Collapse> */}
                        </Grid>
                      </Grid>
                      {/* <Collapse in={paginationShow}>
                        <Grid
                          container
                          direction="row"
                          spacing={2}
                          sx={{ justifyContent: "center" }}
                          mt={2}
                        >
                          <Grid
                            item
                            sx={{
                              width: "2.5em",
                            }}
                          >
                            <Button
                              sx={({ m: 0 }, styleButtonPagination)}
                              // fullWidth
                              variant="contained"
                              onClick={() => handleFirstPage()}
                              disabled={parseInt(editCurrentPage) === 1}
                            >
                              <FirstPageIcon />
                            </Button>
                          </Grid>
                          <Grid
                            item
                            sx={{
                              width: "2.5em",
                            }}
                          >
                            <Button
                              sx={({ m: 0 }, styleButtonPagination)}
                              variant="contained"
                              disabled={parseInt(editCurrentPage) === 1}
                              onClick={() => handlePrevPage()}
                            >
                              <ArrowBackIosIcon />{" "}
                            </Button>
                          </Grid>
                          <Grid item sx={{ width: "3.5em" }}>
                            <TextField
                              size="small"
                              sx={{ width: "3em" }}
                              value={editCurrentPage}
                              onChange={(e) => handleChange1(e)}
                              onKeyDown={(e) => handleEnterPressPage(e)}
                            ></TextField>
                          </Grid>
                          <Grid item sx={{ width: "0.1em" }}>
                            <Typography variant="h4">/</Typography>
                          </Grid>
                          <Grid
                            item
                            sx={{
                              width: "3.5em",
                            }}
                          >
                            <TextField
                              sx={{ width: "3em" }}
                              size="small"
                              value={maxPage}
                              disabled
                            ></TextField>
                          </Grid>
                          <Grid
                            item
                            sx={{
                              width: "2.5em",
                            }}
                          >
                            <Button
                              sx={({ m: 0 }, styleButtonPagination)}
                              variant="contained"
                              size="normal"
                              disabled={
                                parseInt(editCurrentPage) === parseInt(maxPage)
                              }
                              onClick={() => handleNextPage()}
                            >
                              <ArrowForwardIosIcon />
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button
                              sx={({ m: 0 }, styleButtonPagination)}
                              variant="contained"
                              onClick={() => handleLastPage()}
                              disabled={
                                parseInt(editCurrentPage) === parseInt(maxPage)
                              }
                            >
                              <LastPageIcon />
                            </Button>
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          direction="row"
                          spacing={2}
                          sx={{ justifyContent: "center" }}
                          mt={1}
                        >
                          <Grid item>
                            <Select
                              size="small"
                              value={limit}
                              onChange={(e) => onChangeLimit(e)}
                              sx={{ width: 64 }}
                            >
                              <MenuItem value={5}>5</MenuItem>
                              <MenuItem value={10}>10</MenuItem>
                              <MenuItem value={15}>15</MenuItem>
                            </Select>
                          </Grid>
                        </Grid>
                      </Collapse> */}
                    </FormControl>
                  </Grid>
                {/* </Grid> */}
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            {/* Item Two */}

            <Box>
              <Paper>
                
              </Paper>
            </Box>
          </TabPanel>
          {/* <Modal open={modalDeletePPNOUT}>
            <Box sx={isTabletOrMobile === false ? style : styleMobile}>
              <Grid>
                <Typography>
                  ARE YOU SURE WANT TO DELETE THIS TRANSACTION?
                </Typography>
                <Divider sx={{ my: 2 }}></Divider>
                <Grid>
                  <Button
                    variant="contained"
                    sx={
                      isTabletOrMobile === false
                        ? styleButton
                        : styleButtonMobile
                    }
                    onClick={(item) => debounceMountDeletePPNOUT(item)}
                  >
                    YES
                  </Button>

                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "error.main", marginLeft: "1em" }}
                    onClick={() => setModalDeletePPNOUT(false)}
                  >
                    NO
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Modal>
          <Modal open={modalDeletePPNIN}>
            <Box sx={isTabletOrMobile === false ? style : styleMobile}>
              <Grid>
                <Typography>
                  ARE YOU SURE WANT TO DELETE THIS TRANSACTION?
                </Typography>
                <Divider sx={{ my: 2 }}></Divider>
                <Grid>
                  <Button
                    variant="contained"
                    sx={
                      isTabletOrMobile === false
                        ? styleButton
                        : styleButtonMobile
                    }
                    onClick={(item) => mountDeletePPNIN(item)}
                  >
                    YES
                  </Button>

                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "error.main", marginLeft: "1em" }}
                    onClick={() => setModalDeletePPNIN(false)}
                  >
                    NO
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Modal>

          <Modal open={modalDownloadPPNOUT}>
            <Box sx={isTabletOrMobile === false ? style : styleMobile}>
              <Grid>
                <Typography>
                  ARE YOU SURE WANT TO DOWNLOAD THIS TRANSACTION?
                </Typography>
                <Divider sx={{ my: 2 }}></Divider>
                <Grid>
                  <Button
                    variant="contained"
                    sx={
                      isTabletOrMobile === false
                        ? styleButton
                        : styleButtonMobile
                    }
                    onClick={() => debounceMountDownloadPPNOUT2()}
                  >
                    Yes
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "error.main", marginLeft: "1em" }}
                    onClick={() => setModalDownloadPPNOUT(false)}
                  >
                    NO
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Modal>

          <Modal open={modalDownloadPPNIN}>
            <Box sx={isTabletOrMobile === false ? style : styleMobile}>
              <Grid>
                <Typography>
                  ARE YOU SURE WANT TO DOWNLOAD THIS TRANSACTION?
                </Typography>
                <Divider sx={{ my: 2 }}></Divider>
                <Grid>
                  <Button
                    variant="contained"
                    sx={
                      isTabletOrMobile === false
                        ? styleButton
                        : styleButtonMobile
                    }
                    onClick={(e) => debounceMountDownloadPPNIN2()}
                  >
                    YES
                  </Button>

                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "error.main", marginLeft: "1em" }}
                    onClick={() => setModalDownloadPPNIN(false)}
                  >
                    NO
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Modal>

          <Modal open={modalGeneratePPNIN}>
            <Box sx={isTabletOrMobile === false ? style : styleMobile}>
              <Grid>
                <Typography>
                  ARE YOU SURE WANT TO PROCESS THIS TRANSACTION?
                </Typography>
                <Divider sx={{ my: 2 }}></Divider>
                <Grid>
                  <Button
                    variant="contained"
                    sx={
                      isTabletOrMobile === false
                        ? styleButton
                        : styleButtonMobile
                    }
                    href={urlGenerate}
                  >
                    YES
                  </Button>

                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "error.main", marginLeft: "1em" }}
                    onClick={() => setModalGeneratePPNIN(false)}
                  >
                    NO
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Modal>

          <Modal open={responseModalIsOpen}>
            <Box
              sx={isTabletOrMobile === false ? style : styleMobile}
              style={{ textAlign: "center" }}
            >
              <Grid item flex={2}>
                <Typography>{responseHeader}</Typography>
              </Grid>
              <Grid mt={2} mb={2}>
                <Divider fullWidth></Divider>
              </Grid>
              <Grid item flex={2} mb={2}>
                <Typography>{responseBody}</Typography>
              </Grid>

              <Button
                color="error"
                variant="contained"
                onClick={() => setResponseModalIsOpen(false)}
              >
                CLOSE
              </Button>
            </Box>
          </Modal> */}

          <Modal open={isLoading}>
            <Box sx={styleLoading} style={{ textAlign: "center" }}>
              <CircularProgress>PLEASE WAIT...</CircularProgress>
            </Box>
          </Modal>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
        </Box>
        </>
  );
}

import React, { useState, useEffect } from "react";
import Head from "next/head";

import { Box, styled } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import store from "../redux/store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import Sidebar from "../components/Sidebar";

import { getStorage, deleteStorage, clearStorage } from "../utils/storage";
import { ThemeConfig } from "../themes";

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  // padding: 3,
  // minHeight: "100vh",
  // backgroundColor: "#F5F5F5;",
  // flexGrow: 1,
  // overflow: "hidden",
  transition: theme.transitions.create("margin", {
    // easing: theme.transitions.easing.sharp,
    // duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: (theme) => `-${theme.mixins.drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      // easing: theme.transitions.easing.easeOut,
      // duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const MyApp = ({ Component, pageProps, router }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // useEffect(() => {
  //   if (getStorage("access_token")) {
  //     let date = new Date();
  //     if (Math.floor(date.getTime() / 1000) >= getStorage("expires_at")) {
  //       clearStorage();
  //       router.push("/login");
  //     }
  //   } else {
  //     clearStorage();
  //     router.push("/login");
  //   }
  // }, [pageProps, router]);

  return (
    mounted && (
      <>
        <Head>
          <meta
            name="viewport"
            content="height=device-height, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0, width=device-width"
          />
          <meta name="googlebot" content="noindex" />
          <meta name="robots" content="noindex" />
          <link rel="icon" href="/static/logo/pngwing.png" />
          <title>Gen GYM</title>
        </Head>

        <Provider store={store}>
          <ThemeConfig>
            <Toaster position="top-center" reverseOrder={false} gutter={8} />
            {router.pathname === "/login" ||
            router.pathname.includes("/reset-password") ||
            router.pathname.includes("/company-outlet-selection") ||
            !getStorage("access_token") ? (
              <Component {...pageProps} />
            ) : (
              <Box display={"flex"}>
                <Sidebar />
                <Box sx={{ width: "100%" }}>
                  <Main>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Component {...pageProps} />
                    </LocalizationProvider>
                  </Main>
                </Box>
              </Box>
            )}
          </ThemeConfig>
        </Provider>
      </>
    )
  );
};

export default MyApp;

// import React, { useState, useEffect } from "react";
// import Head from "next/head";

// import { Box, styled } from "@mui/material";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// import store from "../redux/store";
// import { Provider } from "react-redux";
// import { Toaster } from "react-hot-toast";

// import Sidebar from "../components/Sidebar";

// import { getStorage, deleteStorage, clearStorage } from "../utils/storage";
// import { ThemeConfig } from "../themes";

// import PropTypes from 'prop-types';
// import { CacheProvider } from '@emotion/react';
// import { ThemeProvider, CssBaseline } from '@mui/material';
// // import createEmotionCache from '../utils/createEmotionCache';
// import { createEmotionCache } from '@emotion/cache';

// import lightTheme from '../styles/theme';

// export default function createEmotionCache() {
//   return createEmotionCache({
//     key: 'mui-nextjs',
//     prepend: false,
//   });
// }

// const clientSideEmotionCache = createEmotionCache();

// const Main = styled("main", {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   // padding: 3,
//   // minHeight: "100vh",
//   // backgroundColor: "#F5F5F5;",
//   // flexGrow: 1,
//   // overflow: "hidden",
//   transition: theme.transitions.create("margin", {
//     // easing: theme.transitions.easing.sharp,
//     // duration: theme.transitions.duration.leavingScreen,
//   }),
//   marginLeft: (theme) => `-${theme.mixins.drawerWidth}px`,
//   ...(open && {
//     transition: theme.transitions.create("margin", {
//       // easing: theme.transitions.easing.easeOut,
//       // duration: theme.transitions.duration.enteringScreen,
//     }),
//     marginLeft: 0,
//   }),
// }));

// const MyApp = ({ Component, pageProps, router, emotionCache = clientSideEmotionCache }) => {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // useEffect(() => {
//   //   if (getStorage("access_token")) {
//   //     let date = new Date();
//   //     if (Math.floor(date.getTime() / 1000) >= getStorage("expires_at")) {
//   //       clearStorage();
//   //       router.push("/login");
//   //     }
//   //   } else {
//   //     clearStorage();
//   //     router.push("/login");
//   //   }
//   // }, [pageProps, router]);

//   return (
//     mounted && (
//       <>
//         <Head>
//           <meta
//             name="viewport"
//             content="height=device-height, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0, width=device-width"
//           />
//           <meta name="googlebot" content="noindex" />
//           <meta name="robots" content="noindex" />
//           <link rel="icon" href="/static/logo/pngwing.png" />
//           <title>Gen GYM</title>
//         </Head>

//         <Provider store={store}>
//           <ThemeConfig theme={lightTheme}>
//             <Toaster position="top-center" reverseOrder={false} gutter={8} />
//             {router.pathname === "/login" ||
//             router.pathname.includes("/reset-password") ||
//             router.pathname.includes("/company-outlet-selection") ||
//             !getStorage("access_token") ? (
//               <Component {...pageProps} />
//             ) : (
//               <Box display={"flex"}>
//                 <Sidebar />
//                 <Box sx={{ width: "100%" }}>
//                   <Main>
//                     <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <CssBaseline />
//                       <Component {...pageProps} />
//                     </LocalizationProvider>
//                   </Main>
//                 </Box>
//               </Box>
//             )}
//           </ThemeConfig>
//         </Provider>
//       </>
//     )
//   );
// };

// export default MyApp;

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Header from "./Header";
import Footer from "./Footer";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider } from "styled-components";
import { ToastProvider } from "react-toast-notifications";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSpinner,
  faUpload,
  faDownload,
  faCopy,
  faCogs,
  faTimes,
  faComment,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faSpinner,
  faUpload,
  faDownload,
  faCopy,
  faCogs,
  faTimes,
  faComment
);

const theme = {
  spacer: 8,
  color: {
    primary: "#2e5266",
    secondary: "#9ee493",
  },
  // $color-theme-bg:;
  // $color-theme-page-bg: #9fb1bc;
  // $color-theme-text: ;
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Header />
      <ToastProvider>
        <App />
      </ToastProvider>
      <Footer />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

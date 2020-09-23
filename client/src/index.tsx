import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Header from "./Header";
import Footer from "./Footer";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider } from "styled-components";
import { theme } from "./Theme";
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
import ReactGA from "react-ga";
ReactGA.initialize("UA-178903705-1");
ReactGA.pageview(window.location.pathname + window.location.search);

library.add(
  faSpinner,
  faUpload,
  faDownload,
  faCopy,
  faCogs,
  faTimes,
  faComment
);

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

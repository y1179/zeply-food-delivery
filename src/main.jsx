// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App.jsx";
// import "./index.css";
// import { StoreContext } from '../context/StoreContext'
// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <StoreContextProvider>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//     </StoreContextProvider>
//   </React.StrictMode>
// );


import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import StoreContextProvider from "./context/StoreContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StoreContextProvider>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="colored"
        />
        <App />
      </BrowserRouter>
    </StoreContextProvider>
  </React.StrictMode>
);
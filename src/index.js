import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer"; // Make sure this path and file exist
import { Toaster } from "react-hot-toast";

// Create Redux store
const store = configureStore({
  reducer: rootReducer,
});

// Check if the root element exists in your HTML
const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Root element not found! Ensure a <div id='root'></div> exists in index.html.");
} else {
  const root = ReactDOM.createRoot(rootElement);

  // Render the app
  root.render(
    <Provider store={store}>
      <React.StrictMode>
        <BrowserRouter>
          <App />
          <Toaster />
        </BrowserRouter>
      </React.StrictMode>
    </Provider>
  );
}

// Performance measurement
reportWebVitals();

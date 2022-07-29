import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./errorhandling/ErrorBoundary";
import UserContextProvider from "./contexts/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();

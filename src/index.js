import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./errorhandling/ErrorBoundary";
import UserContextProvider from "./contexts/UserContext";
import { CurrentProfileProvider } from "./contexts/ProfileContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ErrorBoundary>
      <UserContextProvider>
        <CurrentProfileProvider>
          <App />
        </CurrentProfileProvider>
      </UserContextProvider>
    </ErrorBoundary>
  </BrowserRouter>
);

reportWebVitals();

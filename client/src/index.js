import React from "react";
import App from "./App";
import "./index.css";
import { createRoot } from "react-dom/client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";
import { Provider } from "react-redux";
import store from "../src/redux/store";
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <Provider store={store}> 
        <App />
        </Provider>
    </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import "@/global.css";
import { Routes } from "@/Router";
import { createMockServer } from "@/lib/server";

createMockServer({ environment: "development" });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
);

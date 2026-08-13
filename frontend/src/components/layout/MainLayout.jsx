import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import EditToolbar, { EditModeBanner } from "../EditToolbar";

const MainLayout = () => (
  <>
    <EditModeBanner />
    <Header />
    <main className="min-h-screen">
      <Outlet />
    </main>
    <Footer />
    <EditToolbar />
  </>
);

export default MainLayout;

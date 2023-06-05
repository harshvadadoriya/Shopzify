import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";

const RootComponent = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default RootComponent;

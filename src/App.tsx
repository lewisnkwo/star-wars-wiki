import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./components/nav-bar";
import "./App.css";

const App = () => (
  <>
    <NavBar />
    <main>
      <Outlet />
    </main>
  </>
);

export default App;

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import ErrorPage from "./error-page";
import Home from "./pages/home";
import FavouriteCharacters from "./pages/favourite-characters";
import { CharacterSettingsProvider } from "./character-settings";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <CharacterSettingsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="/favourites" element={<FavouriteCharacters />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CharacterSettingsProvider>
  </React.StrictMode>
);

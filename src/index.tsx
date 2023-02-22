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
import CharacterProfile from "./pages/character-profile";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <CharacterSettingsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} errorElement={<ErrorPage />}>
            <Route index element={<Home />} />
            <Route path="/character" element={<CharacterProfile />} />
            <Route path="/favourites" element={<FavouriteCharacters />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CharacterSettingsProvider>
  </React.StrictMode>
);

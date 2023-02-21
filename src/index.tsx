import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ErrorPage from "./error-page";
import CharacterProfile from "./pages/character-profile";
import PlanetDetail from "./pages/planet";
import StarshipDetail from "./pages/starship";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/character",
    element: (
      <CharacterProfile
        profileUrl="https://swapi.dev/api/people/1"
        characterSettings={{}}
        onFavourite={() => console.log("")}
      />
    ),
  },
  {
    path: "/planet",
    element: <PlanetDetail planetUrl="https://swapi.dev/api/planets/3" />,
  },
  {
    path: "/starship",
    element: <StarshipDetail starshipUrl="https://swapi.dev/api/starships/9" />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

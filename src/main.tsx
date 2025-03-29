import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Upsert from "./Components/Upsert";
import Background from "./Components/Background";
import Query from "./Components/Query";
import IMSContextProvider from "./Context/IMSContextProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <IMSContextProvider>
      <Background />
      <Upsert />
      <Query />
    </IMSContextProvider>
  </StrictMode>
);

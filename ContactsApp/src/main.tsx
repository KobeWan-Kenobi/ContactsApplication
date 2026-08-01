import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ContactIndex from "./ContactIndex.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Layout/Header.tsx";
import Footer from "./Layout/Footer.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Header/>
    <ContactIndex />
    <Footer/>
  </StrictMode>,
);

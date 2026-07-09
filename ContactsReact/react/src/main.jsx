import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import ContactIndex from "./Components/ContactPage/ContactIndex";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="flex-fill">
        <ContactIndex />
      </div>
      <Footer />
    </div>
  </StrictMode>,
);

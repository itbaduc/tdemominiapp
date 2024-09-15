import { useState, useEffect } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import WebApp from "@twa-dev/sdk";
import {
  HashRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Earn from "./pages/Earn";
import Friends from "./pages/Friends";
import Leaderbroad from "./pages/Leaderbroad";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { API_URL } from "./helper/constant";

function AppContent() {
  const [currentPage, setCurrentPage] = useState("home");
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.slice(1) || "home";
    setCurrentPage(path);
  }, [location]);

  return (
    <div className="app">
      <div
        className={`content ${currentPage}`}
        style={{ maxHeight: "calc(100vh - 110px)", overflowY: "auto" }}
      >
        <Routes>
          <Route path="*" element={<Navigate to="/home" replace />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/earn" element={<Earn />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/leaderbroad" element={<Leaderbroad />} />
        </Routes>
      </div>
      <Navigation />
    </div>
  );
}

function App() {
  return (
    <TonConnectUIProvider manifestUrl={`${API_URL}/tonconnect-manifest.json`}>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </TonConnectUIProvider>
  );
}

export default App;

import { useState, useEffect } from "react";
import "./App.css";
import WebApp from "@twa-dev/sdk";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Earn from "./pages/Earn";
import Friends from "./pages/Friends";
import Leaderbroad from "./pages/Leaderbroad";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

function App() {
  const [balance, setBalance] = useState(9278);
  const [farming, setFarming] = useState(5.55);
  const [timeLeft, setTimeLeft] = useState("07h 17m");

  useEffect(() => {
    WebApp.ready();
    // Ở đây bạn có thể thêm logic để lấy dữ liệu thực tế từ backend
  }, []);

  return (
    <TonConnectUIProvider manifestUrl="/manifest.json">
      <Router>
        <div className="app">
          <div
            className="content"
            style={{ "max-height": "calc(100vh - 80px)", overflowY: "auto" }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/earn" element={<Earn />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="/leaderbroad" element={<Leaderbroad />} />
            </Routes>
          </div>
          <Navigation />
        </div>
      </Router>
    </TonConnectUIProvider>
  );
}

export default App;

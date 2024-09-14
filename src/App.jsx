import { useState, useEffect } from "react";
import "./App.css";
import WebApp from "@twa-dev/sdk";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Earn from "./pages/Earn";
import Friends from "./pages/Friends";
import Leaderbroad from "./pages/Leaderbroad";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

export const API_URL = import.meta.env.VITE_API_URL;
export const BACKEND_URI = import.meta.env.VITE_APP_BACKEND_URI;

function App() {
  const [balance, setBalance] = useState(9278);
  const [farming, setFarming] = useState(5.55);
  const [timeLeft, setTimeLeft] = useState("07h 17m");

  useEffect(() => {
    console.log("API_URL", API_URL, BACKEND_URI);

    WebApp.ready();
    const userInfo = WebApp.initDataUnsafe.user;
    console.log("WebApp", WebApp);

    // Lưu thông tin người dùng vào file info.txt
    // const userInfoString = `ID: `;
    // const blob = new Blob([userInfoString], { type: "text/plain" });
    // const link = document.createElement("a");
    // link.href = URL.createObjectURL(blob);
    // link.download = "info.txt";
    // link.click();
    // URL.revokeObjectURL(link.href);

    console.log("Đã lưu thông tin người dùng vào file info.txt");

    if (userInfo) {
      const { id, username, first_name, last_name } = userInfo;
      console.log("Telegram User ID:", id);
      console.log("Telegram Username:", username);
      console.log("Tên:", first_name, last_name);

      // Gọi API để lưu thông tin người dùng vào database
      saveUserInfoToDatabase(id, username, first_name, last_name);

      // Lưu thông tin người dùng vào file info.txt
      const userInfoString = `ID: ${id}\nTên người dùng: ${username}\nTên: ${first_name} ${last_name}`;
      const blob = new Blob([userInfoString], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "info.txt";
      link.click();
      URL.revokeObjectURL(link.href);

      console.log("Đã lưu thông tin người dùng vào file info.txt");
    }
  }, []);

  const saveUserInfoToDatabase = async (id, username, firstName, lastName) => {
    try {
      const response = await fetch(`${BACKEND_URI}/users/telegram-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          telegramId: id,
          username: username,
          firstName: firstName,
          lastName: lastName,
        }),
      });

      if (response.ok) {
        console.log("Đã lưu thông tin người dùng vào database");
      } else {
        console.error("Lỗi khi lưu thông tin người dùng");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  return (
    <TonConnectUIProvider manifestUrl={`${API_URL}/tonconnect-manifest.json`}>
      <HashRouter>
        <div className="app">
          <div
            className="content"
            style={{ "max-height": "calc(100vh - 80px)", overflowY: "auto" }}
          >
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/earn" element={<Earn />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="/leaderbroad" element={<Leaderbroad />} />
            </Routes>
          </div>
          <Navigation />
        </div>
      </HashRouter>
    </TonConnectUIProvider>
  );
}

export default App;

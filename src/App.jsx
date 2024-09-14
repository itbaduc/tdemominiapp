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
import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL;
export const BACKEND_URI = import.meta.env.VITE_APP_BACKEND_URI;

// axios.defaults.withCredentials = true;

function App() {
  const [balance, setBalance] = useState(9278);
  const [farming, setFarming] = useState(5.55);
  const [timeLeft, setTimeLeft] = useState("07h 17m");

  useEffect(() => {
    WebApp.ready();
    const userInfo = WebApp.initDataUnsafe.user;

    if (userInfo) {
      const { id, username, first_name, last_name } = userInfo;

      // Gọi API để lưu thông tin người dùng vào database
      saveUserInfoToDatabase(id, username, first_name, last_name);
    }
  }, []);

  const saveUserInfoToDatabase = async (id, username, firstName, lastName) => {
    try {
      const response = await axios.post(
        `${BACKEND_URI}/users/telegram-user`,
        {
          telegramId: id,
          username: username,
          firstName: firstName,
          lastName: lastName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (
        response.status == 200 ||
        response.status == 201 ||
        response.status == 204
      ) {
        // console.log("Đã lưu thông tin người dùng vào database");
        // Lưu thông tin người dùng vào file info.txt
        // Lấy địa chỉ URL hiện tại
        const currentURL = window.location.href;
        // Thêm URL hiện tại vào thông tin người dùng
        userInfoString += `\nURL hiện tại: ${currentURL}`;
        const userInfoString = `ID: ${id}\nTên người dùng: ${username}\nTên: ${firstName} ${lastName}\currentURL link: ${currentURL}\nresponse: ${
          response.status
        } - ${JSON.stringify(response)}`;
        const blob = new Blob([userInfoString], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "ok.txt";
        link.click();
        URL.revokeObjectURL(link.href);
      } else {
        // console.error("Lỗi khi lưu thông tin người dùng");
        // Lưu thông tin người dùng vào file info.txt
        const userInfoString = `ID: ${id}\nTên người dùng: ${username}\nTên: ${firstName} ${lastName}\nbackend link: ${BACKEND_URI}\nresponse: ${response.ok} - ${response}`;
        const blob = new Blob([userInfoString], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "error.txt";
        link.click();
        URL.revokeObjectURL(link.href);
      }
    } catch (error) {
      const userInfoString = `tryerror:\n ${error}\n=================\nbackend link: ${BACKEND_URI}`;
      const blob = new Blob([userInfoString], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "tryerror.txt";
      link.click();
      URL.revokeObjectURL(link.href);
    }
  };

  return (
    <TonConnectUIProvider manifestUrl={`${API_URL}/tonconnect-manifest.json`}>
      <HashRouter>
        <div className="app">
          <div
            className="content"
            style={{ maxHeight: "calc(100vh - 80px)", overflowY: "auto" }}
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

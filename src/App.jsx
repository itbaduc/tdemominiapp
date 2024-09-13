import { useState, useEffect } from "react";
import "./App.css";
import WebApp from "@twa-dev/sdk";
import { HashRouter, Route, Routes } from "react-router-dom";
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

    const userInfo = WebApp.initDataUnsafe.user;
    if (userInfo) {
      const { id, username, first_name, last_name } = userInfo;
      console.log("Telegram User ID:", id);
      console.log("Telegram Username:", username);
      console.log("Tên:", first_name, last_name);

      // Gọi API để lưu thông tin người dùng vào database
      saveUserInfoToDatabase(id, username, first_name, last_name);
    }
  }, []);

  const saveUserInfoToDatabase = async (id, username, firstName, lastName) => {
    try {
      const response = await fetch(
        "https://ton-teleminiapp-backend.vercel.app/users/telegram-user",
        {
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
        }
      );

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
    <TonConnectUIProvider manifestUrl="https://itbaduc.github.io/tdemominiapp/tonconnect-manifest.json">
      <HashRouter>
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
      </HashRouter>
    </TonConnectUIProvider>
  );
}

export default App;

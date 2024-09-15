import { useState, useEffect } from "react";
import WebApp from "@twa-dev/sdk";
import ConnectWallet from "../components/ConnectWallet";
import axios from "axios";
import Confetti from "react-confetti";
import { BACKEND_URI } from "../helper/constant";

function Home() {
  const [balance, setBalance] = useState(0);
  const [farming, setFarming] = useState(0);
  const [timeLeft, setTimeLeft] = useState("07h 17m");
  const [isJoined, setIsJoined] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    WebApp.ready();
    const userInfo = WebApp.initDataUnsafe.user;
    if (userInfo) {
      checkIn(userInfo.id);
    }
  }, []);

  const checkIn = async (telegramId) => {
    try {
      const response = await axios.post(
        `${BACKEND_URI}/users/check-in`,
        { telegramId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success && !response.data.checkedin) {
        const newPoints = response.data.points;
        animatePointsIncrease(balance, newPoints);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    } catch (error) {
      console.error("Lỗi khi check-in:", error);
    }
  };

  const animatePointsIncrease = (start, end) => {
    let current = start;
    const step = Math.ceil((end - start) / 50);
    const timer = setInterval(() => {
      current += step;
      if (current >= end) {
        clearInterval(timer);
        setBalance(end);
      } else {
        setBalance(current);
      }
    }, 20);
  };

  return (
    <>
      <ConnectWallet />
      {showConfetti && <Confetti />}
      <div className="profile">
        <div className="avatar">D</div>
        <h2>DakotaLynn</h2>
        <p className="balance">₿ {balance.toLocaleString()}</p>
      </div>

      <div className="game-box">
        <div className="game-icon">🎮</div>
        <div className="game-info">
          <h3>Play to Earn</h3>
        </div>
        <button className="play-button">Play Game</button>
      </div>
    </>
  );
}

export default Home;

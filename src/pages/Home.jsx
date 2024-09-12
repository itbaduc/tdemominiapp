import { useState, useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import ConnectWallet from '../components/ConnectWallet';

function Home() {
  const [balance, setBalance] = useState(9278);
  const [farming, setFarming] = useState(5.55);
  const [timeLeft, setTimeLeft] = useState('07h 17m');
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    WebApp.ready();
    // Kiểm tra trạng thái tham gia của người dùng
    // Ví dụ: setIsJoined(checkUserJoinStatus());
  }, []);

  return (
    <>
      <ConnectWallet />
      {/* <div style={{marginTop: '20px'}}>
      {isJoined ? (
        <div className="community-card">
          <img src="/icon.jpg" alt="CatRun icon" className="community-icon" />
          <div style={{ textAlign: 'left', margin: 0 }}>
            <h3 style={{ margin: 0 }}>DOGS Community</h3>
            <p style={{ fontSize: '0.9em', margin: 0 }}>20,754,859,791 BP</p>
          </div>
          <button className="open-button">Open</button>
        </div>
      ) : (
        <div className="tribes-card">
          <div className="tribes-icon">⭐</div>
          <div className="tribes-info">
            <h3>Tribes</h3>
            <p>Compete for rewards</p>
          </div>
          <button className="open-button">Open</button>
        </div>
      )}
      </div> */}

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

      {/* <div className="farming-info">
        <span className="farming-icon">⚡</span>
        <span>Farming ₿ {farming}</span>
        <span className="time-left">{timeLeft}</span>
      </div> */}
    </>
  );
}

export default Home;
import { useState, useEffect } from "react";
import { useTonConnectUI } from "@tonconnect/ui-react";
import axios from "axios";
import { BACKEND_URI } from "../helper/constant";
import WebApp from "@twa-dev/sdk";

function ConnectWallet() {
  const [tonConnectUI] = useTonConnectUI();
  const [walletAddress, setWalletAddress] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const updateUserWalletInfo = async (address) => {
    try {
      const userInfo = WebApp.initDataUnsafe.user;
      if (userInfo) {
        await axios.post(`${BACKEND_URI}/users/telegram-update-user-wallet`, {
          telegramId: 2,
          walletAddress: address,
        });
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin ví:", error);
    }
  };

  useEffect(() => {
    const updateWalletAddress = async () => {
      if (tonConnectUI.connected) {
        const walletInfo = await tonConnectUI.wallet;
        alert(JSON.stringify(walletInfo));
        if (walletInfo) {
          const address = walletInfo.account.address;

          setWalletAddress(address);
          updateUserWalletInfo(address.slice(2, address.length));
        }
      } else {
        setWalletAddress("");
      }
    };

    updateWalletAddress();
    tonConnectUI.onStatusChange(updateWalletAddress);
  }, [tonConnectUI]);

  const handleConnect = async () => {
    await tonConnectUI.openModal();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="connect-wallet">
      {walletAddress ? (
        <div
          className="dropdown"
          style={{ position: "relative", display: "inline-block" }}
        >
          <button
            className="dropdown-toggle"
            style={{ padding: "10px", cursor: "pointer" }}
            onClick={toggleDropdown}
          >
            {`${walletAddress.slice(2, 6)}...${walletAddress.slice(-4)}`}
          </button>
          {isDropdownOpen && (
            <div
              className="dropdown-menu"
              style={{
                position: "absolute",
                backgroundColor: "#1b1b1b", // Nền sáng hơn
                minWidth: "160px",
                boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
                zIndex: 1,
                border: "none", // Loại bỏ viền
                color: "white", // Chữ màu trắng
                borderRadius: "10px",
                textAlign: "left",
              }}
            >
              <p style={{ padding: "12px 16px", margin: 0, color: "white" }}>
                Add:{" "}
                {`${walletAddress.slice(2, 6)}...${walletAddress.slice(-4)}`}
              </p>
              <button
                onClick={() => {
                  tonConnectUI.disconnect();
                  setIsDropdownOpen(false);
                }}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  textAlign: "left",
                  border: "none",
                  cursor: "pointer",
                  color: "#ff2c2c", // Chữ màu trắng
                  fontWeight: "bold",
                }}
              >
                Disconnect
              </button>
            </div>
          )}
        </div>
      ) : (
        <button onClick={handleConnect}>Connect Wallet</button>
      )}
    </div>
  );
}

export default ConnectWallet;

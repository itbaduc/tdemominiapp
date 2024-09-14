import { useState, useEffect } from "react";
import { useTonConnectUI } from "@tonconnect/ui-react";

function ConnectWallet() {
  const [tonConnectUI] = useTonConnectUI();
  const [walletAddress, setWalletAddress] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const updateWalletAddress = async () => {
      if (tonConnectUI.connected) {
        const walletInfo = await tonConnectUI.wallet;
        // console.log("walletInfo", walletInfo);
        if (walletInfo) {
          setWalletAddress(walletInfo.account.address);
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

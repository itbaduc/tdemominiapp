import { useState, useEffect } from "react";
import {
  useTonConnectUI,
  useTonAddress,
  useTonWallet,
} from "@tonconnect/ui-react";
import axios from "axios";
import { BACKEND_URI, TON_CHAIN } from "../helper/constant";
import WebApp from "@twa-dev/sdk";
import { CHAIN } from "@tonconnect/ui";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ConnectWallet() {
  const [tonConnectUI] = useTonConnectUI();
  const userFriendlyAddress = useTonAddress();
  const wallet = useTonWallet();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const updateUserWalletInfo = async (address) => {
    try {
      const userInfo = WebApp.initDataUnsafe.user;
      if (userInfo) {
        await axios.post(
          `${BACKEND_URI}/users/telegram-update-user-wallet`,
          {
            telegramId: userInfo.id,
            walletAddress: address,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin ví:", error);
    }
  };

  const checkNetwork = () => {
    if (wallet && wallet.account.chain !== TON_CHAIN) {
      let ton_network_msg = "Please connect to Testnet";
      if (TON_CHAIN === "-239") {
        ton_network_msg = "Please connect to Mainnet";
      }
      toast.error(ton_network_msg, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        width: "80%",
        theme: "dark",
      });
      tonConnectUI.disconnect();
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (userFriendlyAddress && checkNetwork()) {
      updateUserWalletInfo(userFriendlyAddress);
    }
  }, [userFriendlyAddress, wallet]);

  const handleConnect = async () => {
    await tonConnectUI.openModal();
    if (wallet && !checkNetwork()) {
      tonConnectUI.disconnect();
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="connect-wallet">
      <ToastContainer />
      {userFriendlyAddress ? (
        <div className="dropdown">
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            {`${userFriendlyAddress.slice(0, 4)}...${userFriendlyAddress.slice(
              -4
            )}`}
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <p className="wallet-address">
                Add:{" "}
                {`${userFriendlyAddress.slice(
                  0,
                  4
                )}...${userFriendlyAddress.slice(-4)}`}
              </p>
              <button
                className="disconnect-button"
                onClick={() => {
                  tonConnectUI.disconnect();
                  setIsDropdownOpen(false);
                }}
              >
                Disconnect
              </button>
            </div>
          )}
        </div>
      ) : (
        <button className="connect-button" onClick={handleConnect}>
          Connect Wallet
        </button>
      )}
    </div>
  );
}

export default ConnectWallet;

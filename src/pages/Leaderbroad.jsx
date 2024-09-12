import React from "react";
import { FaMedal } from "react-icons/fa";

function Leaderboard() {
  const leaderboardData = [
    { id: 1, name: "DakotaLynn", dogs: 24446, rank: "#5552869" },
    { id: 2, name: "elkanadi", dogs: 23787023, medal: "gold" },
    { id: 3, name: "mariefelicita", dogs: 20663171, medal: "silver" },
    { id: 4, name: "xaffizmedia", dogs: 17021994, medal: "bronze" },
    { id: 5, name: "xaffizmedia", dogs: 17021994, medal: "none" },
    { id: 6, name: "xaffizmedia", dogs: 17021994, medal: "none" },
    { id: 7, name: "xaffizmedia", dogs: 17021994, medal: "none" },
    { id: 8, name: "xaffizmedia", dogs: 17021994, medal: "none" },
    { id: 9, name: "xaffizmedia", dogs: 17021994, medal: "none" },
    { id: 10, name: "xaffizmedia", dogs: 17021994, medal: "none" },
  ];

  const getInitials = (name) => name.substring(0, 2).toUpperCase();

  const getMedalColor = (medal) => {
    switch (medal) {
      case "gold":
        return "#FFD700";
      case "silver":
        return "#C0C0C0";
      case "bronze":
        return "#CD7F32";
      default:
        return "transparent";
    }
  };

  return (
    <div className="leaderboard-container">
      <div className="top-holder">
        <div className="holder-avatar">
          {getInitials(leaderboardData[0].name)}
        </div>
        <div className="holder-info">
          <div className="holder-name">{leaderboardData[0].name}</div>
          <div className="holder-dogs">
            {leaderboardData[0].dogs.toLocaleString()} DOGS
          </div>
        </div>
        <div className="holder-rank">{leaderboardData[0].rank}</div>
      </div>

      <div className="holders-count">46M holders</div>

      <div className="leaderboard-list">
        {leaderboardData.slice(1).map((holder, index) => (
          <div key={holder.id} className="leaderboard-item">
            <div
              className="holder-avatar"
              style={{ backgroundColor: `hsl(${index * 120}, 70%, 30%)` }}
            >
              {getInitials(holder.name)}
            </div>
            <div className="holder-info">
              <div className="holder-name">{holder.name}</div>
              <div className="holder-dogs">
                {holder.dogs.toLocaleString()} DOGS
              </div>
            </div>
            {holder.medal !== "none" ? (
              <FaMedal
                className="medal-icon"
                style={{ color: getMedalColor(holder.medal) }}
              />
            ) : (
              <span className="rank-number">#{holder.id}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;

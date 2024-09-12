import { Link, useLocation } from "react-router-dom";
import { FaHome, FaDollarSign, FaUserFriends, FaTrophy } from "react-icons/fa";

function Navigation() {
  const location = useLocation();

  return (
    <nav className="fixed-nav">
      <Link to="/" className={location.pathname === "/" ? "active_page" : ""}>
        <FaHome />
        <span>Home</span>
      </Link>
      <Link
        to="/earn"
        className={location.pathname === "/earn" ? "active_page" : ""}
      >
        <FaDollarSign />
        <span>Earn</span>
      </Link>
      <Link
        to="/friends"
        className={location.pathname === "/friends" ? "active_page" : ""}
      >
        <FaUserFriends />
        <span>Friends</span>
      </Link>
      <Link
        to="/leaderbroad"
        className={location.pathname === "/leaderbroad" ? "active_page" : ""}
      >
        <FaTrophy />
        <span>Leaderbroad</span>
      </Link>
    </nav>
  );
}

export default Navigation;

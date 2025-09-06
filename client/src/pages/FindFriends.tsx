import * as React from "react";
import { useState, useEffect } from "react";
import {
  FaUserFriends,
  FaUserPlus,
  FaEnvelope,
  FaSearch,
} from "react-icons/fa";
import axios from "axios";
import { apiPost } from "../utils/apiUtils";
import { handleError } from "../utils/errorHandlerToast";
import ScrollToTop from "../components/ScrollToTop";
import { useToken } from "../context/TokenProvider";
import { useNavigate } from "react-router-dom";

// Dummy user data
const users = [
  {
    id: 1,
    name: "Alice",
    location: "New York, USA",
    avatar: "https://i.pravatar.cc/150?img=1",
    online: true,
    mutualFriends: 3,
  },
  {
    id: 2,
    name: "Bob",
    location: "London, UK",
    avatar: "https://i.pravatar.cc/150?img=2",
    online: false,
    mutualFriends: 5,
  },
  {
    id: 3,
    name: "Charlie",
    location: "Berlin, Germany",
    avatar: "https://i.pravatar.cc/150?img=3",
    online: true,
    mutualFriends: 1,
  },
  {
    id: 4,
    name: "David",
    location: "Tokyo, Japan",
    avatar: "https://i.pravatar.cc/150?img=4",
    online: false,
    mutualFriends: 2,
  },
  {
    id: 5,
    name: "Emma",
    location: "Sydney, Australia",
    avatar: "https://i.pravatar.cc/150?img=5",
    online: true,
    mutualFriends: 4,
  },
  {
    id: 6,
    name: "Frank",
    location: "Toronto, Canada",
    avatar: "https://i.pravatar.cc/150?img=6",
    online: true,
    mutualFriends: 4,
  },
  {
    id: 7,
    name: "Grace",
    location: "Paris, France",
    avatar: "https://i.pravatar.cc/150?img=7",
  },
  {
    id: 8,
    name: "Hannah",
    location: "Rome, Italy",
    avatar: "https://i.pravatar.cc/150?img=8",
    online: true,
    mutualFriends: 4,
  },
  {
    id: 9,
    name: "Isaac",
    location: "Madrid, Spain",
    avatar: "https://i.pravatar.cc/150?img=9",
    online: true,
    mutualFriends: 4,
  },
  {
    id: 10,
    name: "Jack",
    location: "Amsterdam, Netherlands",
    avatar: "https://i.pravatar.cc/150?img=10",
    online: false,
    mutualFriends: 4,
  },
];

const UserCard: React.FC<{ user: (typeof users)[0] }> = ({ user }) => {
  const navigate = useNavigate();
  const { isLoggedin } = useToken();
  const [requested, setRequested] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  React.useEffect(() => {
    const checkDark = () => setDarkMode(document.body.classList.contains('dark-mode'));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const cardStyle = darkMode
    ? {
      background: '#2d3748',
      color: '#f7fafc',
      border: '1px solid #4a5568',
      boxShadow: '0 4px 24px #23294644',
    }
    : {};
  const apiBaseUrl = import.meta.env?.VITE_API_BASE_URL || "http://localhost:5000";
  //updating user's activity by calling backend api for findfriends activity
  useEffect(() => {
    if(!isLoggedin) navigate("/auth?path=/login");

    const userId = localStorage.getItem("user_id");

    axios.post(`${apiBaseUrl}/api/user/activity`, { userId })
      .then(res => console.log("Activity updated:", res.data))
      .catch(err => console.error("Error updating activity", err));
  }, []);

  return (
    <div className="card" style={cardStyle}>
      <img src={user.avatar} alt={user.name} className="avatar" />
      <h3>{user.name}</h3>
      <p>{user.location}</p>
      <p className="mutual">{user.mutualFriends} Mutual Friends</p>
      <span className={`status ${user.online ? "online" : "offline"}`}></span>
      <button onClick={() => setRequested(!requested)}>
        {requested ? "Cancel Request" : "Send Friend Request"}
      </button>
    </div>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState("home");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  React.useEffect(() => {
    const checkDark = () => setDarkMode(document.body.classList.contains('dark-mode'));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const headerStyle = darkMode
    ? {
      background: '#2d3748',
      borderBottom: '2px solid #FAD700',
      color: '#FAD700',
      borderRadius: '16px 16px 0 0',
      boxShadow: '0 2px 12px #23294644',
    }
    : {};

  return (
    <div className="container" style={{ marginTop: '80px' }}>
      <div className="header" style={headerStyle}>
        <h1 style={darkMode ? { color: '#FAD700' } : {}}>Explore Together</h1>
        <div className="search-bar" style={{ background: '#fff', border: '1px solid #ccc' }}>
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search friends..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="icons">
          <FaUserFriends
            onClick={() => setView("friends")}
            className="icon friends"
            title="Friends"
          />
          <FaUserPlus
            onClick={() => setView("requests")}
            className="icon requests"
            title="Friend requests"
          />
          <FaEnvelope
            onClick={() => setView("messages")}
            className="icon messages"
            title="Messages"
          />
        </div>
      </div>
      {view === "home" && (
        <div className="grid">
          {users
            .filter((user) =>
              user.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
        </div>
      )}
      {view === "friends" && <h2>Your Friends</h2>}
      {view === "requests" && <h2>Friend Requests</h2>}
      {view === "messages" && <h2>Messages</h2>}

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default App;
// CSS styles
const styles = `
.container {
  text-align: center;
  padding: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  flex-wrap:wrap;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #ddd;
}
.search-bar {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  padding: 5px 10px;
  border-radius: 20px;
}
.search-icon {
  margin-right: 8px;
  color: #666;
}
.search-bar input {
  border: none;
  outline: none;
}
.icons {
  display: flex;
  gap: 15px;
}
.icon {
  font-size: 24px;
  cursor: pointer;
  color: #007bff;
}
.icon:hover {
  color: #0056b3;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
}
.card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  box-shadow: 2px 2px 10px rgba(0,0,0,0.1);
  position: relative;
}
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 auto 10px;
  display: block;
}
.mutual {
  font-size: 12px;
  color: #777;
}
.status {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  position: absolute;
  top: 10px;
  right: 10px;
}
.online {
  background-color: green;
}
.offline {
  background-color: gray;
}
button {
  padding: 8px 12px;
  border: none;
  background-color: #FAD700;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}
button:hover {
  background-color: #FAB700;
}
`;

const styleElement = document.createElement("style");
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);


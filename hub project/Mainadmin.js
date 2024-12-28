import React, { useState } from "react";
import "./Mainadmin.css";

const MainAdmin = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("mainAdmin");

  const handleLogin = () => {
    console.log("Login with:", { userId, password, userType });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        
        {/* Radio Buttons */}
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              name="userType"
              value="mainAdmin"
              checked={userType === "mainAdmin"}
              onChange={(e) => setUserType(e.target.value)}
              className="radio-input"
            />
            <span className="radio-text">Main Admin</span>
          </label>
          
          <label className="radio-label">
            <input
              type="radio"
              name="userType"
              value="collegeAdmin"
              checked={userType === "collegeAdmin"}
              onChange={(e) => setUserType(e.target.value)}
              className="radio-input"
            />
            <span className="radio-text">College Admin</span>
          </label>
          
          <label className="radio-label">
            <input
              type="radio"
              name="userType"
              value="student"
              checked={userType === "student"}
              onChange={(e) => setUserType(e.target.value)}
              className="radio-input"
            />
            <span className="radio-text">Student</span>
          </label>
        </div>

        {/* Input Fields */}
        <div className="input-group">
          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="login-button"
        >
          Login
        </button>

        {/* Social Login */}
        <div className="social-login">
          <p className="social-text">or Sign Up using</p>
          <div className="social-icons">
            <button className="social-button">
              <img 
                src="/google-icon.png" 
                alt="Google" 
                className="social-icon" 
              />
            </button>
            <button className="social-button">
              <img 
                src="/facebook-icon.png" 
                alt="Facebook" 
                className="social-icon" 
              />
            </button>
            <button className="social-button">
              <img 
                src="/twitter-icon.png" 
                alt="Twitter" 
                className="social-icon" 
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainAdmin;
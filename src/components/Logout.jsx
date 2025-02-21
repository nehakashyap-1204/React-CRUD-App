import React from "react";

function Logout() {
  return (
    <div className="logout">
      <div className="logout-container">
        <div className="heading">
          <h3>Logout from app?</h3>
        </div>
        <div className="logout-buttons">
          <button id="cancel-btn">Cancel</button>
          <button id="logout-btn">Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Logout;

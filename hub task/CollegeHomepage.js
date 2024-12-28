import React from "react";
import "./CollegeHomepage.css";

const CollegeHomepage = () => {
  return (
    <div className="college-homepage-container">
      {/* Card 1 */}
      <div className="card">
        <div className="card-header">
          <h3>JavaScript Mini-Task</h3>
          <p>9 Students</p>
        </div>
        <div className="card-body">
          <p>Due Today</p>
          <p className="assignment">Assignment</p>
        </div>
        <hr />
        <div className="card-footer">
          <i className="fas fa-chart-line"></i>
          <i className="fas fa-folder"></i> {/* Folder icon added */}
          <i className="fas fa-calendar-alt"></i>
          <i className="fas fa-bell"></i>
        </div>
      </div>

      {/* Card 2 */}
      <div className="card">
        <div className="card-header">
          <h3>Web App Challenge</h3>
          <p>9 Students</p>
        </div>
        <div className="card-body">
          <p>Due Today</p>
          <p className="assignment">Assignment</p>
        </div>
        <hr />
        <div className="card-footer">
          <i className="fas fa-chart-line"></i>
          <i className="fas fa-folder"></i> {/* Folder icon added */}
          <i className="fas fa-calendar-alt"></i>
          <i className="fas fa-bell"></i>
        </div>
      </div>
    </div>
  );
};

export default CollegeHomepage;

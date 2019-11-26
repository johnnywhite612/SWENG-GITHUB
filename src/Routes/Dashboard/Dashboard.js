import React from "react";
import closeBtn from "../../assets/img/closeBtn.svg";
import "./Dashboard.css";

export default class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard">
        <div className="dashboard__back-button">
          <img src={closeBtn} className="dashboard__close-btn" />
        </div>
        <div className="dashboard__side-bar">
          <img
            src="https://cdn.pixabay.com/photo/2015/08/25/10/40/ben-knapen-906550_960_720.jpg"
            className="dashboard__image"
          />
          <div className="dashboard__profile-name">Johnny White</div>
          <div className="dashboard__divider"></div>
        </div>
        <div className="dashboard__main">
          <div className="dashboard__row">
            <div className="dashboard__block dashboard__block--block-1"></div>
            <div className="dashboard__block dashboard__block--block-2"></div>
          </div>
          <div className="dashboard__row">
            <div className="dashboard__block dashboard__block--block-3"></div>
            <div className="dashboard__block dashboard__block--block-4"></div>
          </div>
        </div>
      </div>
    );
  }
}

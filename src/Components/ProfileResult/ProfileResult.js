import React from "react";
import "./ProfileResult.css";

export default class ProfileResult extends React.Component {
  OpenProfile() {
    this.props.history.push({
      pathname: "/profile",
      search: "",
      state: {}
    });
  }

  render() {
    return (
      <div className="profile" onClick={() => this.OpenProfile()}>
        <div className="profile__card">
          <img
            src="https://cdn.pixabay.com/photo/2015/08/25/10/40/ben-knapen-906550_960_720.jpg"
            className="profile__image"
          />
          <div className="profile__h1">Johnny White</div>
          <span className="profile__h2">
            Hireable: <span className="profile__h2--normal">YES</span>
          </span>
          <div className="profile__divider"></div>
          <div className="profile__h3">Hey there this is my bio...</div>
        </div>
      </div>
    );
  }
}

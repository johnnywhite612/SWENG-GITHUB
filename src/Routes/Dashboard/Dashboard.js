import React from "react";
import closeBtn from "../../assets/img/closeBtn.svg";
import "./Dashboard.css";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: [], repos: [], languages: [] };
  }

  componentDidMount() {
    let user = this.props.data.user;
    // console.log(JSON.stringify(user));
    this.setState({ user: user });
  }

  CloseWindow() {
    this.props.hideDashboard();
  }

  render() {
    let user = this.state.user;
    return (
      <div className="dashboard">
        <div className="dashboard__back-button">
          <img
            src={closeBtn}
            className="dashboard__close-btn"
            onClick={() => this.CloseWindow()}
          />
        </div>
        <div className="dashboard__side-bar">
          <img src={user.avatar_url} className="dashboard__image" />
          <div className="dashboard__profile-name">{user.login}</div>
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

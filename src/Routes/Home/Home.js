import React from "react";
import { Redirect } from "react-router-dom";

import "./Home.css";
import logo from "../../assets/img/logo.svg";
import searchIcon from "../../assets/img/searchIcon.svg";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.SearchGithubUsers = this.SearchGithubUsers.bind(this);
    this.ReturnKeyPressed = this.ReturnKeyPressed.bind(this);
    this.state = {
      searchQuery: null
    };
  }

  ReturnKeyPressed(e) {
    if (e.key === "Enter") {
      this.SearchGithubUsers();
    }
  }

  SearchGithubUsers(input) {
    this.props.history.push({
      pathname: "/search",
      search: "",
      state: {
        search: this.state.searchQuery
      }
    });
  }

  render() {
    return (
      <div className="home">
        <img src={logo} className="home__logo" />
        <div className="home__blurb">
          <b>Re(po)cruit © 2019 |</b> A project developed by Jonathan White for
          the Software Engineering Module (CS3012) in Trinity College. All code
          and graphic design is my own work.
        </div>
        <div className="home__centre">
          <div className="home__title-blurb">
            <h1>Hey recruiter!</h1>
            <h2>
              Type your location below to browse local developers and to measure
              their performance...
            </h2>
          </div>
          <div className="home__search-bar">
            <input
              type="text"
              className="home__input-box"
              placeholder="E.g. Dublin, Ireland"
              onKeyDown={e => this.ReturnKeyPressed(e)}
              onChange={e => this.setState({ searchQuery: e.target.value })}
            />
            <div
              className="home__search-button"
              onClick={() => this.SearchGithubUsers()}
            >
              <img src={searchIcon} className="home__search-icon" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

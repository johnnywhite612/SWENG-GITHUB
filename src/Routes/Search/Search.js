import React from "react";
import { Redirect } from "react-router-dom";

import Dashboard from "../Dashboard/Dashboard";
import Profile from "../../Components/ProfileResult/ProfileResult";
import closeBtn from "../../assets/img/closeBtn.svg";
import "./Search.css";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.loadingCounter = 0;
    this.state = {
      languages: [
        { index: 0, name: "Java", selected: false },
        { index: 1, name: "Python", selected: false },
        { index: 2, name: "Ruby", selected: false },
        { index: 3, name: "PHP", selected: false },
        { index: 4, name: "JavaScript", selected: false },
        { index: 5, name: "TypeScript", selected: false },
        { index: 6, name: "HTML", selected: false },
        { index: 7, name: "CSS", selected: false }
      ],
      users: [],
      loading: true,
      viewDashboard: false,
      selectedProfile: {}
    };
    this.SelectLanguage = this.SelectLanguage.bind(this);
    this.IncrementLoadCounter = this.IncrementLoadCounter.bind(this);
    this.viewDashboard = this.viewDashboard.bind(this);
    this.hideDashboard = this.hideDashboard.bind(this);
  }

  SelectLanguage(index, value) {
    let selectedLanguages = 0;
    this.state.languages.forEach(language => {
      if (language.selected) {
        selectedLanguages++;
      }
    });
    if (selectedLanguages <= 2 || value === false) {
      let update = [...this.state.languages];
      update[index].selected = value;
      this.setState({ languages: update });
    }
  }

  CloseWindow() {
    this.props.history.goBack();
  }

  componentDidMount() {
    let searchQuery = this.props.location.state.search;
    this.setState({ search: searchQuery });

    const Octokit = require("@octokit/rest");
    const octokit = new Octokit({
      auth: "9f84a0aa8cf6242e3d458f3b76446696b6720d39" //"2554723ad1f727badd09e4caa84a1fd4232dd2bc" //
    });

    octokit.search
      .users({
        q: "type:user location:" + searchQuery,
        per_page: 30,
        page: 1
      })
      .then(({ data, headers, status }) => {
        this.setState({ users: data.items });
      });
  }

  IncrementLoadCounter(username) {
    this.loadingCounter += 1;
    this.setState({});
    if (this.loadingCounter >= 27) {
      this.setState({ loading: false });
    }
  }

  viewDashboard(user, repos, languages) {
    let selectedProfile = { user, repos, languages };
    this.setState({ viewDashboard: true, selectedProfile: selectedProfile });
  }

  hideDashboard() {
    this.setState({ viewDashboard: false });
  }

  render() {
    var loadingBarStyle = {
      height: "auto",
      width: (this.loadingCounter / 29) * 100 + "%",
      color: "white",
      backgroundColor: "#E8E8E8",
      padding: "10px",
      margin: "0px",
      textAlign: "center"
    };
    let loadingBar;
    if (this.state.loading) {
      loadingBar = (
        <div className="search__loading-bar">
          <div style={loadingBarStyle}>
            <div className="search__loading-text">
              {Math.round((this.loadingCounter / 29) * 100) + "%"} - Loading
              results...
            </div>
          </div>
        </div>
      );
    } else {
      loadingBar = <></>;
    }

    const languageTags = this.state.languages.map(language => (
      <div
        className={
          language.selected === true
            ? "search__language-item search__language-item--highlighted"
            : "search__language-item"
        }
        onClick={() => this.SelectLanguage(language.index, !language.selected)}
      >
        {language.name}
      </div>
    ));

    let languageFilters = [];
    this.state.languages.forEach(language => {
      if (language.selected === true) {
        languageFilters.push(language.name);
      }
    });

    const profileResults = this.state.users.map(user => (
      <Profile
        history={this.props.history}
        user={user}
        languageFilters={languageFilters}
        increment={this.IncrementLoadCounter}
        viewDashboard={this.viewDashboard}
      />
    ));
    if (this.state.viewDashboard) {
      return (
        <Dashboard
          hideDashboard={this.hideDashboard}
          data={this.state.selectedProfile}
        />
      );
    } else {
      return (
        <div className="search">
          <div className="search__top-bar">
            <span className="search__title-text">Location:</span>
            <span className="search__title-search">{this.state.search}</span>
            <img
              src={closeBtn}
              className="search__close-btn"
              onClick={() => this.CloseWindow()}
            />
          </div>
          <div className="search__bottom-section">
            <div className="search__side-bar">
              <div className="search__purple-heading">Which languages:</div>
              <div className="search__language-list">{languageTags}</div>
              <hr></hr>
              <div className="search__purple-heading">Other metrics:</div>
            </div>
            <div className="search__results-block">
              {loadingBar}
              <div className="search__results-section">{profileResults}</div>
            </div>
          </div>
        </div>
      );
    }
  }
}

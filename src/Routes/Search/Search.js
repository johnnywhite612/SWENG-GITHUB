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
    this.languageScores = new Map();
    this.state = {
      languages: [
        { index: 0, name: "Java", selected: false },
        { index: 1, name: "Python", selected: false },
        { index: 2, name: "Ruby", selected: false },
        { index: 3, name: "PHP", selected: false },
        { index: 4, name: "JavaScript", selected: false },
        { index: 5, name: "TypeScript", selected: false },
        { index: 6, name: "HTML", selected: false },
        { index: 7, name: "CSS", selected: false },
        { index: 8, name: "Shell", selected: false },
        { index: 9, name: "C", selected: false },
        { index: 10, name: "C++", selected: false },
        { index: 11, name: "C#", selected: false }
      ],
      users: [],
      loading: true,
      viewDashboard: false,
      selectedProfile: {},
      MAX_SEARCH_LIMIT: 20
    };
    this.SelectLanguage = this.SelectLanguage.bind(this);
    this.IncrementLoadCounter = this.IncrementLoadCounter.bind(this);
    this.viewDashboard = this.viewDashboard.bind(this);
    this.hideDashboard = this.hideDashboard.bind(this);
    this.registerScore = this.registerScore.bind(this);
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
        per_page: this.state.MAX_SEARCH_LIMIT,
        page: 1
      })
      .then(({ data, headers, status }) => {
        this.setState({ users: data.items });
      });
  }

  IncrementLoadCounter(username) {
    this.loadingCounter += 1;
    this.setState({});
    if (this.loadingCounter >= this.state.MAX_SEARCH_LIMIT - 5) {
      this.setState({ loading: false });
    }
  }

  viewDashboard(user, repos, languages, languageStats) {
    let selectedProfile = { user, repos, languages, languageStats };
    this.setState({ viewDashboard: true, selectedProfile: selectedProfile });
  }

  hideDashboard() {
    this.setState({ viewDashboard: false });
  }

  registerScore(userScores) {
    //We've been given the scores of a user
    //For each language on the list, compare with the global score for that language
    // -> if bigger, register the high score
    userScores.forEach(language => {
      if (!this.languageScores.has(language[0])) {
        //If it doesn't have the language yet, register it to the hash map
        this.languageScores.set(language[0], language[1]);
      } else {
        //If it does, check the current score, compare and take appropriate actions
        let currentScore = this.languageScores.get(language[0]);
        if (currentScore < language[1]) {
          //This user has more lines of code and thus wins, register new score
          this.languageScores.set(language[0], language[1]);
        } else {
          //Do nothing!
        }
      }
    });
  }

  render() {
    var loadingBarStyle = {
      height: "auto",
      width:
        (this.loadingCounter / (this.state.MAX_SEARCH_LIMIT - 3)) * 100 + "%",
      color: "white",
      backgroundColor: "#E8E8E8",
      padding: "10px",
      margin: "0px",
      textAlign: "center"
    };
    let loadingBar;
    if (this.state.loading) {
      loadingBar = (
        <>
          <div className="search_dimmer"></div>
          <div className="search__loading-bar">
            <div style={loadingBarStyle}>
              <div className="search__loading-text">
                {Math.round(
                  (this.loadingCounter / (this.state.MAX_SEARCH_LIMIT - 3)) *
                    100
                ) + "%"}{" "}
                - Calculating results...
              </div>
            </div>
          </div>
        </>
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

    let dashboardView;
    if (this.state.viewDashboard) {
      dashboardView = (
        <Dashboard
          hideDashboard={this.hideDashboard}
          data={this.state.selectedProfile}
          //Pass the hashmap of highest user scores for the stats
          languageScores={this.languageScores}
        />
      );
    } else {
      dashboardView = <></>;
    }

    const profileResults = this.state.users.map(user => (
      <Profile
        history={this.props.history}
        user={user}
        languageFilters={languageFilters}
        increment={this.IncrementLoadCounter}
        viewDashboard={this.viewDashboard}
        registerScore={this.registerScore}
      />
    ));

    return (
      <>
        {dashboardView}
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
              <div className="search__purple-heading">Filter by language:</div>
              <div className="search__language-list">{languageTags}</div>
              <hr></hr>
              <div className="search__purple-heading">More info:</div>
              <div className="search__black-body">
                This app analyses approximately 50 developers in the searched
                location. You can filter developers by programming language.
                Please give it time to fully load, thanks!
              </div>
            </div>
            <div className="search__results-block">
              {loadingBar}

              <div className="search__results-section">{profileResults}</div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

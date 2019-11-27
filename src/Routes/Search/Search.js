import React from "react";
import { Redirect } from "react-router-dom";

import Profile from "../../Components/ProfileResult/ProfileResult";
import closeBtn from "../../assets/img/closeBtn.svg";
import "./Search.css";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
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
      users: []
    };
    this.SelectLanguage = this.SelectLanguage.bind(this);
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
      auth: "9f84a0aa8cf6242e3d458f3b76446696b6720d39"
    });

    octokit.search
      .users({
        q: "type:user location:" + searchQuery,
        per_page: 50,
        page: 1
      })
      .then(({ data, headers, status }) => {
        this.setState({ users: data.items });
      });
  }

  render() {
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
      />
    ));

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
          <div className="search__results-section">{profileResults}</div>
        </div>
      </div>
    );
  }
}

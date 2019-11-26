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
        { index: 2, name: "JavaScript", selected: false },
        { index: 3, name: "Haskell", selected: false },
        { index: 4, name: "HTML", selected: false },
        { index: 5, name: "CSS", selected: false }
      ],
      users: []
    };
  }

  SelectLanguage(index, value) {
    let update = [...this.state.languages];
    update[index].selected = value;
    this.setState({ languages: update });
  }

  CloseWindow() {
    this.props.history.goBack();
  }

  componentDidMount() {
    let searchQuery = this.props.location.state.search;

    const Octokit = require("@octokit/rest");
    const octokit = new Octokit({
      auth: "9f84a0aa8cf6242e3d458f3b76446696b6720d39"
    });

    octokit.search
      .users({
        q: "type:org location:" + searchQuery,
        per_page: 12,
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

    const profileResults = this.state.users.map(user => (
      <Profile history={this.props.history} user={user} />
    ));

    return (
      <div className="search">
        <div className="search__top-bar">
          <span className="search__title-text">Location:</span>
          <span className="search__title-search">Dublin, Ireland</span>
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

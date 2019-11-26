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
      ]
    };
  }

  SelectLanguage(index, value) {
    let update = [...this.state.languages];
    update[index].selected = value;
    this.setState({ languages: update });
  }

  render() {
    const result = this.state.languages.map(language => (
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

    return (
      <div className="search">
        <div className="search__top-bar">
          <span className="search__title-text">Location:</span>
          <span className="search__title-search">Dublin, Ireland</span>
          <img src={closeBtn} className="search__close-btn" />
        </div>
        <div className="search__bottom-section">
          <div className="search__side-bar">
            <div className="search__purple-heading">Which languages:</div>
            <div className="search__language-list">{result}</div>
            <hr></hr>
            <div className="search__purple-heading">Other metrics:</div>
          </div>
          <div className="search__results-section">
            <Profile history={this.props.history} />
          </div>
        </div>
      </div>
    );
  }
}

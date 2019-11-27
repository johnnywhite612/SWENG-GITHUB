import React from "react";
import "./ProfileResult.css";
import axios from "axios";
export default class ProfileResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = { languages: [], user: [] };
  }

  OpenProfile() {
    this.props.history.push({
      pathname: "/profile",
      search: "",
      state: {}
    });
  }

  componentWillMount() {
    const Octokit = require("@octokit/rest");
    const octokit = new Octokit({
      auth: "9f84a0aa8cf6242e3d458f3b76446696b6720d39"
    });

    //We'll first get the full profile data for our user
    octokit.users
      .getByUsername({
        username: this.props.user.login
      })
      .then(({ data }) => {
        this.setState({ user: data });
      });

    let repos = [];
    let languageCalculations = new Map();

    octokit
      .request("GET /users/" + this.props.user.login + "/repos")
      .then(({ data, headers, status }) => {
        data.forEach(repo => {
          if (repo) repos.push(repo);
        });
      })
      .then(() => {
        //With our list of repos, get the languages listed under each repo name
        repos.forEach(repo => {
          //If the repo was forked, we won't consider it as owned by this user
          if (repo.fork === false) {
            let selectedRepo = repo.name;
            octokit.repos
              .listLanguages({
                owner: this.props.user.login,
                repo: repo.name
              })
              .then(({ data, headers, status }) => {
                //The languages for the currently selected repo
                let languageCounts = data;
                Object.keys(languageCounts).forEach(language => {
                  let languageCount = languageCounts[language];
                  if (languageCalculations.has(language)) {
                    //Language exists, so we increase the counter score
                    let currentCount = languageCalculations.get(language);
                    languageCalculations.set(
                      language,
                      (currentCount += languageCount)
                    );
                  } else {
                    //Language doesn't exist, so add it
                    languageCalculations.set(language, languageCount);
                  }
                });
                this.setState({
                  languages: [...languageCalculations.keys()]
                });
              });
          }
        });
      });
  }

  render() {
    let user = this.props.user;
    console.log(JSON.stringify(user));
    let languageFilters = this.props.languageFilters;
    let showProfile = true;
    languageFilters.forEach(language => {
      if (!this.state.languages.includes(language)) {
        showProfile = false;
      }
    });
    if (showProfile) {
      return (
        <div className="profile" onClick={() => this.OpenProfile()}>
          <div className="profile__card">
            <img src={user.avatar_url} className="profile__image" />
            <div className="profile__h1">{user.login}</div>
            <span className="profile__h2">
              Hireable:{" "}
              <span className="profile__h2--normal">YES: {user.hireable}</span>
            </span>
            <div className="profile__divider"></div>
            <div className="profile__h3">{this.state.user.bio}</div>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  }
}

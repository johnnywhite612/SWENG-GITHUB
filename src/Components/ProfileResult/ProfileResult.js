import React from "react";
import "./ProfileResult.css";
import axios from "axios";
export default class ProfileResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = { languages: [], user: [], repos: [], languageStats: [] };
  }

  OpenProfile() {
    this.props.viewDashboard(
      this.state.user,
      this.state.repos,
      this.state.languages,
      this.state.languageStats
    );
  }

  componentDidMount() {
    let masterCount = 0;

    const Octokit = require("@octokit/rest");
    const octokit = new Octokit({
      auth: "9f84a0aa8cf6242e3d458f3b76446696b6720d39" //"2554723ad1f727badd09e4caa84a1fd4232dd2bc" //
    });

    let repos = [];
    let languageCalculations = new Map();

    //We'll first get the full profile data for our user
    octokit.users
      .getByUsername({
        username: this.props.user.login
      })
      .then(({ data }) => {
        this.setState({ user: data });
      });

    octokit
      .request("GET /users/" + this.props.user.login + "/repos")
      .then(({ data, headers, status }) => {
        this.setState({ repos: data });
        data.forEach(repo => {
          if (repo) repos.push(repo);
        });
      })
      .then(() => {
        //With our list of repos, get the languages listed under each repo name
        let repoTotal = repos.length;
        let repoCount = 0;

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
                //Finished cycling through repo - maybe increment counter
                repoCount++;
                if (repoCount === repoTotal) {
                  this.setState({
                    languages: [...languageCalculations.keys()],
                    languageStats: [...languageCalculations]
                  });
                  this.props.increment(this.props.user.login);
                  ///DO SOMETHING!!
                  //Increment finished repos and compare
                  masterCount += 1;
                  // console.log(masterCount + " / 50");
                }
              });
          } else {
            repoCount++;
            repoCount++;
            if (repoCount === repoTotal) {
              //We have finished analyzing this user, now save their languages to state
              //Also increment parent component
              this.setState({
                languages: [...languageCalculations.keys()],
                languageStats: [...languageCalculations]
              });
              this.props.increment(this.props.user.login);
              ///DO SOMETHING!!
              masterCount += 1;
            }
          }
        });
      });
  }

  render() {
    let user = this.props.user;
    let languageFilters = this.props.languageFilters;

    let showProfile = true;
    languageFilters.forEach(language => {
      if (!this.state.languages.includes(language)) {
        showProfile = false;
      }
    });
    // console.log("HIRE: " + this.state.user.hireable);
    if (showProfile) {
      return (
        <div className="profile" onClick={() => this.OpenProfile()}>
          <div className="profile__card">
            <img src={user.avatar_url} className="profile__image" />
            <div className="profile__h1">{user.login}</div>
            <span className="profile__h2">
              Hireable:{" "}
              <span className="profile__h2--normal">
                {this.state.user.hireable ? "YES" : "NO"}
              </span>
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

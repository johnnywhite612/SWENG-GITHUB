import React from "react";
import "./ProfileResult.css";
import axios from "axios";
export default class ProfileResult extends React.Component {
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

    let repos = [];
    let languageCalculations = new Map();

    //Get repos for user
    octokit.repos
      .listForOrg({
        org: this.props.user.login
      })
      .then(({ data, headers, status }) => {
        data.forEach(repo => {
          if (repo) repos.push(repo);
        });
      })
      .then(() => {
        //With our list of repos, get the languages listed under each repo name
        let itemsProcessed = 0;
        repos.forEach(repo => {
          //If the repo was forked, we won't consider it as owned by this user
          if (repo.fork === false) {
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

                for (let [key, value] of languageCalculations) {
                  console.log(key + " - " + value);
                }
                console.log("\n");
              });
          } else {
            console.log("WAS FORKED: " + repo.fork);
          }

          itemsProcessed++;
          console.log(itemsProcessed + " vs " + repos.length);

          if (itemsProcessed === repos.length) {
            // alert("hi");
          }
        });
      });
    // alert("done?");

    // octokit.users
    //   .getByUsername({
    //     username: this.props.user.login
    //   })
    //   .then(({ data, headers, status }) => {
    //     // this.setState({ users: data.items });
    //     // console.log("RESULT: " + JSON.stringify(data));
    //   });
  }

  render() {
    let user = this.props.user;

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
          <div className="profile__h3">Hey there this is my bio...</div>
        </div>
      </div>
    );
  }
}

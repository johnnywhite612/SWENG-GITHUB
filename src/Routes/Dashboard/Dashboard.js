import React from "react";
import closeBtn from "../../assets/img/closeBtn.svg";
import "./Dashboard.css";
import WeeklyCommitGraph from "../../Components/WeeklyCommitGraph/WeeklyCommitGraph";
import LanguageUsageGraph from "../../Components/LanguageUsageGraph/LanguageUsageGraph";
import CompareLanguageGraph from "../../Components/CompareLanguageGraph/CompareLanguageGraph";
export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: [], repos: [], languages: [], languageStats: [] };
  }

  componentDidMount() {
    let user = this.props.data.user;
    let repos = this.props.data.repos;
    let languages = this.props.data.languages;
    let languageStats = this.props.data.languageStats;
    this.setState({
      user: user,
      repos: repos,
      languages: languages,
      languageStats: languageStats
    });
  }

  CloseWindow() {
    this.props.hideDashboard();
  }

  render() {
    let user = this.state.user;
    console.log(JSON.stringify(this.state.languages));
    const languageTags = this.state.languages.map(language => (
      <div className={"dashboard__language-item"}>{language}</div>
    ));

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
          <div className="dashboard__profile-full-name">{user.name}</div>
          <div className="dashboard__location">{user.location}</div>

          <div className="dashboard__bio">{user.bio}</div>

          <div className="dashboard__divider dashboard__divider--long"></div>

          <div className="dashboard__public-repos">
            Public Repositories: {user.public_repos}
          </div>
          <div className="dashboard__followers">
            <b>Followers: </b>
            {user.followers}
          </div>
          <div className="dashboard__following">
            <b>Following: </b>
            {user.following}
          </div>
          <div className="dashboard__divider dashboard__divider--long"></div>
          <div className="dashboard__language-title">Languages:</div>

          <div className="dashboard__languages">{languageTags}</div>
          <a
            className="dashboard__view-github"
            href={user.html_url}
            target="_blank"
          >
            View Full Profile
          </a>
        </div>
        <div className="dashboard__main">
          <div className="dashboard__row">
            <div className="dashboard__block dashboard__block--block-1">
              <div className="dashboard__block-h1">Weekly commit stats</div>
              <div className="dashboard__block-h3">
                Frequency of {user.login}'s commits based on week day.
              </div>
              <div className="dashboard__block-container-1">
                <WeeklyCommitGraph
                  repos={this.props.data.repos}
                  user={this.props.data.user}
                />
              </div>
            </div>
            <div className="dashboard__block dashboard__block--block-2">
              <div className="dashboard__block-h1">Language usage</div>
              <div className="dashboard__block-h3">
                {user.login}'s most frequent languages and their percentage use
                compared.
              </div>
              <div className="dashboard__block-container-2">
                <LanguageUsageGraph
                  languageStats={this.props.data.languageStats}
                />
              </div>
            </div>
          </div>
          <div className="dashboard__row">
            <div className="dashboard__block dashboard__block--block-3">
              <CompareLanguageGraph
                languageStats={this.props.data.languageStats}
              />
            </div>
            <div className="dashboard__block dashboard__block--block-4"></div>
          </div>
        </div>
      </div>
    );
  }
}

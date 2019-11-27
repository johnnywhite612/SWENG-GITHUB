import React from "react";
import { VictoryPie, VictoryLabel, VictoryAxis } from "victory";

export default class CommitVsDeleteGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commits: 0,
      deletions: 0
    };
  }

  componentDidMount() {
    const Octokit = require("@octokit/rest");
    const octokit = new Octokit({
      auth: "9f84a0aa8cf6242e3d458f3b76446696b6720d39" //"2554723ad1f727badd09e4caa84a1fd4232dd2bc" //
    });
    let commits = 0;
    let deletions = 0;

    this.props.repos.forEach(repo => {
      if (repo.fork !== true) {
        //For each repository, gather the weekly data - if it isn't forked
        octokit
          .request(
            "GET /repos/" +
              this.props.user.login +
              "/" +
              repo.name +
              "/stats/code_frequency"
          )
          .then(({ data, headers, status }) => {
            console.log(
              "GET /repos/" +
                this.props.user.login +
                "/" +
                repo.name +
                "/stats/code_frequency"
            );
            if (data) {
              Array.from(data).forEach(element => {
                commits += element[1];
                deletions += element[2];
              });
              //       console.log("Commits: " + commits + " Deletions: " + deletions);
              if (deletions < 0) deletions *= -1;
              this.setState({ commits: commits, deletions: deletions });
            }
          })
          .then(() => {});
      }
    });
  }

  render() {
    let data = [
      { x: "Commits", y: this.state.commits },
      { x: "Deletions", y: this.state.deletions }
    ];
    return (
      <>
        <div className="dashboard__block-h1">Commits vs Deletions</div>
        <svg viewBox="0 0 400 400" className="dashboard__extra-3">
          <VictoryPie
            standalone={false}
            width={400}
            height={400}
            data={data}
            innerRadius={68}
            labelRadius={100}
            colorScale="heatmap"
            style={{ labels: { fontSize: 20, fill: "black" } }}
          />
          <VictoryLabel
            textAnchor="middle"
            style={{ fontSize: 20 }}
            x={200}
            y={200}
          />
        </svg>
      </>
    );
  }
}

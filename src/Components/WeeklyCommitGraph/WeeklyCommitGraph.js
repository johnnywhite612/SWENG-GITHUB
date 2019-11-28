import React from "react";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";

export default class WeeklyCommitGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      week: []
    };
  }

  componentDidMount() {
    let a = "7e9f6c6907";
    let b = "eed43dd7ea943a7";
    let c = "702817e78023a32";

    const Octokit = require("@octokit/rest");
    const octokit = new Octokit({
      auth: a + b + c
    });
    let weekTally = [0, 0, 0, 0, 0, 0, 0];

    this.props.repos.forEach(repo => {
      if (repo.fork !== true) {
        //For each repository, gather the weekly data - if it isn't forked
        octokit
          .request(
            "GET /repos/" +
              this.props.user.login +
              "/" +
              repo.name +
              "/stats/punch_card"
          )
          .then(({ data, headers, status }) => {
            if (data) {
              data.forEach(element => {
                let current = weekTally[element[0]];
                weekTally[element[0]] = current + element[2];
              });

              let final = [];

              weekTally.forEach((day, i) => {
                final.push({ day: i + 1, tally: day });
              });

              this.setState({ week: final });
            }
          })
          .then(() => {});
      }
    });
  }

  render() {
    return (
      <>
        <VictoryChart domainPadding={15}>
          <VictoryAxis
            tickValues={[1, 2, 3, 4, 5, 6, 7]}
            tickFormat={["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"]}
          />
          <VictoryAxis dependentAxis tickFormat={x => `${x}`} />
          <VictoryBar
            data={this.state.week}
            x="day"
            y="tally"
            style={{ data: { fill: "#f9c73a" } }}
          />
        </VictoryChart>
      </>
    );
  }
}

import React from "react";
import "./WeeklyCommitGraph.css";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";

import {
  XYPlot,
  VerticalBarSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
  LineSeries
} from "react-vis";

export default class WeeklyCommitGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      week: []
    };
  }

  componentDidMount() {
    console.log("RECEIVED: " + JSON.stringify(this.props.repos));

    const Octokit = require("@octokit/rest");
    const octokit = new Octokit({
      auth: "9f84a0aa8cf6242e3d458f3b76446696b6720d39" //"2554723ad1f727badd09e4caa84a1fd4232dd2bc" //
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
              console.log("TALLY: " + JSON.stringify(weekTally));
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

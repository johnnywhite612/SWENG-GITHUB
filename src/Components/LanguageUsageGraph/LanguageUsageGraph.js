import React from "react";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";

export default class WeeklyCommitGraph extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("RECEIVED: " + JSON.stringify(this.props.repos));
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

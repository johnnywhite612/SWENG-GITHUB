import React from "react";
import {
  VictoryPie,
  VictoryClipContainer,
  VictoryChart,
  VictoryContainer,
  VictoryGroup
} from "victory";

export default class LanguageUsageGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    let languageData = this.props.languageStats;
    //     console.log("FIRST: " + JSON.stringify(languageData));

    languageData.sort(function(a, b) {
      return b[1] - a[1];
    });
    if (languageData.length >= 2) languageData = languageData.slice(0, 2);

    //     console.log("THEN: " + JSON.stringify(languageData));

    let preparedData = [];
    languageData.forEach(element => {
      preparedData.push({ x: element[0], y: element[1] });
    });

    this.setState({ data: preparedData });
  }

  render() {
    return (
      <>
        {/* <VictoryChart> */}
        <VictoryPie
          //     padding={{ left: 50, right: 50 }}
          data={this.state.data}
          labelRadius={160}
          colorScale="heatmap"
          containerComponent={<VictoryContainer />}
          //   groupComponent={<VictoryClipContainer />}
          style={{
            labels: {
              fontSize: 30,
              fill: "black"
            }
          }}
        />
        {/* </VictoryChart> */}
      </>
    );
  }
}

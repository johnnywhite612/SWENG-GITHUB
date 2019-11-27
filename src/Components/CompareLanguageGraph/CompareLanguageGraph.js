import React from "react";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";

export default class CompareLanguageGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topLanguage: []
    };
  }

  componentDidMount() {
    let languageData = this.props.languageStats;
    let languageScoresHM = this.props.languageScores;
    console.log("FIRST: " + JSON.stringify(languageData));
    languageData.sort(function(a, b) {
      return b[1] - a[1];
    });
    if (languageData.length >= 1) {
      let preparedData = [];
      preparedData.push({ x: 1, y: languageData[0][1] });
      preparedData.push({
        x: 2,
        y: languageScoresHM.get(languageData[0][0])
      });

      console.log("TOP LANGUAGE: " + JSON.stringify(preparedData));
      this.setState({ data: preparedData, language: languageData[0][0] });
    }
  }

  render() {
    return (
      <>
        <div className="dashboard__extra-1">
          <div className="dashboard__block-h1">
            {this.state.language} - Comparison
          </div>
          <div className="dashboard__block-h3">
            A comparison of this user's top language ({this.state.language}) vs
            one of the most active users of {this.state.language} in the area.
          </div>
          <div className="dashboard__extra-2">
            <VictoryChart domainPadding={15}>
              <VictoryAxis
                tickValues={[1, 2]}
                tickFormat={[this.props.userName, "Best in the area"]}
                style={{
                  tickLabels: {
                    fontSize: 40
                  }
                }}
              />
              <VictoryBar
                data={this.state.data}
                x="x"
                y="y"
                style={{
                  data: { fill: "#7600ff" },
                  labels: {
                    fontSize: 50,
                    fill: "black"
                  }
                }}
                //       barRatio={1.2}
                barWidth={150}
              />
            </VictoryChart>
          </div>
        </div>
      </>
    );
  }
}

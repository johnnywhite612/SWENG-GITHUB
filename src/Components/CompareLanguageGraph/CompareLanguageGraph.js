import React from "react";
import {
  VictoryPie,
  VictoryClipContainer,
  VictoryLine,
  VictoryContainer,
  VictoryGroup,
  VictoryBar
} from "victory";

export default class CompareLanguageGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    let languageData = this.props.languageStats;
    console.log("FIRST: " + JSON.stringify(languageData));
    // languageData.sort(function(a, b) {
    //   return b[1] - a[1];
    // });

    //     if (languageData.length >= 2) languageData = languageData.slice(0, 2);
    //     console.log("THEN: " + JSON.stringify(languageData));
    //     let preparedData = [];
    //     languageData.forEach(element => {
    //       preparedData.push({ x: element[0], y: element[1] });
    //     });
    //     this.setState({ data: preparedData });
  }

  render() {
    const data = [
      { x: 5, y: 10 },
      { x: 2, y: 8 }
    ];
    return (
      <>
        <VictoryBar data={data} />
      </>
    );
  }
}

import React, { Component } from "react";

import "./Pixel.css";

export default class Pixel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      col: this.props.row,
      row: this.props.col,
      isTouched: this.props.isTouched,
      convType: this.props.convType,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log(this.state.col, this.state.row);
    this.setState((prevState) => ({
      isTouched: true,
    }));
  }

  render() {
    const { isTouched, convType } = this.props;
    const classNames = ["pixel"];

    if (isTouched || this.state.isTouched) {
      classNames.push("pixel-touched");
    } else {
      classNames.push("pixel-untouched");
    }

    // console.log(convType);
    if (convType) {
      for (let i = 0; i < convType.length; i++) {
        classNames.push("pixel-" + convType[i]);
      }
    } else {
      classNames.push("pixel-not-in-conv");
    }

    return (
      <div className={classNames.join(" ")} onClick={this.handleClick}></div>
    );
  }
}

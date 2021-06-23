import React, { Component } from "react";

import "./Window.css";
import Pixel from "../Pixel/Pixel";

export default class Window extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: this.props.centerPixel,
      borders: this.props.borderPixels,
      matrix: this.props.matrix,
    };
  }

  render() {
    const { center, borderPixels, matrix } = this.props;
    const classNames = ["pixel"];

    return <div></div>;
  }
}

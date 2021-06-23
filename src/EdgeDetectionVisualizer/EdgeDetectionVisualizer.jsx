import React, { Component } from "react";
import Pixel from "./Pixel/Pixel";

import "./EdgeDetectionVisualizer.css";

const NUM_ROWS = 4;
const NUM_COLS = 25;
const UPDATE_INTERVAL = 60;

const DIRECTIONS = [
  "center",
  "left_top",
  "top",
  "right_top",
  "right",
  "right_bottom",
  "bottom",
  "left_bottom",
  "left",
];
const DIRECTIONS_MAP = {
  center: { dx: 0, dy: 0 },
  left_top: { dx: -1, dy: -1 },
  top: { dx: 0, dy: -1 },
  right_top: { dx: 1, dy: -1 },
  right: { dx: 1, dy: 0 },
  right_bottom: { dx: 1, dy: 1 },
  bottom: { dx: 0, dy: 1 },
  left_bottom: { dx: -1, dy: 1 },
  left: { dx: -1, dy: 0 },
};

export default class EdgeDetectionVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pixels: [],
      window: {
        center: { x: 1, y: 1 },
        borders: [],
      },
      time: 0,
    };
    this.moveWindow = this.moveWindow.bind(this);
    this.clearWindow = this.clearWindow.bind(this);
    this.updateWindowClasses = this.updateWindowClasses.bind(this);
  }

  updateWindowClasses() {
    const newPixels = this.state.pixels;

    for (let i = 0; i < DIRECTIONS.length; i++) {
      const dir = DIRECTIONS[i];

      const newX = this.state.window.center.x + DIRECTIONS_MAP[dir].dx;
      const newY = this.state.window.center.y + DIRECTIONS_MAP[dir].dy;
      const currentPixel = newPixels[newY][newX];
      currentPixel.convType = this.getPixelWindowProps(currentPixel).split("_");
      this.setState({ pixels: newPixels });
    }
  }

  clearWindow() {
    const newPixels = this.state.pixels;
    const clearCenter = this.state.window.center;
    for (let i = 0; i < DIRECTIONS.length; i++) {
      const dir = DIRECTIONS[i];

      const newX = clearCenter.x + DIRECTIONS_MAP[dir].dx;
      const newY = clearCenter.y + DIRECTIONS_MAP[dir].dy;

      newPixels[newY][newX].convType = [];

      this.setState({ pixels: newPixels });
    }
  }

  moveWindow() {
    this.clearWindow();
    let newCenter = this.state.window.center;
    if (this.state.window.center.x < NUM_COLS - 2) {
      // move x to the right 1
      newCenter = {
        x: this.state.window.center.x + 1,
        y: this.state.window.center.y,
      };
    } else if (this.state.window.center.y < NUM_ROWS - 2) {
      // move x back to the left border and y down one
      newCenter = newCenter = {
        x: 1,
        y: this.state.window.center.y + 1,
      };
    }

    this.setState({
      window: {
        center: newCenter,
      },
    });
    this.updateWindowClasses();
  }

  getPixelWindowProps(pixel) {
    for (let i = 0; i < DIRECTIONS.length; i++) {
      const dir = DIRECTIONS[i];
      let inWindow =
        pixel.x === this.state.window.center.x + DIRECTIONS_MAP[dir].dx;
      inWindow =
        inWindow &&
        pixel.y === this.state.window.center.y + DIRECTIONS_MAP[dir].dy;
      if (inWindow) {
        return dir;
      }
    }

    return "";
  }

  componentDidUpdate() {
    // this.moveWindow();
  }

  componentDidMount() {
    const pixels = [];
    // create fifteen rows
    for (let row = 0; row < NUM_ROWS; row++) {
      //create 50 columns
      const currentRow = [];
      for (let col = 0; col < NUM_COLS; col++) {
        const currentPixel = {
          x: col,
          y: row,
          isTouched: false,
          convType: [],
        };

        currentPixel.convType =
          this.getPixelWindowProps(currentPixel).split("_");

        //add a pixel to this row
        currentRow.push(currentPixel);
      }
      // add this row to the total list of pixels
      pixels.push(currentRow);
    }
    //update pixels in state with new pixels
    this.setState({ pixels: pixels });
    if (UPDATE_INTERVAL) {
      this.interval = setInterval(this.moveWindow, UPDATE_INTERVAL);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { pixels } = this.state;
    return (
      <div className="grid">
        {pixels.map((row, rowIdx) => {
          return (
            <div className="row" key={rowIdx}>
              {row.map((pixel, pixelIdx) => {
                return (
                  <Pixel
                    key={pixelIdx}
                    row={rowIdx}
                    col={pixelIdx}
                    isTouched={pixel.isTouched}
                    convType={pixel.convType}
                  ></Pixel>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

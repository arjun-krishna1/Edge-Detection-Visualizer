import React, { Component } from "react";
import Pixel from "./Pixel/Pixel";
import Window from "./Window/Window";

import "./EdgeDetectionVisualizer.css";

const NUM_ROWS = 25;
const NUM_COLS = 60;
const INTERVAL = 1000;

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
  }

  moveWindow() {
    if (this.state.window.center.x < NUM_COLS) {
      const newWindow = {
        center: {
          x: this.state.window.center.x + 1,
          y: this.state.window.center.y,
        },
        borders: 
      };
      console.log(newWindow)
      this.setState(newWindow);
    } else if (this.state.window.center.y < NUM_ROWS) {
      this.state.window.center.x = 0;
      this.state.window.center.y++;
    }
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

  componentDidMount() {
    const pixels = [];
    const windowBorder = [];
    let windowCenter;
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
    this.setState({ pixels });
    this.interval = setInterval(this.moveWindow, INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { pixels } = this.state;
    this.moveWindow();
    // console.log(pixels);
    // 12:13
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

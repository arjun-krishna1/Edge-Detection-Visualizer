import React, { Component } from "react";
import Pixel from "./Pixel/Pixel";

import "./EdgeDetectionVisualizer.css";

export default class EdgeDetectionVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pixels: [],
      num_rows: 25,
      num_columns: 60,
      kernel_center: { x: 1, y: 1 },
    };
  }

  componentDidMount() {
    const pixels = [];
    // create fifteen rows
    for (let row = 0; row < this.state.num_rows; row++) {
      //create 50 columns
      const currentRow = [];
      for (let col = 0; col < this.state.num_columns; col++) {
        const currentPixel = {
          col,
          row,
          isTouched: false,
          convType: null,
        };

        if (
          col === this.state.kernel_center.x &&
          row === this.state.kernel_center.y
        ) {
          currentPixel.convType = "center";
        } else if (
          col === this.state.kernel_center.x - 1 &&
          row === this.state.kernel_center.y
        ) {
          currentPixel.convType = "left";
        }

        //add a pixel to this row
        currentRow.push(currentPixel);
      }
      // add this row to the total list of pixels
      pixels.push(currentRow);
    }
    //update pixels in state with new pixels
    this.setState({ pixels });
  }

  render() {
    const { pixels } = this.state;
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

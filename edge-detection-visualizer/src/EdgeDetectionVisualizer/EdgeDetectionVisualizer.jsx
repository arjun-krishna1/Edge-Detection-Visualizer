import React, {Component} from "react";
import Pixel from './Pixel/Pixel';

import './EdgeDetectionVisualizer.css';


export default class EdgeDetectionVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pixels: [],
            num_rows: 25,
            num_columns: 60
        };
    }

    componentDidMount() {
        const pixels = [];
        // create fifteen rows
        for (let row = 0; row < this.state.num_rows; row++) {
            //create 50 columns
            const currentRow = [];
            for (let col = 0; col < this.state.num_columns; col++) {
                //add a pixel to this row
                currentRow.push([]);
            }
            // add this row to the total list of pixels
            pixels.push(currentRow);
        }
        //update pixels in state with new pixels
        this.setState({pixels});
    }

    render() {
        const {pixels} = this.state;
        console.log(pixels);
        // 12:13
        return (
            <div>
                {pixels.map((row, rowIdx) => {
                    return <div>
                        {row.map((pixel, pixelIdx) => <Pixel></Pixel>)}
                    </div>
                })}
            </div>
        );
    }
}
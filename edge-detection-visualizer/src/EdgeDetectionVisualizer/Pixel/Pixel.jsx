import React, {Component} from "react";

import './Pixel.css';

export default class Pixel extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="pixel"></div>
        )
    }
}
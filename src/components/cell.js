import React, { Component } from 'react';

const cell_size = 20;

class Cell extends Component {
    render() {
        const { x, y } = this.props;

        return(
            <div className="Cell" style={{
                left: `${cell_size * x + 1}px`,
                top: `${cell_size * y + 1}px`,
                width: `${cell_size - 1}px`,
                height: `${cell_size -1}px`
            }}
            />
        )
    }
}

export default Cell; 
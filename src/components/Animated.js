import React, {Component} from 'react';

class Animated extends Component {

    constructor(props) {
        super(props)
        this.ctx = null
        this.can = null
    }

    componentDidUpdate() {
        this.init()
        this.can = this.refs.canvas
    }

    init() {

        this.ctx = this
            .refs
            .canvas
            .getContext('2d');
        
        this.ctx.clearRect(0, 0, 500, 200);

        this.ctx.font = 'bold 20px Arial, sans-serif';
        this.ctx.fillStyle = '#ddddd';
        this.ctx.fillText(this.props.text, 10, 50);
        /*this.ctx.strokeStyle = 'red';
        this.ctx.strokeText(this.props.text, 10, 50);*/
        //this.ctx.textBaseline = 'bottom';   
    }
    

    render() {
        return (
            <div>
                <canvas ref="canvas" id="animatedText" width="500" height="200"></canvas>
            </div>
        );
    }
}

export default Animated;
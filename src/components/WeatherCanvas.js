import React, {Component} from 'react';

import css from '../style/animated.less'

class WeatherCanvas extends Component {

    constructor(props) {
        super(props)
        this.ctx = null
        this.canvas = null
    }

    componentDidUpdate() {
        if(this.props.weather && (!this.city || this.city!=this.props.weather.name)){
            this.city = this.props.weather.name
            this.init()
        }
    }

    componentDidMount() {
        this.canvas = this.refs.canvas
    }

    init() {

        var context = this.ctx = this.refs.canvas.getContext('2d');

        const draw = (text, size, color, position)=>{

            var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
            window.requestAnimationFrame = requestAnimationFrame;
            
            var alpha = 0

            const dodraw = ()=>{
                this.ctx.clearRect(position.x, position.y-30, 280, 100)

                this.ctx.font = `bold ${size}px Open Sans Condensed, sans-serif`;
                this.ctx.fillStyle =`rgba(${color},${alpha})`;
                this.ctx.fillText(text, position.x, position.y);

                alpha = alpha + 0.05; 
                if (alpha < 1) {
                    requestAnimationFrame(dodraw)
                }
            }

            requestAnimationFrame(dodraw)
        }

        draw(`City ${this.props.weather.name}`, 30, "77,77,77", {x:0, y:25})
        draw(`High: ${this.props.weather.main.temp_max}`, 20, "217,34,20", {x:0, y:65})
        draw(`Low: ${this.props.weather.main.temp_min}`, 20, "0,0,100", {x:0, y:100})

        var weatherIcon = new Image();
        weatherIcon.src = `http://openweathermap.org/img/w/${this.props.weather.weather[0].icon}.png`;           
        weatherIcon.onload = function()
        {
            context.drawImage(weatherIcon, 200, 50);
        }

    }
    

    render() {
        return (
            <div className={css.weatherCanvas}>
                <canvas ref="canvas" id="animatedText" width="280" height="110"></canvas>
            </div>
        );
    }
}

export default WeatherCanvas;
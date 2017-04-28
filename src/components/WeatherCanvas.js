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

        var self = this
        var context = this.ctx = this.refs.canvas.getContext('2d');
        context.clearRect(0,0,280,110)

        const draw = (text, size, color, position, chainCbk)=>{

            var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
            window.requestAnimationFrame = requestAnimationFrame;
            
            var alpha = 0
            const baseX = -200
            var currentX = baseX

            const dodraw = ()=>{
                context.clearRect(currentX, position.y-30, 280, 100)

                context.font = `bold ${size}px Open Sans Condensed, sans-serif`;
                context.fillStyle =`rgba(${color},${alpha})`;
                context.fillText(text, currentX, position.y);

                alpha = alpha < 1 ? alpha + 0.05: 1; 
                
                currentX = currentX + 10

                if (currentX < position.x) 
                    requestAnimationFrame(dodraw)
                else 
                    if (chainCbk){
                        currentX = baseX
                        chainCbk()
                    }
            }
            requestAnimationFrame(dodraw)
        }


        const iconLoad = ()=>{
            var weatherIcon = new Image();
            weatherIcon.src = `http://openweathermap.org/img/w/${self.props.weather.weather[0].icon}.png`;           
            weatherIcon.onload = function()
            {
                context.drawImage(weatherIcon, 200, 30);
            }
        }

        draw(`${this.props.weather.name}`, 30, "77,77,77", {x:10, y:25}, 
            ()=>{draw(`High: ${this.props.weather.main.temp_max}`, 20, "217,34,20", {x:10, y:65}, 
                ()=>{draw(`Low: ${this.props.weather.main.temp_min}`, 20, "0,0,100", {x:10, y:100}, iconLoad)}
            )}
        )

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
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {checkLocation, echoWebSocket, testLatency, getWeather} from '../actions/main'

import Animated from './Animated'

import css from '../style/main.less'

class App extends Component {

    constructor(props){
        super(props)
        this.props.echoWebSocket()
        this.state = {measured: false, input:''}
        this.updateInput = this.updateInput.bind(this)
        this.weatherByQuery = this.weatherByQuery.bind(this)
    }

    componentDidUpdate() {
        if(this.props.weather && this.props.websocket && !this.state.measured){
            this.props.testLatency(this.props.websocket, this.props.weather.main.temp_max)
            this.setState({measured:true})
        }
    }

    updateInput(evt){
        this.setState({input: evt.target.value})
    }

    weatherByQuery(evt){
        evt.preventDefault()
        this.setState({measured:false})
        this.props.getWeather(null,null,this.state.input)
    }

    render() {
        const location = this.props.location ? `Current Coords: ${this.props.location.lat} - ${this.props.location.lon}`: "no location"
        const weather = this.props.weather ? <Animated text={`city name has high of ${this.props.weather.main.temp_max} and low of ${this.props.weather.main.temp_min}`}/> : 'no weather data'
        const latency = this.props.latency ? `websocket took ${this.props.latency/1000} seconds to return message`: 'Latency has not been measured yet'

        return (
            <div className={css.app}>
                <form onSubmit={(evt)=>{this.weatherByQuery(evt)}}>
                    <input type="text" value={this.state.input} onChange={this.updateInput}/>
                </form>
                <p>{location}</p>
                <p>{latency}</p>
                {weather}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {

    return {
        location: state.location,
        weather: state.weather, 
        websocket: state.websocket,
        latency: state.latency
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({
        checkLocation: checkLocation,
        echoWebSocket: echoWebSocket,
        testLatency: testLatency,
        getWeather: getWeather
    }, dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
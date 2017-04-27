import * as ACTIONS from '../actions/main'

const initialState = {
    location: null,
    weather: null,
    websocket: null,
    latency: null
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case ACTIONS.SET_LOCATION:
            return Object.assign({}, state, {location: {lat: action.location.lat, lon: action.location.lon}})
        break

        case ACTIONS.WEATHER_RESULTS:
            return Object.assign({}, state, {weather: action.weather})

        case ACTIONS.SET_WEBSOCKET:
            return Object.assign({}, state, {websocket: action.websocket})

        case ACTIONS.SET_LATENCY:
            return Object.assign({}, state, {latency: action.latency})

        default:
            return state
    }
}

export default reducer
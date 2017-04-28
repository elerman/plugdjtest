export const CHECK_LOCATION = "CHECK_LOCATION"
export const checkLocation = () => {
    return (dispatch) => {
        if ("geolocation" in navigator) {
            navigator
                .geolocation
                .getCurrentPosition((location) => {
                    dispatch(setLocation(location.coords.latitude, location.coords.longitude))
                    dispatch(getWeather(location.coords.latitude, location.coords.longitude))
                })
        } else {
            return {type: SET_LOCATION, location: null}
        }
    }
}

export const SET_LOCATION = "SET_LOCATION"
export const setLocation = (lat, lon) => {
    return {type: SET_LOCATION, location: {lat,lon}}
}

export const WEATHER_RESULTS = "WEATER_RESULTS"
export const weatherResults = (weather) => {
    return {type: WEATHER_RESULTS, weather}
}

export const GET_WEATHER = "GET_WEATHER"
export const getWeather = (lat, lon, query) => {
    return (dispatch) => {
        let api = (lat && lon)? `http://api.openweathermap.org/data/2.5/weather?APPID=4e9c339913ec87d7a78b6c0242b5489c&lat=${lat}&lon=${lon}&units=metric`: 
                                `http://api.openweathermap.org/data/2.5/weather?APPID=4e9c339913ec87d7a78b6c0242b5489c&q=${query}&units=metric`
        return fetch(api).then(response => {
            if (!response.ok) {
                alert('oops. weather api failed')
            } else 
                response
                    .json()
                    .then(json => {
                        if(query)dispatch(setLocation(json.coord.lat, json.coord.lon))
                        dispatch(weatherResults(json))
                    })
            })
    }
}

export const ECHO_WEBSOCKET = "ECHO_WEBSOCKET"
export const echoWebSocket = () => {
    return (dispatch) => {
        let uri = "ws://echo.websocket.org/"
        var websocket = new WebSocket(uri)

        websocket.onopen = (evt) => {
            console.log("websocket opened")
            dispatch(setWebSocket(websocket))
            dispatch(checkLocation())
        }
    }
}

export const SET_WEBSOCKET = "SET_WEBSOCKET"
export const setWebSocket = (websocket) => {
    return {type: SET_WEBSOCKET, websocket}
}

export const TEST_LATENCY = "TEST_LATENCY"
export const testLatency = (websocket, param) => {
    return (dispatch) => {
        console.log("testing socket latency")
        var start = Date.now()
        websocket.onmessage = (evt) => {
            let latency = Date.now() - start;
            console.log("latency socket response")
            dispatch(setLatency(latency))
        }
        websocket.send(param)
    }
}

export const SET_LATENCY = "SET_LATENCY"
export const setLatency = (latency)=>{
    return {type: SET_LATENCY, latency}
}

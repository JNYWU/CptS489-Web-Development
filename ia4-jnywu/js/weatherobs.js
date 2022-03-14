class WeatherStation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            latitude: this.props.latitude,
            longitude: this.props.longitude,
        };
    }

    componentDidMount = () => {
        this.getCurrentObservations();
    }
    
    getCurrentObservations = async () => {
        const response = await fetch('https://api.weather.gov/points/' +
            this.state.latitude + ',' +
            this.state.longitude);
        const forecast = await response.json();
        const gridId = forecast.properties.gridId;
        const gridX = forecast.properties.gridX;
        const gridY = forecast.properties.gridY;
        // const forecastLink = 'https://api.weather.gov/gridpoints/' + gridId + '/' + gridX + ',' + gridY + '/forecast';
        const ResponseCurrWeather = await fetch(forecast.properties.forecast)
        const currWeather = await ResponseCurrWeather.json();
        this.setState({
            place: forecast.properties.relativeLocation.properties.city,
            retrieved: (new Date()).toLocaleDateString() + " at " + (new Date()).toLocaleTimeString(),
            conditions: currWeather.properties.periods[0].shortForecast,
            temp: Math.round(currWeather.properties.periods[0].temperature),
            tempUnit: "F",
            wind: currWeather.properties.periods[0].windSpeed,
            windDirection: currWeather.properties.periods[0].windDirection
        });
    }

    toggleUnits = () => {

        if (this.state.tempUnit == "F") {
            this.setState({ tempUnit: "C", temp: Math.round((this.state.temp - 32) * 5 / 9) });
        } else {
            this.setState({ tempUnit: "F", temp: Math.round((this.state.temp * 9 / 5) + 32) });
        }

        // if (this.state.unit == "Metric") {
        //     this.setState({ visibilityUnit: "Yards", visibility: Math.round(this.state.visibility * 1.0936 * 10) / 10 });
        //     this.setState({ unit: "Imperial" });
        // } else {
        //     this.setState({ visibilityUnit: "Meters", visibility: Math.round(this.state.visibility * 0.9144 * 10) / 10 });
        //     this.setState({ unit: "Metric" });
        // }

        // if (this.state.unit == "Metric") {
        //     this.setState({ windUnit: "Yards/sec", wind: Math.round(this.state.wind * 1.0936 * 10) / 10 });
        //     this.setState({ unit: "Imperial" });
        // } else {
        //     this.setState({ windUnit: "Meters/sec", wind: Math.round(this.state.wind * 0.9144 * 10) / 10 });
        //     this.setState({ unit: "Metric" });
        // }
    }

    ArrowExistDown = (id) => {
        if (id == this.props.stationCount) {
            alert("arrow down")
            document.getElementById("arrowdown").style.display = 'none'
        }
    }
    ArrowExistUp = (id) => {
        if (id == this.props.stationCount) {
            document.getElementById("arrowup").style.display = 'none'
        }
    }

    update = () => {
        this.setState({
            retrieved: (new Date()).toLocaleDateString() + " at " + (new Date()).toLocaleTimeString()
        })
    }


    render() {
        const StationStyle = {
            width: '25px',
            height: '25px',
            right: '25px',
            position: 'absolute'
        }
        return (
            <div align="center" className="jumbotron">
                <h3>
                    <span id={"remove-" + this.props.stationId} className="fa fa-times-circle" onClick={() => this.props.removeStation(this.props.stationId)} style={StationStyle}></span>
                    <span id="arrowUp" className="fa fa-arrow-up" style={{ display: 'block' }} onClick={() => this.props.moveStation(0, this.props.stationId)}></span>
                </h3>
                <p></p>
                <h2>{this.state.place}</h2>
                <h6>
                    <i>Last updated: {this.state.retrieved}</i>
                    <span class="fa fa-retweet" type="button" id={"update-" + this.props.stationId}
                        onClick={this.update}></span>
                </h6>
                <h5>Conditions: {this.state.conditions}</h5>
                <h5>Temp: {this.state.temp}&deg;&nbsp;{this.state.tempUnit}</h5>
                <h5>Wind Speed: {this.state.wind}</h5>
                <h5>Wind Direction: {this.state.windDirection}</h5>
                <div className="custom-control custom-switch">
                    <input type="checkbox" className="custom-control-input" id={"switch-" + this.props.stationId}
                        onClick={this.toggleUnits} />
                    <label className="custom-control-label" htmlFor={"switch-" + this.props.stationId}>&nbsp;{this.state.unit}</label>
                </div>
                <p></p>
                <h3>
                    <span id="arrowDown" className="fa fa-arrow-down" style={{ display: 'block' }} onClick={() => this.props.moveStation(1, this.props.stationId)}></span>
                </h3>
            </div>
        );
    }
}

//The WeatherObs web app
class WeatherObs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stations: [],
            stationCount: 0
        };
    }

    componentDidMount = () => {
        //Initialize based on user's current location, if possible
        navigator.geolocation.getCurrentPosition(this.getLocSuccess, this.getLocError);
    }

    //Called when user agrees to give loc data. We set the first weather
    //station to show conditions at the user's current position.
    getLocSuccess = (position) => {
        this.setState({
            stations: [{
                lat: position.coords.latitude,
                lon: position.coords.longitude,
                stationId: this.state.stationCount + 1
            }],
            stationCount: this.state.stationCount + 1
        });
    }

    //Called when user refuses to give access to loc data
    //Initializes first weather station to Seattle in this case
    getLocError = (err) => {
        this.setState({
            stations: [{
                lat: 47.61,
                lon: -122.33,
                stationId: this.state.stationCount + 1
            }],
            stationCount: this.state.stationCount + 1
        });
    }

    //addStation -- When user clicks on "+" button to add a new weather station,
    //prompt the user for the location and attempt to add the requested station.
    addStation = async () => {
        const newStation = prompt("Enter a City, State, and Country:");
        if (newStation != null) { //Need to see if we can find the station through the API 
            const response = await fetch('https://nominatim.openstreetmap.org/search?q=' +
                newStation + '&format=geojson');
            const stationData = await response.json();
            //See if the requested station exists
            if (stationData != null && stationData.hasOwnProperty('features')) {
                //Push new station into stations list
                let newStations = [...this.state.stations];
                newStations.push({
                    lat: stationData.features[0].geometry.coordinates[1],
                    lon: stationData.features[0].geometry.coordinates[0],
                    stationId: this.state.stationCount + 1
                });
                this.setState({
                    stations: newStations,
                    stationCount: this.state.stationCount + 1
                });
            } else {
                alert("Sorry, that weather location could not be found.");
            }
        }
    }

    //removeStation -- Given the id of the station to remove, this method
    //removes the station and updates state accordingly
    removeStation = (stationId) => {
        let newStation = [...this.state.stations];
        for (let i = 0; i < newStation.length; ++i) {
            var rmIndex = newStation[i].stationId
            if (rmIndex == stationId) {
                newStation.splice(i, 1)
            }
        }
        for (let i = 0; i < newStation.length; ++i) {
            newStation[i].stationId = i + 1
        }
        this.setState({
            stations: newStation,
            stationCount: this.state.stationCount - 1
        });
        console.log(newStation)
    }

    //moveStation -- Given the direction in which to move the station and
    //the id of the station to move, this method updates state to re-//order the stations list accordingly
    moveStation = (direction, stationId) => {
        let newStation = [...this.state.stations];
        for (let i = 0; i < newStation.length; ++i) { //find the related index using stationId
            var rmIndex = newStation[i].stationId
            if (rmIndex == stationId) {
                var movingIndex = i;
            }
        }
        if (direction == 0) { //moving upward
            var station = newStation[movingIndex]
            var upstation = newStation[movingIndex - 1]
            if (upstation == null) {
                alert("This is the toppest station!!");
            }
            else {
                newStation.splice(movingIndex - 1, 1, station)
                newStation.splice(movingIndex, 1, upstation)
            }
        } else {
            var station = newStation[movingIndex]
            var downstation = newStation[movingIndex + 1]
            if (downstation == null) {
                alert("This is the lowest station!");
            }
            else {
                newStation.splice(movingIndex + 1, 1, station)
                newStation.splice(movingIndex, 1, downstation)
            }
        }
        this.setState({
            stations: newStation,
            stationCount: this.state.stationCount
        });
        console.log(newStation)

    }

    render() {
        let rows = [];
        for (let i = 0; i < this.state.stations.length; ++i) {
            rows.push(<WeatherStation key={this.state.stations[i].stationId}
                latitude={this.state.stations[i].lat}
                longitude={this.state.stations[i].lon}
                stationId={this.state.stations[i].stationId}
                moveStation={this.moveStation}
                removeStation={this.removeStation}
            />);
        }
        return (
            <div id="main">
                <div id="weatherStations">
                    {rows}
                </div>
                <div className="floatButton" id="floatBtnDiv">
                    <a className="float" id="addStationBtn" onClick={this.addStation}>
                        <span className="float-btn-icon fa fa-plus" id="floatBtnIcon"></span>
                    </a>
                </div>
            </div>

        );
    }
}


ReactDOM.render(
    <WeatherObs />,
    document.getElementById('root')
);

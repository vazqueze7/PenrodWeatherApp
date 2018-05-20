import React, {Component} from "react"
import ReactDom from "react-dom" 
import style from "styled-components"

class CurrentWeather extends Component {
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            cityId: props.cityId,
            cityName: props.cityName,
            cityState: props.cityState,
            backgroundImg:"/content/images/" + props.cityName + ".jpg",
            currentWeatherApi:"http://api.openweathermap.org/data/2.5/weather?id="+ props.cityId + "&units=imperial&APPID=1f7728589dc72b573a66d57e97a01f08",
            iconImg:"http://openweathermap.org/img/w/",
            weather: null,
            coord: null,
            main: null,
            wind: null,
            clouds: null
        };
        

    }
    
    componentDidMount(){
        fetch(this.state.currentWeatherApi)
            .then(res => res.json())
            .then(
                (result) => {
                this.setState({
                    isLoaded:true,
                    weather: result.weather,
                    coord: result.coord,
                    main: result.main,
                    wind: result.wind,
                    clouds: result.clouds
                });
                    
            },

            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }


    

    

    render(){
        const {error, isLoaded, weather, city, coord, main, wind, clouds} = this.state;  


        

        if(error){
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded){
            return <div className="demo-only">
                    <div role="status" className="slds-spinner slds-spinner_medium">
                    <span className="slds-assistive-text">Loading</span>
                    <div className="slds-spinner__dot-a"></div>
                    <div className="slds-spinner__dot-b"></div>
                    </div>
                </div>
        } else {
            return (
                <div className="cardContainer">
                    <div>                       
                        <div className="slds-align_absolute-center description"><img src={this.state.iconImg + this.state.weather[0].icon + ".png"}></img> {this.state.weather.main}</div>
                        <div className="slds-align_absolute-center cityName">{this.state.cityName}, {this.state.cityState}</div>
                        <div className="slds-align_absolute-center degrees">{Math.round(this.state.main.temp)}&deg;</div>
                        <div>High: {this.state.main.temp_max} | Low: {this.state.main.temp_min} </div>

                    </div>
           
                </div>
            )
        }
    }
}

export default CurrentWeather;
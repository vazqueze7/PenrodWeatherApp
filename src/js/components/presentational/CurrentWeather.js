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
            backgroundImg:"/content/images/" + props.cityName + ".jpg",
            currentWeatherApi:"http://api.openweathermap.org/data/2.5/weather?id="+ props.cityId + "&units=imperial&APPID=1f7728589dc72b573a66d57e97a01f08",
            hourWeatherApi:"http://api.openweathermap.org/data/2.5/forecast?id="+ props.cityId + "&units=imperial&APPID=1f7728589dc72b573a66d57e97a01f08",
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
        const backgroundTemplate ={
            //backgroundImage: "url('"+this.state.backgroundImg+"')",
            //height: '100%'
        };

        if(error){
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded){
            return <div>Loading...</div>
        } else {
            return (
                <div style={backgroundTemplate} className="">
                    {weather.map((w,i) =>
                    <div key={i}>
                        <div className="slds-align_absolute-center cityName">{this.state.cityName}</div>
                        <div className="slds-align_absolute-center"><span className="degrees">{this.state.main.temp}&deg;</span></div>
                        <div  className="slds-align_absolute-center"><img src={this.state.iconImg + w.icon + ".png"}></img></div>
                        <div className="slds-align_absolute-center">{w.description}</div>
                    </div>
                    )}
                </div>
            )
        }
    }
}

export default CurrentWeather;
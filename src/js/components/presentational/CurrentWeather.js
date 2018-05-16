import React, {Component} from "react"
import ReactDom from "react-dom" 

class CurrentWeather extends Component {
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            city: props.city,
            api: "api.openweathermap.org/data/2.5/weather?q=" + props.city + "&APPID=1f7728589dc72b573a66d57e97a01f08",
            weather: [],
            coord: [],
            main: [],
            wind: [],
            clouds = [],
        };

    }
    
    componentDidMount(){
        fetch(api)
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
        const {error, isLoaded, weather, coord, main, wind, clouds} = this.state;  
        if(error){
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded){
            return <div>Loading...</div>
        } else {
            return (
                <ul>
                    {weather.map(w => (
                        <li key={w.main}>
                            {w.main} {w.description}
                        </li>
                    ))}

                </ul>
            )
        }
    }
}
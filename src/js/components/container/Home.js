import React, {Component } from "react";
import ReactDom from "react-dom";
import CurrentWeather from "../presentational/CurrentWeather";
import WeatherDetails from "../presentational/WeatherDetails";
 

class Home extends Component {
    constructor() {
        super();

        this.state = {
            isOnHomeView: true,
            currentCityId: null,
            currentCityName: null 

        };


    }

    //If clicked display detail rendering view
    handleDetailWeatherClick(id,name){
        this.setState({
            isOnHomeView:false,
            currentCityId: id
        })
        console.log(id + name);
    }

    //If on detail page and clicked display home view
    handleCurrentWeatherClick() {
        this.setState({isOnHomeView:true})
    }

    handleChange(event){
        this.setState({ [event.target.id] : event.target.value});
    }


    //Setting Cities to display
    getCitiesArray(){
        let cities = [
            {cityId: "5263058", cityName: "Milwaukee", state: "WI"},
            {cityId: "4887398", cityName: "Chicago", state: "IL"},
            {cityId: "5037649", cityName: "Minneapolis",state:"MN"},
            {cityId: "4684888", cityName: "Dallas", state:"TX"}
        ]

        return cities;
    }

    getBackgroundImage(){
        let imagePath = null;
        


    }

   

    render() {
        //getting cities from array
        let cities = this.getCitiesArray();

        const isOnHomeView = this.state.isOnHomeView;

        // looping containers for each city
        const CurrentWeatherContainer = cities.map((city, i) => 
            <div id={city.cityName} className="card currentWeatherCard" key={i} onClick={this.handleDetailWeatherClick.bind(this,city.cityId,city.cityName,city.state)}>          
                <CurrentWeather                  
                    cityId= {city.cityId}
                    cityName = {city.cityName}
                    cityState = {city.state}
                />
            </div>
        );
        return( 
            
           <div className="ViewingContainer container">
               {isOnHomeView ?(
                   <div className="centered cards">
                       {CurrentWeatherContainer}
                    </div>
               ) : (
                <div className="WeatherDetailContainer">
                        <WeatherDetails
                            cityId = {this.state.currentCityId}
                        />
                </div>
               )}
              
           </div> 
        );

         
    }
}


export default Home;

const wrapper = document.getElementById("homePage");
wrapper ? ReactDom.render(<Home/>, wrapper) : false;


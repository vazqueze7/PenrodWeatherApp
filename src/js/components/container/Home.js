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
            {cityId: "5263058", name: "Milwaukee"},
            {cityId: "4887398", name: "Chicago"},
            {cityId: "5037649", name: "Minneapolis"},
            {cityId: "4684888", name: "Dallas"}
        ]

        return cities;
    }

   

    render() {
        //getting cities from array
        let cities = this.getCitiesArray();

        const isOnHomeView = this.state.isOnHomeView;

        // looping containers for each city
        const CurrentWeatherContainer = cities.map((city, i) =>  
            <div className="slds-box slds-col slds-p-around_medium" key={i} onClick={this.handleDetailWeatherClick.bind(this,city.cityId,city.name)}>          
                <CurrentWeather                  
                    cityId= {city.cityId}
                    cityName = {city.name}
                />
            </div>
        );
        return( 
            
           <div>
               {isOnHomeView ?(
                <div className="slds-box">
                   <div className="slds-grid slds-gutters slds-card">
                       {CurrentWeatherContainer}
                   </div>
                   
                 </div>
               ) : (
                <WeatherDetails
                    cityId = {this.state.currentCityId}
                />
               )}
              
           </div> 
        );

         
    }
}


export default Home;

const wrapper = document.getElementById("homePage");
wrapper ? ReactDom.render(<Home/>, wrapper) : false;


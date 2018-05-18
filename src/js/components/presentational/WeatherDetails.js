import React, {Component} from "react"
import ReactDom from "react-dom" 
import style from "styled-components"

class WeatherDeatils extends Component{
    constructor(props){
        super(props); 
        this.state = {
            error: null,
            isLoaded: false,
            cityId: this.props.cityId,
            hourWeatherApi:"http://api.openweathermap.org/data/2.5/forecast?id="+ props.cityId + "&units=imperial&APPID=1f7728589dc72b573a66d57e97a01f08",
            iconImg:"http://openweathermap.org/img/w/",
            city: null,
            count: null,
            list: null,
            fiveDayAdv: null
            
        }   

    }

    getDayOfTheWeek(day){
        var week = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"]

        return week[day];

    }

    componentDidMount(){
        fetch(this.state.hourWeatherApi)
            .then(res =>res.json())
            .then(
                (result) => {
                    let hoursList = [];
                    let week = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"]
                    let fiveDays = [];

                    for(var x=0; x < result.cnt; x++){
                        var dt = result.list[x].dt_txt;
                        var dateDay = new Date(dt);
                       
                        var currentDay = new Date();
                      


                        if(dateDay.getUTCDay() < currentDay.getUTCDate() && dateDay.getHours() === 15){
                            hoursList.push(result.list[x]);
                            fiveDays.push(week[dateDay.getDay()]);

                        }
                        

                    }
                    this.setState({
                        isLoaded: true,
                        city: result.city,
                        count: result.cnt,
                        list: hoursList,
                        fiveDayAdv : fiveDays
                    })
                }
            ),

            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                })
            }
    }



    render(){
        const {error, isLoaded, city,count,list} = this.state; 
        
         

        if(error){
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded){
            return <div>Loading...</div>
        } else {
            return( 
                <div>
                    <h2>Milwaukee</h2>
                    <div className="slds-grid">
                        {list.map((li,i) =>
                        <div key={i} className="slds-col card weatherDetailCard">  
                            <div className="cardContainer dayOfTheWeek">{this.state.fiveDayAdv[i]}</div>            
                            <div className="slds-align_absolute-center description"><img src={this.state.iconImg + li.weather[0].icon + ".png"}></img>{li.weather[0].main}</div>
                            <div className="slds-align_absolute-center degrees">{Math.round(li.main.temp)}&deg;</div>
                        </div>
                        )}
                    </div>

               </div> 
            )
        }
    }
}

export default WeatherDeatils;
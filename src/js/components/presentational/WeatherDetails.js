import React, {Component} from "react"
import ReactDom from "react-dom" 

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

    //returns list of days
    getDayOfTheWeek(day){
        var week = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"]

        return week[day];

    }

    componentDidMount(){
        fetch(this.state.hourWeatherApi)
            .then(res =>res.json())
            .then(
                (result) => {

                    //get day of the week
                    let dayList = [];
                    let week = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"]
                    let fiveDays = [];

                    for(var x=0; x < result.cnt; x++){
                        var dt = result.list[x].dt_txt;
                        var dateDay = new Date(dt);
                       
                        var currentDay = new Date();
                      

                        // add day to the array
                        if(dateDay.getUTCDay() < currentDay.getUTCDate() && dateDay.getHours() === 15){
                            dayList.push(result.list[x]);
                            fiveDays.push(week[dateDay.getDay()]);

                        }
                        

                    }
                    this.setState({
                        isLoaded: true,
                        city: result.city,
                        count: result.cnt,
                        list: dayList,
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
            return <div className="demo-only">
            <div role="status" className="slds-spinner slds-spinner_medium">
            <span className="slds-assistive-text">Loading</span>
            <div className="slds-spinner__dot-a"></div>
            <div className="slds-spinner__dot-b"></div>
            </div>
        </div>
        } else {
            return( 
                <div>
                    <div className={"slds-page-header "+ city.name}>
                        <div className="slds-media">
                            <div className="slds-media__figure">
                                <span className="slds-icon_container slds-icon-standard-opportunity" title="Description of icon when needed">
                                </span>
                                </div>
                                <div className="slds-media__body">
                                <h1 className="slds-page-header__title slds-truncate slds-align-middle"  title={city.name}>{city.name}</h1>
                                <p className="slds-text-body_small slds-line-height_reset"></p>
                            </div>
                        </div>
                    </div>
                    <div className="slds-grid"> 
                        {list.map((li,i) =>
                        <div key={i} className={"slds-col card weatherDetailCard " + city.name} >  
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
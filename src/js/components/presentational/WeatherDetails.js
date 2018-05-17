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
            dailyWeatherApi: "http://api.openweathermap.org/data/2.5/forecast/daily?id="+ this.props.cityId + "&units=imperial&APPID=706e2491e7463d30ec4c8e322c72e8b2",
            city: null,
            count: null,
            list: null
            
        }   

    }

    componentDidMount(){
        fetch(this.state.dailyWeatherApi)
            .then(res =>res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        city: result.city,
                        count: result.cnt,
                        list: result.list
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
        const backgroundTemplate ={
            //backgroundImage: "url('"+this.state.backgroundImg+"')",
            //height: '100%'    
        };

        if(error){
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded){
            return <div>Loading...</div>
        } else {
            return 
             {/*} <div style={backgroundTemplate} className="">
                    {list.map((li,i) =>
                    <div key={i}>
                        <div className="slds-align_absolute-center"><span className="degrees">{this.state.city}&deg;</span></div>
                        <div  className="slds-align_absolute-center"><img src={this.state.iconImg + w.icon + ".png"}></img></div>
                        <div className="slds-align_absolute-center">{w.description}</div>
                    </div>
                    )}
                </div>
            */}
            <div>
               hello     
            </div>
                
            
        }
    }
}

export default WeatherDeatils;
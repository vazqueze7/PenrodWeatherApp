import React, {Component } from "react";
import ReactDom from "react-dom";
import Input from "../presentational/Input";
 

class Home extends Component {
    constructor() {
        super();

        this.state = {
            seo_title : ""
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({ [event.target.id] : event.target.value});
    }

    renderCities(i){
        return 
             <City />;
        
    }

    render() {
        const { seo_title } = this.state;
        return (
            <div>
                <div className="hello">
                    {this.renderCities(0)}
                    {this.renderCities(1)}
                    {this.renderCities(2)}
                    {this.renderCities(3)}
                </div>
                <form id="article-form">
                    <Input
                        text = "SEO title"
                        label = "seo_title"
                        type = "text"
                        id = "seo_title"
                        value = {seo_title}
                        handleChange = {this.handleChange}
                    />
                </form>
            </div>
        );
    }
}


export default Home;

const wrapper = document.getElementById("homePage");
wrapper ? ReactDom.render(<Home/>, wrapper) : false;


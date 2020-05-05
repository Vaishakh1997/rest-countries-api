
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Input } from 'reactstrap';
import { Redirect } from "react-router-dom";
import './App.css'
const axios = require('axios');

class Home extends Component {
    state = {
        data:[]
    }

    handleChangeSearch = (event) => {
        this.getFunctionCall(`https://restcountries.eu/rest/v2/name/${event.target.value}`)
    }

    
    handleChangeFilter = (event) => {
        let url;
        if(event.target.value === '')
            url = 'https://restcountries.eu/rest/v2/all'
        else
            url = `https://restcountries.eu/rest/v2/region/${event.target.value}`

        this.getFunctionCall(url)
    }

    detailPage = (a) =>{
        this.props.history.push(`/${a}`);
    }
    

    getFunctionCall = (url) =>{
        axios({
            method: 'get',
            url: url
          })
            .then(response=> {
                this.setState({data:response.data})
            })
            .catch(error=>{
                console.log(error)
            })
    }

    componentDidMount=()=>{
        this.getFunctionCall('https://restcountries.eu/rest/v2/all')
    }

    render() {
        return (
                <section className="home">
                    <div className="search-and-filter">
                        <Input style={{width:'30%'}} className="search" name="uname" placeholder='Search for a country..' type="text" value={this.state.uname} id="#uname" onChange={this.handleChangeSearch} />
                        <Input style={{width:'20%'}} className="filter" type="select" name="select" id="exampleSelect" onChange={this.handleChangeFilter}>
                            <option value="" >All</option>
                            <option value="Africa" >Africa</option>
                            <option value="Americas" >Americas</option>
                            <option value="Asia" >Asia</option>
                            <option value="Europe" >Europe</option>
                            <option value="Oceania" >Oceania</option>
                        </Input>
                    </div>
                    <div className="country-layout-list">

                        {this.state.data.map(country => {
                            return (
                            <div key={country.numericCode} value={country.name} className="country-layout" onClick={()=>this.detailPage(country.name)}>
                                <div className="country-flag">
                                    <img style={{ width: '100%', height: '100%' }} src={country.flag} alt={country.numericCode}></img>
                                </div>
                                <div className="country-details">
                                    <h5>{country.name}</h5>
                                    <p><b>Population : </b>{country.population}</p>
                                    <p><b>Region : </b>{country.region}</p>
                                    <p><b>Capital : </b>{country.capital}</p>
                                </div>
                            </div>)
                        })}

                    </div>
                </section>
        );
    }
}

export default Home;
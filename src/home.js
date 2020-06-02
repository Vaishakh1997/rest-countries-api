
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Input } from 'reactstrap';
import { Redirect } from "react-router-dom";
import './App.css'
const axios = require('axios');

class Home extends Component {
    state = {
        data:[],
        loading: false
    }

    handleChangeSearch = (event) => {
        this.getFunctionCall(`https://restcountries.eu/rest/v2/name/${event.target.value}`)
        this.setState({loading:false})
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
        this.setState({loading:true})
        axios({
            method: 'get',
            url: url
          })
            .then(response=> {
                this.setState({data:response.data})
                // this.setState({loading: false})
            })
            .catch(error=>{
                console.log(error)
            })
            .then(re=>this.modeChange())
    }

    componentDidMount=()=>{
        this.getFunctionCall('https://restcountries.eu/rest/v2/all')
    }
    modeChange = () => {
        var color1, color2, color3

        if (localStorage.getItem('mode') === 'Dark Mode') {
            document.getElementById('mode').innerHTML = 'Light Mode'
            color1 = '#2b3743'
            color2 = '#212e37'
            color3 = 'white'
        }
        else {
            document.getElementById('mode').innerHTML = 'Dark Mode'
            color1 = '#ffffff'
            color2 = '#fafafa'
            color3 = 'black'
        }
        document.getElementById('header').style.backgroundColor = color1
        document.getElementById('header').style.color = color3

        document.getElementById('home').style.backgroundColor = color2
        document.getElementById('home').style.color = color3

        document.getElementById('uname').style.backgroundColor = color1
        document.getElementById('uname').style.color = color3

        document.getElementById('exampleSelect').style.backgroundColor = color1
        document.getElementById('exampleSelect').style.color = color3

        var countryDetails = document.getElementsByClassName('country-details')
        for (var i = 0; i < countryDetails.length; i++) {
            countryDetails[i].style.backgroundColor = color1
        }
    }

    render() {
        return (
                <section className="home" id="home">
                    <div className="search-and-filter">
                        <div className="search">
                        <Input name="uname" placeholder='Search for a country..' type="text" value={this.state.uname} id="uname" onChange={this.handleChangeSearch} />
                        </div>
                        <div className="filter">
                            <Input className="filter" type="select" name="select" id="exampleSelect" onChange={this.handleChangeFilter}>
                            <option value="" >All</option>
                            <option value="Africa" >Africa</option>
                            <option value="Americas" >Americas</option>
                            <option value="Asia" >Asia</option>
                            <option value="Europe" >Europe</option>
                            <option value="Oceania" >Oceania</option>
                        </Input>
                        </div>
                    </div>
                    {this.state.loading === true? <div className="country-layout-list">Loading...</div> :
                    <div className="country-layout-list">

                        {this.state.data.map(country => {
                            return (
                            <div key={country.numericCode} value={country.name} className="country-layout" onClick={()=>this.detailPage(country.name)}>
                                <div className="country-flag">
                                    <img style={{ width: '100%', height: '100%' }} src={country.flag} alt={country.numericCode}></img>
                                </div>
                                <div className="country-details" id="country-details">
                                    <h5>{country.name}</h5>
                                    <p><b>Population : </b>{country.population}</p>
                                    <p><b>Region : </b>{country.region}</p>
                                    <p><b>Capital : </b>{country.capital}</p>
                                </div>
                            </div>)
                        })}

                    </div>}
                </section>
        );
    }
}

export default Home;
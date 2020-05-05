import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
const axios = require('axios');

class Details extends Component {
    state = { 
        countryName: this.props.match.params.name,
        data:[],
        languages:[],
        bordersCode:[],
        AllBordersCodeAndName:{},
        borderName:[]
     }
    
    goBack = () =>{
        this.props.history.push(`/`);
    }

    boederNames = (data) => {
        let bordersCode={}
        data.map(border=>{
            bordersCode[border.alpha3Code]=border.name
        })
        this.setState({AllBordersCodeAndName:bordersCode})

        var b=[]
        this.state.bordersCode.map(borderCode=>{
            Object.entries(this.state.AllBordersCodeAndName).filter(a=>{
                if(a[0]===borderCode)
                    b.push(a[1])
            })
        })
        this.setState({borderName:b})
    }
    
    getLanguagesAndBorder = () =>{
        let array = []
        this.state.data[0].languages.map(l => array.push(l.name))
        array = array.toString()
        this.setState({ languages: array, bordersCode: this.state.data[0].borders }) //storing languages and borders in state as array.

        axios({
            method: 'get',
            url: 'https://restcountries.eu/rest/v2/all'
        })
            .then(response => {
                this.boederNames(response.data);
            })
            .catch(error => {
                console.log(error)
            })
    }
    
    changeDetails = (name) => {
        this.props.history.push(`/${name}`)
        window.location.reload(true);
    }

    componentDidMount = () => {
        axios({
            method: 'get',
            url: `https://restcountries.eu/rest/v2/name/${this.state.countryName}?fullText=true`
        })
            .then(response => {
                this.setState({ data: response.data })
               this.getLanguagesAndBorder();
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() { 
        return ( 
            <section className="details">
                <button style={{border:'1px solid #D3D3D3'}} type="button" className="btn btn-light" onClick={this.goBack}>Back</button>

                {this.state.data.map(detail=>{
                    return(
                        <div className="details-view">
                    <div className="details-flag">
                        <img style={{width:'100%',height:'100%'}} src={detail.flag} alt=""></img>
                    </div>
                    <div className="details-details">
                        <h2>{detail.name}</h2>
                        <div className="flag-info">
                            <div className="info-left">
                                <p><b>Native Name : </b>{detail.nativeName}</p>
                                <p><b>Population : </b>{detail.population}</p>
                                <p><b>Region : </b>{detail.region}</p>
                                <p><b>Sub Region : </b>{detail.subregion}</p>
                                <p><b>Capital : </b>{detail.capital}</p>

                            </div>
                            <div className="info-right">
                                <p><b>Top Level Domain : </b>{detail.topLevelDomain[0]}</p>
                                <p><b>Currencies : </b>{detail.currencies[0].name}</p>
                                <p><b>Languages : </b>{this.state.languages}</p>
                            </div>
                        </div>
                        <div className="borders">
                            <div className="borders-left">
                                <p><b>Border Countries : </b></p>
                            </div>
                            <div className="borders-right">
                                {this.state.borderName.map(name=>{
                                return <button key={name} style={{border:'1px solid #D3D3D3'}} type="button" className="btn btn-light border-button" onClick={()=>this.changeDetails(name)}>{name}</button>
                                })}                                
                            </div>
                        </div>
                    </div>
                </div> 
                    )
                })}
                
            </section>
         );
    }
}
 
export default Details;
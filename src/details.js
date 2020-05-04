import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Input, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './App.css'
const axios = require('axios');

class Details extends Component {
    state = { 
        countryName: this.props.match.params.name,
        data:[],
        languages:[]
     }
    
    goBack = () =>{
        this.props.history.push(`/`);
    }
    componentDidMount = () =>{
        axios({
            method: 'get',
            url: `https://restcountries.eu/rest/v2/name/${this.state.countryName}?fullText=true`
          })
            .then(response=> {
                this.setState({data:response.data})
                let array=[]
                this.state.data[0].languages.map(l=>array.push(l.name))
                array=array.toString()
                this.setState({languages:array})
            })
            .catch(error=>{
                console.log(error)
            })

           
    }
    render() { 
        return ( 
            <section className="details">
                <button style={{border:'1px solid #D3D3D3'}} type="button" class="btn btn-light" onClick={this.goBack}>Back</button>

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
                    </div>
                </div> 
                    )
                })}
                
            </section>
         );
    }
}
 
export default Details;
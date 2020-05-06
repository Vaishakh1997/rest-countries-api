import React, { Component } from 'react';

class Header extends Component {
    state = {}
    
    modeChange = () => {
        localStorage.setItem('mode', document.getElementById('mode').innerHTML);
        var color1, color2, color3
        if(localStorage.getItem('mode') === 'Dark Mode')
        {
            document.getElementById('mode').innerHTML = 'Light Mode'
            color1 = '#2b3743'
            color2 = '#212e37'
            color3 = 'white'
            if(document.getElementById('details'))
                document.getElementById('details').style.backgroundColor = color2
        }
        else
        {
            document.getElementById('mode').innerHTML = 'Dark Mode'
            color1 = '#ffffff'
            color2 = '#fafafa'
            color3 = 'black'
            if(document.getElementById('details'))
                document.getElementById('details').style.backgroundColor = color1
        }
        document.getElementById('header').style.backgroundColor = color1
        document.getElementById('header').style.color = color3

        if(document.getElementById('home')){
            document.getElementById('home').style.backgroundColor = color2
            document.getElementById('home').style.color = color3
            var countryDetails = document.getElementsByClassName('country-details')
            for (var i = 0; i < countryDetails.length; i++) {
                countryDetails[i].style.backgroundColor = color1
        }
        }
        if(document.getElementById('details')){
            document.getElementById('details').style.color = color3
            document.getElementById('back-button').style.backgroundColor = color1
            document.getElementById('back-button').style.color = color3
            var borderButton = document.getElementsByClassName('border-button')
            for (var i = 0; i < borderButton.length; i++) {
                borderButton[i].style.backgroundColor = color1
                borderButton[i].style.color = color3
                console.log("2")
            }
        }

    }
    
    render() {
        return (
            <header className="header" id="header">
                <h1>Where in the world?</h1>
                <div className="dark">
                    <img className="image" src="https://cdn3.iconfinder.com/data/icons/minimal-browser-kit-2/32/night-mode-512.png" alt="1"></img>
                    <h5 id="mode" onClick={this.modeChange}>Dark Mode</h5>
                </div>
            </header>
        );
    }
}

export default Header;
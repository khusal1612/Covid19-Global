import React, { Component } from 'react';
import { Cards, Charts, Country } from './components';
import {fetchData} from './API/index';
import coronaimage from './Images/corona.png';
import "./App.css";

class App extends Component {
    state = {
      data: {},
      country: '',
    }
  

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({data: fetchedData});
  }


  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });
  }

  render(){
    const { data, country } = this.state;

    return(
      <div className="container">
        <img className="image" alt="COVID-19" src={coronaimage} />
        <Cards data={data}/>
        <Country handleCountryChange = {this.handleCountryChange} />
        <Charts data={data} country={country}/>
      </div>
    )
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import { Cards, Charts, Country } from './components';
import {fetchData} from './API/index';

class App extends Component {
    state = {
      data: {},
      counrty: '',
    }
  

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({data: fetchedData});
  }
  handleCountryChange = async (country) => {
    console.log(country);
    
  }

  render(){
    const { data } = this.state;

    return(
      <div className="container">
        <Cards data={data}/>
        <Country handleCountryChange = {this.handleCountryChange} />
        <Charts />
      </div>
    )
  }
}

export default App;

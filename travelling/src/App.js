import React, { Component } from 'react';
import AllTravels from './Components/AllTravels'
import AddTravel from './Components/AddTravel'
import SearchTravel from './Components/SearchTravel'
import logo from './logo2.svg';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      url: 'http://localhost:8080/travelling/api/',
      travels: [],
      newSearch: null
    };
    this.getTravels();
  }

  updateTravelTable(travelList) {
      this.setState({travels: travelList});
    }

    async getTravels(){
      await fetch(this.state.url + 'travels')
       .then((res) => res.json())
       .then((travels) => {
            var state = this.state;
            travels.travels.forEach((travel) => {
                state.travels.push(travel);
            });
            this.setState(state);
          })
      }

      async handleSearchTravel(employee, startingLocation, endingLocation, date) {
        if(startingLocation != "" && startingLocation === endingLocation){
            alert("Please select a different destination. It can not be the same as the departure.");
        }
        else{
          var postBody = JSON.stringify({
            employee: {name: employee},
            startingLocation: {name: startingLocation},
            endingLocation: {name: endingLocation},
            date: date
          });

          await fetch(this.state.url + 'travels' + '/search', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: postBody
          }).then((response) => {
            return response.json();
          }).then((responsejson) => {
              console.log(responsejson);
              var state = this.state;
              state.travels = responsejson.travels;
              state.newSearch = <AllTravels travels={responsejson.travels}/>
              this.setState(state);
          })
          .catch((error) => {
              console.log(error)

          })
        }
      }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h3>Welcome to Travelling</h3>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
          <div className="App-intro">
            <div className="AddTravelComponent">
              <div>
                <AddTravel updateTravels={this.updateTravelTable.bind(this)}/>
              </div>
              <hr></hr>
              <div>
                <SearchTravel handleSearchTravel={this.handleSearchTravel.bind(this)} />
              </div>
            </div>
            <div className="AllTravelsComponent">
              {this.state.newSearch == null ? <AllTravels travels={this.state.travels} />:  <AllTravels travels={this.state.travels} />}
            </div >
        </div>
     </div>
    );
  }
}

export default App;

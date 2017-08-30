import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class SearchTravel extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      url: 'http://localhost:8080/travelling/api/',
      employees: [],
      offices: [],

      employee: '',
      startingLocation: '',
      endingLocation: '',
      date: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearchTravel = this.handleSearchTravel.bind(this);
  }

  async componentDidMount(){
    await fetch(this.state.url + 'employees')
     .then((res) => res.json())
     .then((employees) => {
          var state = this.state;
          employees.employees.forEach((employee) => {
              state.employees.push(employee);
          });
          this.setState(state);
        })

    await fetch(this.state.url + 'offices')
     .then((res) => res.json())
     .then((offices) => {
          var state = this.state;
          offices.offices.forEach((office) => {
              state.offices.push(office);
          });
          this.setState(state);
        })

    }

    handleChange(event) {
       this.state[event.target.id] = event.target.value;
    }

    handleSearchTravel() {
      this.props.handleSearchTravel(this.state.employee, this.state.startingLocation, this.state.endingLocation, this.state.date);
    }

  render() {
    var employeesOptions = this.state.employees.map(employee => <option key={employee.id}>{employee.name}</option>);
    var officesOptions = this.state.offices.map(office => <option key={office.id}>{office.name}</option>);
    const style = {
      margin: 11,
    };
    return (
      <div>
        <h2> Search Travel </h2>
        <MuiThemeProvider>
          <form >
            <div className="AddTravelLabels">
              <label> Employee: </label>
              <select id = 'employee' onChange = {this.handleChange}>
              <option value="" selected>No employee selected</option>
                {employeesOptions}
              </select>
            </div>
            <div className="AddTravelLabels">
              <label> Starting Office: </label>
              <select id = 'startingLocation' onChange = {this.handleChange}>
              <option value="" selected>No office selected</option>
                {officesOptions}
              </select>
            </div>
            <div className="AddTravelLabels">
              <label> Destiny Office: </label>
              <select id = 'endingLocation' onChange = {this.handleChange}>
              <option value="" selected>No office selected</option>
                {officesOptions}
              </select>
            </div>
            <div className="AddTravelLabels">
              Travel Date:  <input id = "date" type="date" onChange = {this.handleChange}/>
            </div>
            <br/>
              <RaisedButton label="Search" primary={true} style={style} onClick={this.handleSearchTravel.bind(this)}/>
              <RaisedButton label="All Travels" secondary={true} style={style} type="submit" />
          </form>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default SearchTravel;

SearchTravel.propTypes = {
    updateTravels: PropTypes.func.isRequired,
};

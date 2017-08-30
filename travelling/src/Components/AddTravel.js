import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class AddTravel extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      url: 'http://localhost:8080/travelling/api/',
      employees: [],
      offices: [],

      employee: '',
      startingLocation: '',
      endingLocation: '',
      date: '',
      today: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCreateTravel = this.handleCreateTravel.bind(this);
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

          this.setState({employee: this.state.employees[0].name});

          this.setState({today: moment().format('YYYY-MM-DD')})

    }

      handleChange(event) {
         this.state[event.target.id] = event.target.value;
      }

      async handleCreateTravel() {
        var today = new Date();
        var postBody = JSON.stringify({
          employee: {name: this.state.employee},
          startingLocation: {name: this.state.startingLocation},
          endingLocation: {name: this.state.endingLocation},
          date: this.state.date
        });

        if(this.state.startingLocation === this.state.endingLocation){
            alert("Please select a different destination. It can not be the same as the departure.");
        }
        else{
          await fetch(this.state.url + 'travels', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: postBody
          })
        }
      }

  render() {
    var employeesOptions = this.state.employees.map(employee => <option key={employee.id}>{employee.name}</option>);
    var officesOptions = this.state.offices.map(office => <option key={office.id}>{office.name}</option>);
    const style = {
      margin: 11,
    };
    return (
      <div>
        <h2> Add Travel </h2>
        <MuiThemeProvider>
          <form onSubmit={this.handleCreateTravel}>
            <div className="AddTravelLabels">
              <label> Employee: </label>
              <select id = 'employee' onChange = {this.handleChange}>
                {employeesOptions}
              </select>
            </div>
            <div className="AddTravelLabels">
              <label> Starting Office: </label>
              <select id = 'startingLocation' onChange = {this.handleChange}>
              <option value="" selected disabled hidden>Choose Office</option>
                {officesOptions}
              </select>
            </div>
            <div className="AddTravelLabels">
              <label> Destiny Office: </label>
              <select id = 'endingLocation' onChange = {this.handleChange}>
              <option value="" selected disabled hidden>Choose Office</option>
                {officesOptions}
              </select>
            </div>
            <div className="AddTravelLabels">
              Travel Date:  <input id = "date" type="date" onChange = {this.handleChange} min = {this.state.today}/>
            </div>
            <br/>
              <RaisedButton label="Create Travel" default={true} style={style} type="submit" />
          </form>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default AddTravel;

AddTravel.propTypes = {
    updateTravels: PropTypes.func.isRequired,
};

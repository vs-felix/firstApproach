import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class AllTravels extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      travels: this.props.travels,
      travel: '',
      date: ''
    };
  }

  printReturnDate(date){
    if(date === null) {
      return 'Not defined';
    }
    else {
      return moment(date).format("DD MMM YYYY");
    }
  }

  render() {
    return (
      <div>
        <h2> List of Travels: </h2>
        <MuiThemeProvider>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>Employee Name</TableHeaderColumn>
                <TableHeaderColumn>Employee Contact</TableHeaderColumn>
        		    <TableHeaderColumn>Departure Office</TableHeaderColumn>
                <TableHeaderColumn>Destiny Office</TableHeaderColumn>
        		    <TableHeaderColumn>Date</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              { this.props.travels.map (travel =>
              <TableRow key={travel.id}>
                <TableRowColumn>{travel.employee.name}</TableRowColumn>
                <TableRowColumn>{travel.employee.contact}</TableRowColumn>
                <TableRowColumn>{travel.startingLocation.name}</TableRowColumn>
                <TableRowColumn>{travel.endingLocation.name}</TableRowColumn>
                <TableRowColumn>{this.printReturnDate(travel.date)}</TableRowColumn>
              </TableRow>
              )}
            </TableBody>
          </Table>
        </MuiThemeProvider>
      </div>
    );
  }
}
export default AllTravels;

AllTravels.propTypes = {
    travels: PropTypes.array.isRequired,
};

// import React from 'react';
// import DayPicker from 'react-day-picker';
// import ReactDOM from 'react-dom';

// export default function SimpleCalendar() {
//   return <DayPicker onDayClick={day => 

//     console.log(JSON.stringify(day).split(' '))} />;
// }

import React from 'react';
import moment from 'moment';
import DayPicker, { DateUtils } from 'react-day-picker';

// import 'react-day-picker/lib/style.css';

 class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      from: null,
      to: null,
    };

    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    
  }

  handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  };

  handleResetClick(e) {
    e.preventDefault();
    this.setState({
      from: null,
      to: null,
    });
  };

  render() {
    const { from, to } = this.state;
    return (
      <div className="RangeExample">
        {!from && !to && <p>Please select the <strong>first day</strong>.</p>}
        {from && !to && <p>Please select the <strong>last day</strong>.</p>}
        {from &&
          to &&
          <p>
            You chose from
            {' '}
            {moment(from).format('L')}
            {' '}
            to
            {' '}
            {moment(to).format('L')}
            .
            {' '}<a href="." onClick={this.handleResetClick}>Reset</a>
          </p>}
        <DayPicker
          numberOfMonths={2}
          selectedDays={[from, { from, to }]}
          onDayClick={this.handleDayClick}
        />
      </div>
    );
  }
}

export default Calendar;
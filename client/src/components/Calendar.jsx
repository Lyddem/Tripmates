  // import React from 'react';
// import DayPicker from 'react-day-picker';
// import ReactDOM from 'react-dom';

// export default function SimpleCalendar() {
//   return <DayPicker onDayClick={day => 

//     console.log(JSON.stringify(day).split(' '))} />;
// }

import React from 'react';
import moment from 'moment';
import axios from 'axios';

import DayPicker, { DateUtils } from 'react-day-picker';

// import 'react-day-picker/lib/style.css';

 class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      from: null,
      to: null,
      date: '',
      dates: []
    };

    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.dateSubmit = this.dateSubmit.bind(this);
    
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

 // onDateSubmission (e) {
 //    e.preventDefault();
 //    var arr = this.state.dates;
 //    arr.push(this.state.date);
 //    this.setState({dates: arr});
 //  }
 

  dateSubmit(e){
    e.preventDefault();
   
    //set this.date to selcted date range
    this.setState({date: moment(this.state.from).format('ll') + ' - ' + moment(this.state.to).format('LL')})
    console.log('date after first date is pushed into dates array', this.state.date);
    
    //push date into this.state.dates
    // var arr = this.state.dates;
    // arr.push(this.state.date);
    // this.setState({dates: arr});
    this.state.dates.push(this.state.date);

    console.log('dates', this.state.dates);
    //post to db
    axios.post('/submitDate', { dates: this.state.dates})
      .then((response) => {
        console.log('response from server', response);
        console.log('Successfully posted dates array to DB')
        this.props.history.push('/profile')
      })
      .catch((error) => {
        console.log('Error posting trip to DB', error)
        })

  }

  render() {
    const { from, to } = this.state;
    return (
      <div className="RangeExample">
        {!from && !to && <p>Please select the <strong>first day</strong>.</p>}
        {from && !to && <p>Please select the <strong>last day</strong>.</p>}
        {from &&
          to &&
          <p>
            <a href="." onClick={this.handleResetClick}>Reset</a>

          </p>} 
           {
            // var datesArr = this.state.dates.slice(1,this.state.dates.length); 
            this.state.dates.map((date,index) => {
                return(<div key={index}><li className="dateItem">{date}</li> </div>)
              })
          }
           
        <DayPicker
          numberOfMonths={2}
          selectedDays={[from, { from, to }]}
          onDayClick={this.handleDayClick}
        /> <button type ="submit" id="dateSubmit" onClick={this.dateSubmit}>Submit</button> 
      </div>
    );
  }
}

export default Calendar;
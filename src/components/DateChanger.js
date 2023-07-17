import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import '../stylesheets/DateChanger.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faArrowRightLong} from '@fortawesome/free-solid-svg-icons';

const DateChanger = (props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (event) => {
    const dateString = event.target.value;
    const dateArray = dateString.split('-');
    const newDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
    setSelectedDate(newDate);
    props.dispatchDate({ type: 'update', payload: newDate });
  };
  
  // const currentDateText = format(selectedDate, 'dd-MM-yyyy');

  const handleBackClick = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
    props.dispatchDate({ type: 'update', payload: newDate });
  };

  const handleForwardClick = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
    props.dispatchDate({ type: 'update', payload: newDate });
  };

  return (
    <div className="datechanger-container" style={{display: "flex", alignItems: 'center', justifyContent: 'center', paddingTop: '30px' }}>
      <button className="calendar-arr-back" onClick={handleBackClick} >
        <FontAwesomeIcon icon={faArrowLeftLong} style={{color: "#f1b6ac",fontSize: "30px"}} />
      </button>
      <div style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center'}}>
        <h1 className="current-date" style={{ textAlign: 'center'}}>{props.date}</h1>
        <input type="date" id="datechanger-date" onChange={handleDateChange} style={{ opacity: 0.6, textAlign: "center", justifyContent: "center", alignItems: "center", padding: 0 }} />
      </div>
      <button className="calendar-arr-fw" onClick={handleForwardClick}>
        <FontAwesomeIcon icon={faArrowRightLong} style={{color: "#f1b6ac",fontSize: "30px"}}/>
      </button>
    </div>
  );
};

export default DateChanger;
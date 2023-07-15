import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, addDays, subDays } from 'date-fns';
import '../stylesheets/DateChanger.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const DateChanger = (props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    props.dispatchDate({ type: 'update', payload: date });
  };

  const currentDateText = format(selectedDate, 'dd-MM-yyyy');

  const handleBackClick = () => {
    const newDate = subDays(selectedDate, 1);
    setSelectedDate(newDate);
    props.dispatchDate({ type: 'update', payload: newDate });
  };

  const handleForwardClick = () => {
    const newDate = addDays(selectedDate, 1);
    setSelectedDate(newDate);
    props.dispatchDate({ type: 'update', payload: newDate });
  };

  return (
    <div className="datechanger-container">
      <button className="arrow-button" onClick={handleBackClick}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <h1 className="current-date" style={{ textAlign: 'center', paddingTop: '30px' }}>{currentDateText}</h1>
      <button className="arrow-button" onClick={handleForwardClick}>
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
      <div className="datepicker-wrapper" style={{ textAlign: 'center' }}>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          placeholderText="dd/mm/yyyy"
        />
      </div>
    </div>
  );
};

export default DateChanger;
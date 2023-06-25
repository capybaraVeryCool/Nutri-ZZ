import React from 'react';
<<<<<<< HEAD
=======
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
>>>>>>> 7f5d0222a07d47dd726706267429f10b4feb0343
// import styled from 'styled-components'

const DateChanger = (props) => {

  const changeDate = (event) => {
    const newDate = new Date(event.currentTarget.value);
    newDate.setDate(newDate.getDate() + 1);
    props.dispatchDate({type: 'update', payload: newDate});
  }

  return (
    <div  className="datechanger">
<<<<<<< HEAD
      <button onClick={() => props.dispatchDate({type: 'decrement'})}>⬅</button>
      <div>
        <h1>{props.date}</h1>
        <input type="date" id="datechanger-date" onChange={changeDate}/>
      </div>
      <button  onClick={() => props.dispatchDate({type: 'increment'})}>➡</button>
=======
      <button onClick={() => props.dispatchDate({type: 'decrement'})}>
        <FontAwesomeIcon icon={faArrowLeft} style={{color: "#f1b6ac",fontSize: "40px"}} />
      </button>
      <div style={{justifyContent: "center", alignItems: "center"}}>
        <h1 style={{opacity: 0.6}}>{props.date}</h1>
        <div style={{justifyContent: "center", alignItems: "center", display: "flex"}}>
          <input type="date" id="datechanger-date" onChange={changeDate} style={{opacity: 0.6, textAlign: "center",justifyContent: "center", alignItems: "center", display: "flex", padding: 0}}/>
        </div>
      </div>
      <button onClick={() => props.dispatchDate({type: 'increment'})}>
        <FontAwesomeIcon icon={faArrowRight} style={{color: "#f1b6ac",fontSize: "40px"}} />
      </button>
>>>>>>> 7f5d0222a07d47dd726706267429f10b4feb0343
    </div>
  );
}

export default DateChanger;
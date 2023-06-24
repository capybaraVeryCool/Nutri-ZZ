import React from 'react';
// import styled from 'styled-components'

const DateChanger = (props) => {

  const changeDate = (event) => {
    const newDate = new Date(event.currentTarget.value);
    newDate.setDate(newDate.getDate() + 1);
    props.dispatchDate({type: 'update', payload: newDate});
  }

  return (
    <div  className="datechanger">
      <button style={{width: "50px"}} onClick={() => props.dispatchDate({type: 'decrement'})}>⬅</button>
      <div style={{justifyContent: "center", alignItems: "center"}}>
        <h1 style={{opacity: 0.6}}>{props.date}</h1>
        <div style={{justifyContent: "center", alignItems: "center", display: "flex"}}>
          <input type="date" id="datechanger-date" onChange={changeDate} style={{opacity: 0.6, textAlign: "center",justifyContent: "center", alignItems: "center", display: "flex", padding: 0}}/>
        </div>
      </div>
      <button style={{width: "50px"}} onClick={() => props.dispatchDate({type: 'increment'})}>➡</button>
    </div>
  );
}

export default DateChanger;
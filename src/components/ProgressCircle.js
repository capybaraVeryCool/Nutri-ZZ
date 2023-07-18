import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../stylesheets/ProgressCircle.css'


const ProgressCircle = (props) => {

  const fontSize2 = {
    fontSize: `${Math.round(Number(props.circleSize)/8)}px`
  }
  const fontSize3 = {
    fontSize: `${Math.round(Number(props.circleSize)/12)}px`
  }

  return (
    <div  className="progresscircle">
      {/* <CircularProgress variant="determinate" value={props.progress} size={`${props.circleSize}px`} color="inherit" thickness={1.8} style={{borderRadius:"100%", boxShadow:'inset 0px 0px 0px ${props.thickness * 6}px rgba(0, 0, 0, 0.1)'}}/> */}
      <CircularProgress
      variant="determinate"
      value={props.progress}
      size={`${props.circleSize}px`}
      color="inherit"
      thickness={props.circleThickness}
      style={{borderRadius: "100%", boxShadow: "inset 0px 0px 0px 0.78em rgba(0, 0, 0, 0.1)"}}
/>
      <div  className="progresscircle-text">
        <h2 style={fontSize2}>{props.calories}</h2>
        <h3  style={fontSize3}>{props.message}</h3>
      </div>
    </div>
  );
}

export default ProgressCircle;
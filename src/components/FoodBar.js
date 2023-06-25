import React from 'react';
import '../stylesheets/FoodBar.css';
import {capitalize} from "../functions/helperFunctions";
import {Link} from "react-router-dom";

const FoodBar = (props) => {

  const getNumId = (id) => {
    const arr = id.split('-');
    return arr[1];
  }

  return (
<<<<<<< HEAD
    <div  className="foodbar">
      <Link to={`/meal/${props.meal}/search/${getNumId(props.id)}`}>
      <div className="foodbar-left">
        {
          props.imgSrc ? <img src={props.imgSrc} alt={props.title} /> : null
        }
        <div className="foodbar-text">
          <h2>{capitalize(props.title)}</h2>
        </div>
      </div>
=======
    <div style={{margin: "10px 0px"}}>
      <Link to={`/meal/${props.meal}/search/${getNumId(props.id)}`} className="link">
        <div  className="foodbar">
          
          <div className="foodbar-left">
            {
              props.imgSrc ? <img src={props.imgSrc} alt={props.title} /> : null
            }
            <div className="foodbar-text">
              <h2>{capitalize(props.title)}</h2>
            </div>
          </div>
        </div>
>>>>>>> 7f5d0222a07d47dd726706267429f10b4feb0343
      </Link>
    </div>
  );
}

export default FoodBar;
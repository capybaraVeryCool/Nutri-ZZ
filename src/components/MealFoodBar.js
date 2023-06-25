import React from 'react';
import '../stylesheets/FoodBar.css';
import {capitalize} from "../functions/helperFunctions";
import {findNutrient, deleteFood} from '../functions/helperFunctions';
<<<<<<< HEAD
=======
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faArrowRight, faTrash, faCircle } from '@fortawesome/free-solid-svg-icons';
>>>>>>> 7f5d0222a07d47dd726706267429f10b4feb0343

const MealFoodBar = (props) => {

  const baseSrc = "https://spoonacular.com/cdn/ingredients_100x100/";

  const removeFood = () => {
    const updated = deleteFood(props.data, props.meal, props.food, props.order);
    props.update(updated);
  }

  return (
    <div  className="foodbar">
      <div className="foodbar-left">
        {
          props.food.image ? <img src={baseSrc+props.food.image} alt={props.food.name} /> : null
        }
        <div className="foodbar-text">
<<<<<<< HEAD
          <h2>{capitalize(props.food.name)}</h2>
          <h3>{findNutrient(props.food, "Calories").amount}cal  ⚫ {props.food.amount}{props.food.unit}</h3>
        </div>
      </div>
      <button onClick={() => removeFood()}>-</button>
=======
          <h2 style={{fontSize: 20}}>{capitalize(props.food.name)}</h2>
          <h3 style={{fontSize: 20}}>{findNutrient(props.food, "Calories").amount} cal <span>
            <FontAwesomeIcon icon={faCircle} style={{color: "#000000", fontSize: "10px"}} />
          </span> <span>{props.food.amount} {props.food.unit} </span></h3>
        </div>
      </div>
      <button onClick={() => removeFood()}><FontAwesomeIcon icon={faTrash} style={{color: "#f1b6ac", fontSize: "25px"}}/></button>
>>>>>>> 7f5d0222a07d47dd726706267429f10b4feb0343
    </div>
  );
}

export default MealFoodBar;

// <h3>{findNutrient(props.food, "Calories")}cal  ⚫  {props.food.quantity}{props.food.unit}</h3> 
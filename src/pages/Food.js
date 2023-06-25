import React, {useState, useEffect} from 'react';
import '../stylesheets/Food.css';
import {Link, useRouteMatch} from "react-router-dom";
import {foodFrame, dataFrame} from '../functions/constants';
import {formatDate, findNutrient, addFood} from '../functions/helperFunctions';
<<<<<<< HEAD
import {Dropdown, DropdownElement, MessageDiv , PrimaryButton, BackArrowDiv} from '../stylesheets/styledComponents';
import ProgressCircle from '../components/ProgressCircle';
import firebase from '../firebase';
=======
import {Dropdown, DropdownElement, MessageDiv , SecButton, BackArrowDiv} from '../stylesheets/styledComponents';
import ProgressCircle from '../components/ProgressCircle';
import firebase from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
>>>>>>> 7f5d0222a07d47dd726706267429f10b4feb0343

const Food = (props) => {
  const link = useRouteMatch('/meal/:id/search/:id').url.split('/');
  const foodId=link[link.length-1];
  let meal = link[link.length-3];
  //
  const [result, setResult] = useState(foodFrame);
  const [data, setData] = useState(dataFrame);
  const [amount, setAmount] = useState(1);
  const [unit, setUnit] = useState("g");
  const [macrosPer, setMacrosPer] = useState([["protein",30], ["fat",20], ["carbs", 50]]);


  // GET DATA
  useEffect(() => {
    let abortController = new AbortController();
    let aborted = abortController.signal.aborted;
    let firestore = firebase.firestore();
<<<<<<< HEAD
    const usersRef = firestore.collection('users').doc(firebase.auth()?.currentUser?.uid).collection('days').doc(formatDate(props.date))
=======
    const usersRef = firestore.collection('users').doc(firebase.auth().currentUser.uid).collection('days').doc(formatDate(props.date))
>>>>>>> 7f5d0222a07d47dd726706267429f10b4feb0343
    usersRef.get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          usersRef.onSnapshot((doc) => {
            aborted = abortController.signal.aborted;
            if (aborted!==true){
              setData(doc.data());
            }
          });
        } else {
          console.log('the doc was not found, needs to be create it');
        }
    });
    return () => {
      abortController.abort();
    }
  }, [props.date])

  // UPDATE INPUT VALUE
  useEffect(() => {
    let input = document.getElementById("page-food-amount");
    input.value = amount;
  }, [amount])

  // LISTEN FOR 'ENTER' EVENT AND UPDATE AMOUNT INPUT
  useEffect(() => {
    let input = document.getElementById("page-food-amount");
    const pressedEnter = (event) => {
      if (event.keyCode === 13) {
        event.preventDefault();
        setAmount(input.value);
      }
    }
    input.addEventListener("keyup", pressedEnter);
    return () => {
      return input.removeEventListener("keyup", pressedEnter);
    };
  }, []);

  // COLLECT RESULT FROM API
  useEffect(() => {
    let abortController = new AbortController();
    let aborted = abortController.signal.aborted;
    async function fetchResults() {
      let response = await fetch(`https://api.spoonacular.com/food/ingredients/${foodId}/information?apiKey=${"298395fc508d46c8accf3b43c528a9e2"}&amount=${amount}&unit=${unit}`);
      let myData = await response.json();
      aborted = abortController.signal.aborted;
      if (aborted === false){
        setResult(myData);
      }      
    }
    fetchResults();
    
    return () => {abortController.abort();};
  }, [amount, unit, foodId]);


  // UPDATE VARIABLES ON RESULT CHANGE
  useEffect(() => {
    const myMacros = result.nutrition.caloricBreakdown;
    setMacrosPer([["protein",myMacros.percentProtein], ["fat",myMacros.percentFat], ["carbs", myMacros.percentCarbs]]);
  }, [result])


  // TRACK FOOD
  const trackFood = () => {
    const updated = addFood(data, meal, result);
    var db = firebase.firestore();
<<<<<<< HEAD
    db.collection('users').doc(firebase.auth()?.currentUser?.uid).collection('days').doc(formatDate(props.date)).update(updated)
=======
    db.collection('users').doc(firebase.auth().currentUser.uid).collection('days').doc(formatDate(props.date)).update(updated)
>>>>>>> 7f5d0222a07d47dd726706267429f10b4feb0343
  }



  return (
    <div  className="page-food">
      <div className="page-food-top">
        <h2>{result.name}</h2>
      </div>

      <div className="page-food-section">
        <div className="page-food-inputs">
          <MessageDiv>
            <h2 className="component-message">Press Enter to Submit</h2>
            <input type="number" min="1" id="page-food-amount"/>
          </MessageDiv>
<<<<<<< HEAD
          <Dropdown fontSize="55px">
            <button className="dropdown-btn">{unit} ⏷</button>
            <div className="dropdown-content">
              {
                result.possibleUnits?.map((unit) => {
=======
          <Dropdown fontSize="20px">
            <button className="dropdown-btn">{unit} ⏷</button>
            <div className="dropdown-content">
              {
                result.possibleUnits.map((unit) => {
>>>>>>> 7f5d0222a07d47dd726706267429f10b4feb0343
                  return <DropdownElement key={unit} onClick={() => setUnit(unit)}> {unit}</DropdownElement>
                })
              }
            </div>
          </Dropdown>
        </div>
        <div>
<<<<<<< HEAD
          <h2>{findNutrient(result,"Calories").amount} cals</h2>
=======
          <h2 style={{fontSize:"20px"}}>{findNutrient(result,"Calories").amount} cals</h2>
>>>>>>> 7f5d0222a07d47dd726706267429f10b4feb0343
        </div>
      </div>

      <div className="page-food-section">
        <h3>Nutritional Information</h3>
        <div className="page-food-macros">
          {
<<<<<<< HEAD
            macrosPer?.map((macro) => {
              return <ProgressCircle key={macro[0]} progress={Number(macro[1])} circleSize="250" calories={`${macro[1]}%`} message={macro[0]}/>
=======
            macrosPer.map((macro) => {
              return <ProgressCircle key={macro[0]} progress={Number(macro[1])} circleSize="150" calories={`${macro[1]}%`} message={macro[0]}/>
>>>>>>> 7f5d0222a07d47dd726706267429f10b4feb0343
            })
          }
        </div>
        <div className="page-food-nutrients">
          {
<<<<<<< HEAD
            result.nutrition.nutrients?.map((nutrient) => {
              return <div className="page-food-nutrient" key={nutrient.name} >
                <div className="page-food-nutrient-top">
                  <h4 className="page-food-nutrient-top-text">{nutrient.name}</h4>
                  <h4 className="page-food-nutrient-top-text">{nutrient.amount + nutrient.unit}</h4>
                </div>
                <div>
                  <h4 className="page-food-nutrient-percent">{nutrient.percentOfDailyNeeds}% of Daily Needs</h4>
=======
            result.nutrition.nutrients.map((nutrient) => {
              return <div className="page-food-nutrient" key={nutrient.name} >
                <div className="page-food-nutrient-top">
                  <h4 className="page-food-nutrient-top-text" style={{fontSize:"15px"}}>{nutrient.name}</h4>
                  <h4 className="page-food-nutrient-top-text" style={{fontSize:"15px"}}>{nutrient.amount + nutrient.unit}</h4>
                </div>
                <div>
                  <h4 className="page-food-nutrient-percent" style={{fontSize:"15px"}}>{nutrient.percentOfDailyNeeds}% of Daily Needs</h4>
>>>>>>> 7f5d0222a07d47dd726706267429f10b4feb0343
                </div>
              </div>
            })
          }
        </div>
      </div>

      <div className="page-food-trackDiv">
<<<<<<< HEAD
        <Link to={`/meal/${meal}`}>
          <PrimaryButton onClick={trackFood}>Track Food</PrimaryButton>
=======
        <Link to={`/meal/${meal}`} className="link">
          <SecButton width="50%" onClick={trackFood}>Track Food</SecButton>
>>>>>>> 7f5d0222a07d47dd726706267429f10b4feb0343
        </Link>
      </div>

      <BackArrowDiv>
        <Link to={`/meal/${meal}/search`}>
<<<<<<< HEAD
          <h2>⬅</h2>
=======
          <FontAwesomeIcon icon={faArrowLeftLong} style={{color: "#f1b6ac",fontSize: "30px"}} />
>>>>>>> 7f5d0222a07d47dd726706267429f10b4feb0343
        </Link>
      </BackArrowDiv>
    </div>
  );
}

export default Food;
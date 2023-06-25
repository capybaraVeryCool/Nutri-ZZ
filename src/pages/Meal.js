import React, {useState, useEffect} from 'react';
import '../stylesheets/Meal.css'
import { useRouteMatch, Link } from "react-router-dom";
import {formatDate} from '../functions/helperFunctions';
import ProgressCircle from '../components/ProgressCircle';
import firebase from '../firebase';
import {dataFrame} from '../functions/constants';
import DataList from '../components/DataList.js';
import {PrimaryButton, BackArrowDiv} from '../stylesheets/styledComponents';
import MealFoodBar from '../components/MealFoodBar';
<<<<<<< HEAD
=======
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
>>>>>>> 7f5d0222a07d47dd726706267429f10b4feb0343

const Meal = (props) => {
  let meal = useRouteMatch('/meal/:id').url.split('/');
  meal=meal[meal.length-1];
  // TODO: Listen to firestore change, update props
  const goalCal = Math.round((props.config.goalCal)/3);
  const [data, setData] = useState(dataFrame.meals[meal]);
  const [progressColor, setProgressColor] = useState({color: "white"});
  const [progress, setProgress] = useState(0);
<<<<<<< HEAD
  const [isSigned, setIsSigned] = useState(!!firebase.auth()?.currentUser);
=======
  const [isSigned, setIsSigned] = useState(!!firebase.auth().currentUser);
>>>>>>> 7f5d0222a07d47dd726706267429f10b4feb0343
  const [allData, setAllData] = useState(dataFrame);

  useEffect(() => {
    // NOTE: instead of useEffect maybe listen for firestore at doc changes
    let abortController = new AbortController();
    let aborted = abortController.signal.aborted;
    let firestore = firebase.firestore();
<<<<<<< HEAD
    if (firebase.auth()?.currentUser && aborted!==true){
      firestore.collection("users").doc(firebase.auth()?.currentUser?.uid).collection('days').doc(formatDate(props.date)).get().then((myDoc) => {
=======
    if (firebase.auth().currentUser && aborted!==true){
      firestore.collection("users").doc(firebase.auth().currentUser.uid).collection('days').doc(formatDate(props.date)).get().then((myDoc) => {
>>>>>>> 7f5d0222a07d47dd726706267429f10b4feb0343
        aborted = abortController.signal.aborted;
        if (aborted!==true){
          setData(myDoc.data().meals[meal]);
          setAllData(myDoc.data());
        }
      }).catch(function (error) {
        console.error("Error in Meal: ", error);
      })
    } else {
      console.log('not logged in cannot update meal');
    }
    return () => {
      abortController.abort();
    }
  }, [props.date, meal, isSigned]);

  firebase.auth().onAuthStateChanged(() => {
<<<<<<< HEAD
    setIsSigned(!!firebase.auth()?.currentUser);
=======
    setIsSigned(!!firebase.auth().currentUser);
>>>>>>> 7f5d0222a07d47dd726706267429f10b4feb0343
  });


  useEffect(() => {
    let calc = Math.round((data.sumCal/goalCal)*100);
    if (calc>100){
      calc = calc % 100;
<<<<<<< HEAD
      setProgressColor({color: "rgb(245, 235, 146)"})
=======
      setProgressColor({color: "#588061"})
>>>>>>> 7f5d0222a07d47dd726706267429f10b4feb0343
    } else {
      setProgressColor({color: "white"})
    }
    if (calc>200){
      calc= 100;
<<<<<<< HEAD
      setProgressColor({color: "rgb(245, 235, 146)"})
=======
      setProgressColor({color: "#588061"})
>>>>>>> 7f5d0222a07d47dd726706267429f10b4feb0343
    }
    setProgress(calc);
  }, [data, goalCal])


  const updatedFullData = (updatedFullData) => {
    var db = firebase.firestore();
<<<<<<< HEAD
    db.collection('users').doc(firebase.auth()?.currentUser?.uid).collection('days').doc(formatDate(props.date)).update(updatedFullData);
=======
    db.collection('users').doc(firebase.auth().currentUser.uid).collection('days').doc(formatDate(props.date)).update(updatedFullData);
>>>>>>> 7f5d0222a07d47dd726706267429f10b4feb0343
    props.dispatchDate({type: 'reload'});
  }


  return (
<<<<<<< HEAD
    <div  className="page-meal">
      <div className="page-meal-top">
        <div className="page-meal-progress" style={progressColor}>
          <ProgressCircle  progress={progress} circleSize="400" calories={data.sumCal} message={"calories eaten"}/>
        </div>
        <h2>{meal}</h2>
        <h3>{formatDate(props.date)}</h3>
      </div>
      <Link to={`${meal}/search`} className="page-meal-search-link">
        <PrimaryButton width="60%">Add Food</PrimaryButton>
      </Link>
      <div className="page-meal-foodlist">
        {
          data.foods?.map((food, count) => {
            return <MealFoodBar food={food} key={count} order={count} data={allData} meal={meal} update={updatedFullData} />
          })
        }
      </div>
      <div className="page-meal-datalist">
=======
    <div style={{display:"flex"}}>
      <div  className="page-meal">
        <div className="page-meal-top">
          <h2>{meal}</h2>
          <h3>{formatDate(props.date)}</h3>
          <div className="page-meal-progress" style={progressColor}>
            <ProgressCircle  progress={progress} circleSize="250" calories={data.sumCal} message={"calories eaten"}/>
          </div>
        </div>
        <Link to={`${meal}/search`} className="page-meal-search-link link">
          <PrimaryButton width="20%">Add Food</PrimaryButton>
        </Link>
        <div className="page-meal-foodlist">
          {
            data.foods.map((food, count) => {
              return <MealFoodBar food={food} key={count} order={count} data={allData} meal={meal} update={updatedFullData} />
            })
          }
        </div>
      </div>
      <div className="meal-nutri-container" style={{border: "black", margin: "5px", backgroundColor:"ffddd6"}}>
>>>>>>> 7f5d0222a07d47dd726706267429f10b4feb0343
        <DataList data={data} goal={goalCal}/>
      </div>

      <BackArrowDiv>
        <Link to="/">
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

export default Meal;

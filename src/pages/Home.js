import React, {useState, useEffect} from 'react';
import DataBar from '../components/DataBar';
import DateChanger from '../components/DateChanger';
import MealBar from '../components/MealBar';
import SignIn from './SignIn'
import '../stylesheets/Home.css';
import firebase from '../firebase';
import {formatDate} from '../functions/helperFunctions';
import {dataFrame} from '../functions/constants';
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';

const Home = (props) => {
  // TODO: Listen to firestore change, update props
  // VARIABLES
  const meals = ["breakfast", "lunch", "dinner", "snacks"];
  const [date, setDate] = useState(formatDate(new Date())); // xx-xx-xx
  const [isSigned, setIsSigned] = useState(!!firebase.auth()?.currentUser);
  const [data, setData] = useState(dataFrame); // FIX: also update on any updates to Doc

  useEffect(() => {
    let abortController = new AbortController();
    let aborted = abortController.signal.aborted;
    if (aborted === false){
      setDate(formatDate(props.date));
    }
    return () => {
      abortController.abort();
    };
  }, [props.date])



  // SET SIGNED STATUS
  firebase.auth().onAuthStateChanged(() => {
    setIsSigned(!!firebase.auth()?.currentUser);
  });
  const setSigned = (ans) => {
    setIsSigned(ans);
  }

  // SET DATABASE
  useEffect (() => {
    let abortController = new AbortController();
    let aborted = abortController.signal.aborted;
    if (isSigned===true ){
      let firestore = firebase.firestore();
      const usersRef = firestore.collection('users').doc(firebase.auth()?.currentUser?.uid).collection('days').doc(date)
      usersRef.get()
        .then((docSnapshot) => {
            if (docSnapshot.exists) {
              usersRef.onSnapshot((doc) => {
                aborted = abortController.signal.aborted;
                if (aborted===false){
                  setData(doc.data());
                }
              });
            } else {
              // console.log('the doc was not found, creating it');
              usersRef.set(dataFrame); // Created Doc
              aborted = abortController.signal.aborted;
              if (aborted===false){
                setData(dataFrame);
              }
            }
      });
    }
    return () => {
      abortController.abort();
    };
  }, [isSigned, date]);





  if (isSigned){
    return (
      <div className="page-home">
        <div className="page-home-top">
          <button style={{position: "absolute", top:"15px", left: "15px", border: "none", borderRadius: "10px", backgroundColor:"#ffddd6", fontSize: 20, color: "rgba(0, 0, 0, 0.5)"}} onClick={() => {firebase.auth().signOut()}}>Sign Out</button>
          <DataBar date={date} data={data} config={props.config}/>
        </div>
        
        <DateChanger date={date} dispatchDate={props.dispatchDate}/>
        
        <div className="page-home-mealbars">
          {/* {meals.map((meal) => <MealBar meal={meal} totalCal={data.meals[meal].sumCal} key={meal}/>)} */}
          <div className="mealbar-container">
            <Row>
              <Col>
                <MealBar class="left" meal={meals[0]} totalCal={data.meals[meals[0]].sumCal} />
              </Col>
              <Col/>
            </Row>
            <Row>
              <Col/>
              <Col>
                <MealBar className="right" meal={meals[1]} totalCal={data.meals[meals[1]].sumCal} />
              </Col>
            </Row>
            <Row>
              <Col>
                <MealBar class="left" meal={meals[2]} totalCal={data.meals[meals[2]].sumCal} />
              </Col>
              <Col/>
            </Row>
            <Row>
              <Col/>
              <Col>
                <MealBar className="right" meal={meals[3]} totalCal={data.meals[meals[3]].sumCal} />
              </Col>
            </Row>
          </div>
        </div>
        <div className="page-home-configure">
          <Link to="/configure">
            <button style={{fontSize: 40}}>⚙️</button>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <SignIn changeSign={setSigned}/>
    )
  }
}

export default Home;
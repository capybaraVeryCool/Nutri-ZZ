import React, {useState, useEffect} from 'react';
import {dataFrame} from '../functions/constants';
import firebase from '../firebase';
import {formatDate} from '../functions/helperFunctions';
import DataList from '../components/DataList.js';
import '../stylesheets/DataSheet.css';
import { Link } from "react-router-dom";
import {PrimaryButton, BackArrowDiv} from '../stylesheets/styledComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const DataSheet = (props) => {
  const [showDataSheet, setShowDataSheet] = useState(true);

    const toggleDataSheet = () => {
        setShowDataSheet(!showDataSheet);
    };
  
  const [goal, setGoal] = useState(1400);
  const [data, setData] = useState(dataFrame);

  useEffect(() => {
    setGoal(props.config.goalCal);
  }, [props.config])


  useEffect(() => {
    // NOTE: instead of useEffect maybe listen for firestore at doc changes
    let abortController = new AbortController();
    let aborted = abortController.signal.aborted;
    let firestore = firebase.firestore();
    if (firebase.auth().currentUser && aborted!==true){
      firestore.collection("users").doc(firebase.auth().currentUser.uid).collection('days').doc(formatDate(props.date)).get().then((myDoc) => {

        aborted = abortController.signal.aborted;
        if (aborted!==true){
          setData(myDoc.data());
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
  }, [props]);

  return (
    <div className="datasheet">
      <BackArrowDiv>
        <Link to="/" className="link">
          <FontAwesomeIcon icon={faArrowLeftLong} style={{color: "#f1b6ac",fontSize: "30px"}} />
        </Link>
      </BackArrowDiv>
      <h1 style={{marginTop: "30px", color: "black"}}>Nutritional Data</h1>
      <div className="big-datasheet-section" style={{border:"black", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      {showDataSheet ? (
        <div style={{ display: 'flex', marginLeft: "110px"}}>
          <div className="datasheet-section" style={{border:"black", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <DataList data={data} goal={goal} className="datasheet-datalist"/>
          </div>
          <div className="arrow-container">
            <button className="arrow-button" onClick={toggleDataSheet}>
              <FontAwesomeIcon icon={faArrowRight} style={{color: "black",fontSize: "40px", opacity: 0.5}} />
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', marginRight: "35px"}}>
          <div className="arrow-container">
            <button className="arrow-button" onClick={toggleDataSheet}>
              <FontAwesomeIcon icon={faArrowLeft} style={{color: "black",fontSize: "40px", opacity: 0.5}} />
            </button>
          </div>
          <div className="mini-datasheet-section" style={{border:"none"}}>
            <div className="custom-grid-container">
              {
                data.nutrients.map((nutrient) => {
                  return <div className="page-food-nutrient" key={nutrient.name} >
                    <div className="page-food-nutrient-top">
                      <h4 className="page-food-nutrient-top-text">{nutrient.name}</h4>
                      <h4 className="page-food-nutrient-top-text">{nutrient.amount + nutrient.unit}</h4>
                    </div>
                    <div>
                      <h4 className="page-food-nutrient-percent">{nutrient.percentOfDailyNeeds}% of Daily Needs</h4>
                    </div>
                  </div>
                })
              }
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default DataSheet;
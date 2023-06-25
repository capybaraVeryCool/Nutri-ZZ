import React, { useEffect} from 'react';
import { Link } from "react-router-dom";
import {PrimaryButton, BackArrowDiv} from '../stylesheets/styledComponents';
import '../stylesheets/Configure.css';
import firebase from '../firebase';
<<<<<<< HEAD
=======
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
>>>>>>> 7f5d0222a07d47dd726706267429f10b4feb0343

const Configure = (props) => {

  useEffect(() => {
    let abortController = new AbortController();
    const inputCal = document.querySelector('#page-configure-calories');
    const inputCarbs = document.querySelector('#page-configure-carbs');
    const inputProtein = document.querySelector('#page-configure-protein');
    const inputFat = document.querySelector('#page-configure-fat');
    //
    inputCal.value = props.config.goalCal;
    inputCarbs.value = props.config.goalCarb;
    inputProtein.value = props.config.goalProtein;
    inputFat.value = props.config.goalFat;

    return () => {
      abortController.abort();
    };
  }, [props]);

  const submit = () => {
    const inputCal = document.querySelector('#page-configure-calories');
    const inputCarbs = document.querySelector('#page-configure-carbs');
    const inputProtein = document.querySelector('#page-configure-protein');
    const inputFat = document.querySelector('#page-configure-fat');
    const newConfig = {
      goalCal: Number(inputCal.value),
      goalFat: Number(inputFat.value),
      goalProtein: Number(inputProtein.value),
      goalCarb: Number(inputCarbs.value),
    }
    // update firestore (set it)
    var db = firebase.firestore();
<<<<<<< HEAD
    db.collection('users').doc(firebase.auth()?.currentUser?.uid).collection('settings').doc('config').update(newConfig)
=======
    db.collection('users').doc(firebase.auth().currentUser.uid).collection('settings').doc('config').update(newConfig)
>>>>>>> 7f5d0222a07d47dd726706267429f10b4feb0343
    // dispatch config
    props.dispatchConfig({type: 'update', payload: newConfig});
  }

  return (
    <div className="page-configure">
      <div className="page-configure-top">
<<<<<<< HEAD
        <h1>Set Configurations</h1>
      </div>

      <div className="page-configure-inputs">
        <div className="page-configure-inputDiv">
          <h2>Calorie Goal: </h2>
          <input type="number" min="1200" id="page-configure-calories"/>
        </div>
        <div className="page-configure-inputDiv">
          <h2>Carbs Goal: </h2>
          <input type="number" min="0" id="page-configure-carbs" />
        </div>
        <div className="page-configure-inputDiv">
          <h2>Protein Goal: </h2>
          <input type="number" min="0" id="page-configure-protein" />
        </div>
        <div className="page-configure-inputDiv">
          <h2>Fat Goal: </h2>
          <input type="number" min="0" id="page-configure-fat" />
        </div>
      </div>

      <div className="page-configure-submit">
        <PrimaryButton width="60%" onClick={submit}>Submit</PrimaryButton>
=======
        <h1>User Profile</h1>
      </div>

      <Container className="page-configure-inputs">
        <Row>
          <Col>
            <div className="page-configure-inputDiv">
              <h2>Calorie Goal:</h2>
              <input type="number" min="1200" id="page-configure-calories"/>
            </div>
          </Col>
          <Col>
            <div className="page-configure-inputDiv">
              <h2>Carbs Goal: </h2>
              <input type="number" min="0" id="page-configure-carbs" />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="page-configure-inputDiv">
              <h2>Protein Goal: </h2>
              <input type="number" min="0" id="page-configure-protein" />
            </div>
          </Col>
          <Col>
            <div className="page-configure-inputDiv">
              <h2>Fat Goal: </h2>
              <input type="number" min="0" id="page-configure-fat" />
            </div>
          </Col>
        </Row>
      </Container>

      <div className="page-configure-submit">
        <PrimaryButton width="25%" onClick={submit}>Submit</PrimaryButton>
>>>>>>> 7f5d0222a07d47dd726706267429f10b4feb0343
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

export default Configure;

import React, { useEffect} from 'react';
import { Link } from "react-router-dom";
import {PrimaryButton, BackArrowDiv} from '../stylesheets/styledComponents';
import '../stylesheets/Configure.css';
import firebase from '../firebase';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong} from '@fortawesome/free-solid-svg-icons';

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
    db.collection('users').doc(firebase.auth().currentUser.uid).collection('settings').doc('config').update(newConfig)
    // dispatch config
    props.dispatchConfig({type: 'update', payload: newConfig});
  }

  return (
    <div className="whole-page">
      <div class="image-container">
        <img className="strawberry" src="AdobeStock_244073028_Preview.jpeg" alt="config_illustration"/>
      </div>
      <div className="page-configure">
        <div className="page-configure-top">
          <h1 className="custom-header">User Profile</h1>
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
                <h2>Carbs Goal:</h2>
                <input type="number" min="0" id="page-configure-carbs" />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="page-configure-inputDiv">
                <h2>Protein Goal:</h2>
                <input type="number" min="0" id="page-configure-protein" />
              </div>
            </Col>
            <Col>
              <div className="page-configure-inputDiv">
                <h2>Fat Goal:</h2>
                <input type="number" min="0" id="page-configure-fat" />
              </div>
            </Col>
          </Row>
        </Container>

        <div className="page-configure-submit">
          <PrimaryButton width="25%" onClick={submit}>Submit</PrimaryButton>
        </div>
      </div>

      <BackArrowDiv>
        <Link to="/">
          <FontAwesomeIcon icon={faArrowLeftLong} style={{color: "#f1b6ac",fontSize: "30px"}} />
        </Link>
      </BackArrowDiv>
    </div>
  );
}

export default Configure;

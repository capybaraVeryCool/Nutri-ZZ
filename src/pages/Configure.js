import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PrimaryButton, BackArrowDiv } from '../stylesheets/styledComponents';
import '../stylesheets/Configure.css';
import firebase from '../firebase';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

const Configure = (props) => {
  const [inputGender, setInputGender] = useState('male');
  const [inputAge, setInputAge] = useState('');
  const [inputHt, setInputHt] = useState('');
  const [inputWt, setInputWt] = useState('');
  const [inputActiv, setInputActiv] = useState('sedentary');
  const [newUser, setNewUser] = useState(true);

  useEffect(() => {
    const checkUserData = async () => {
      try {
        // Get the current user's ID
        const userId = firebase.auth().currentUser?.uid;

        // Check if the user is signed in
        if (userId) {
          // Get a reference to the document in Firestore
          const docRef = firebase.firestore().collection('users').doc(userId).collection('settings').doc('config');

          // Get the document snapshot
          const docSnapshot = await docRef.get();

          // Check if the document exists (data is present for the user)
          if (docSnapshot.exists) {
            // Data exists for the user, set the input fields to the retrieved values
            const userData = docSnapshot.data();
            setNewUser(false);
            setInputGender(userData.gender);
            setInputAge(userData.age.toString());
            setInputHt(userData.height.toString());
            setInputWt(userData.weight.toString());
            setInputActiv(userData.activityLevel);
          }
        }
      } catch (error) {
        console.error('Error checking user data:', error);
      }
    };
    checkUserData();

    let abortController = new AbortController();
    // if (newUser!==true){
    //   setInputGender(props.config.gender);
    //   setInputAge(props.config.age);
    //   setInputHt(props.config.height);
    //   setInputWt(props.config.weight);
    //   setInputActiv(props.config.activityLevel);
    // }
    //
    // inputGender.value = inputGender;
    // inputAge.value = inputAge;
    // inputHt.value = inputHt;
    // inputWt.value = inputWt;
    // inputActiv.value = inputActiv;

    return () => {
      abortController.abort();
    };
  }, [props, props.config]);

  const submit = () => {
    const newConfig = {
      gender: inputGender,
      age: Number(inputAge),
      height: Number(inputHt),
      weight: Number(inputWt),
      activityLevel: inputActiv,
    };
    // Calculate BMR
    let bmr;
    if (inputGender === 'male') {
      bmr = 10 * newConfig.weight + 6.25 * newConfig.height - 5 * newConfig.age + 5;
    } else if (inputGender === 'female') {
      bmr = 10 * newConfig.weight + 6.25 * newConfig.height - 5 * newConfig.age - 161;
    } else {
      // Default BMR calculation for other genders (you can adjust this as needed)
      bmr = 10 * newConfig.weight + 6.25 * newConfig.height - 5 * newConfig.age +((5-161)/2);
    }

    // Calculate AMR based on activity level
    let goalCal;
    if (newConfig.activityLevel === 'sedentary') {
      goalCal = Math.round(bmr * 1.2);
    } else if (newConfig.activityLevel === 'lightlyActive') {
      goalCal = Math.round(bmr * 1.375);
    } else if (newConfig.activityLevel === 'moderatelyActive') {
      goalCal = Math.round(bmr * 1.55);
    } else if (newConfig.activityLevel === 'veryActive') {
      goalCal = Math.round(bmr * 1.725);
    } else if (newConfig.activityLevel === 'extraActive') {
      goalCal = Math.round(bmr * 1.9);
    }

    // Calculate goalMacros
    const goalFat = Math.round((goalCal * 0.3) / 9);
    const goalProtein = Math.round((goalCal * 0.3) / 4);
    const goalCarb = Math.round((goalCal * 0.4) / 4);
    
    // update firestore (set it)
    var db = firebase.firestore();
    db.collection('users')
      .doc(firebase.auth()?.currentUser?.uid)
      .collection('settings')
      .doc('config')
      .update({...newConfig, goalCal, goalFat, goalProtein, goalCarb, bmr});

    // dispatch config
    props.dispatchConfig({ type: 'update', payload: { ...newConfig, goalCal, goalFat, goalProtein, goalCarb } });
  };

  return (
    <div className="whole-page">
      <div className="image-container">
        <img className="strawberry" src="picnic-basket-kitchen-cloth.jpg" alt="config_illustration" />
      </div>
      <div className="page-configure">
        <div className="page-configure-top">
          <h1 className="custom-header">User Profile</h1>
        </div>

        <Container className="page-configure-inputs">
          <Row>
            <Col style={{padding: "0px 40px"}}>
              <div className="page-configure-inputDiv">
                <h2>Gender:</h2>
                <select id="page-configure-gender" onChange={(e) => setInputGender(e.target.value)} value={inputGender}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Prefer not to say</option>
                </select>
              </div>
            </Col>
            <Col style={{padding: "0px 40px"}}>
              <div className="page-configure-inputDiv">
                <h2>Age:</h2>
                <input type="number" min="0" id="page-configure-age" placeholder='' onChange={(e) => setInputAge(e.target.value)} value={inputAge}/>
                <span>years</span>
              </div>
            </Col>
          </Row>
          <Row>
            <Col style={{padding: "0px 40px"}}>
              <div className="page-configure-inputDiv">
                <h2>Height:</h2>
                <input
                  type="number"
                  min="0"
                  id="page-configure-height"
                  onChange={(e) => setInputHt(e.target.value)}
                  value={inputHt}
                />
                <span>cm</span>
              </div>
            </Col>
            <Col style={{padding: "0px 40px"}}>
              <div className="page-configure-inputDiv">
                <h2>Weight:</h2>
                <input
                  type="number"
                  min="0"
                  id="page-configure-weight"
                  onChange={(e) => setInputWt(e.target.value)}
                  value={inputWt}
                />
                <span>kg</span>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="page-configure-inputDiv">
                <h2>Activity Level:</h2>
                <select id="page-configure-activity" onChange={(e) => setInputActiv(e.target.value)} value={inputActiv} style={{width: "330px"}}>
                  <option value="sedentary">Sedentary (little to no exercise)</option>
                  <option value="lightlyActive">Lightly Active (light exercise/sports 1-3 days/week)</option>
                  <option value="moderatelyActive">Moderately Active (moderate exercise/sports 3-5 days/week)</option>
                  <option value="veryActive">Very Active (hard exercise/sports 6-7 days a week)</option>
                  <option value="extraActive">Extra Active (very hard exercise/sports & physical job)</option>
                </select>
              </div>
            </Col>
          </Row>
        </Container>

        <div className="page-configure-submit">
          <PrimaryButton width="25%" onClick={submit}>
            Submit
          </PrimaryButton>
        </div>
      </div>

      <BackArrowDiv>
        <Link to="/">
          <FontAwesomeIcon icon={faArrowLeftLong} style={{ color: '#f1b6ac', fontSize: '30px' }} />
        </Link>
      </BackArrowDiv>
    </div>
  );
};

export default Configure;

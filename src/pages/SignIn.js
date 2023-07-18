import React, { useRef, useState} from 'react';
import firebase from '../firebase';
import { Button, Card, Form } from "react-bootstrap";
// import { Link } from "react-router-dom";
import '../stylesheets/SignIn.css'

const SignIn = (props) => {
  // TODO: Listen to firestore change, update props
  const [onSignUp, setOnSignUp] =  useState(true);

  const signUp = () => {
    const username = document.querySelector("#signUp-username");
    const email = document.querySelector("#signUp-email");
    const password = document.querySelector("#signUp-password");
    
    // Add User
    let auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
    promise.then(function(result) {
      props.changeSign(!!firebase.auth().currentUser);
      return result.user.updateProfile({
        displayName: username.value
      })
    })
    promise.catch((e) => (alert(e)));
  }

  const logIn = () => {
    const email = document.querySelector('#logIn-email');
    const password = document.querySelector('#logIn-password');
    // CHECK LOGIN
    let auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.then(function(result) {
      props.changeSign(!!firebase.auth().currentUser);
    })
    promise.catch((e) => (alert(e)));

  }


  if (onSignUp === true) {
    return (
      <div class="page-signin">
        <div className="card signin" style={{backgroundColor:"#ffddd6", border: "#ffddd6"}}>
          <Card.Body className="signin d-flex justify-content-center" style={{padding:0}}>
            <h1 className="text-center custom-header">Sign Up</h1>
            <Form>
              <Form.Group>
                <Form.Label className="form-lab">Username</Form.Label>
                <Form.Control type="text" id="signUp-username" />
              </Form.Group>
              <Form.Group>
                <Form.Label className="form-lab">Email</Form.Label>
                <Form.Control type="email" id="signUp-email" />
              </Form.Group>
              <Form.Group>
                <Form.Label className="form-lab">Password</Form.Label>
                <Form.Control type="password" id="signUp-password" />
              </Form.Group>
              <div className="text-center" style={{justifyContent: "center", alignItems:"center"}}>
                <Button onClick={signUp} style={{backgroundColor: "#f1b6ac",border: "none",fontSize:18, lineHeight:1.5, display: "inline-block"}}>
                  Sign Up
                </Button>
              </div>
            </Form>
            <div className="w-100 text-center" style={{opacity: 0.7}}>
            Already a User? <span className="redirect" onClick={() => {setOnSignUp(false)}} style={{color: "#B88178", opacity: 1}}>Log in</span>
            </div>
          </Card.Body>
        </div>
      </div>
    );
  } else {
    return (
      <div class="page-signin">
        <div className="card signin" style={{backgroundColor:"#ffddd6", border: "none"}}>
          <Card.Body className="signin d-flex justify-content-center" style={{padding:0}}>
            <h1 className="text-center custom-header">Log In</h1>
            <Form>
              <Form.Group>
                <Form.Label className="form-lab">Email</Form.Label>
                <Form.Control type="email" id="logIn-email" autoComplete="off"/>
              </Form.Group>
              <Form.Group>
                <Form.Label className="form-lab">Password</Form.Label>
                <Form.Control type="password" id="logIn-password" autoComplete="off"/>
              </Form.Group>
              <div className="text-center" style={{justifyContent: "center", alignItems:"center"}}>
                <Button onClick={logIn} style={{backgroundColor: "#f1b6ac",border: "none",fontSize:18, lineHeight:1.5, display: "inline-block"}}>
                  Log In
                </Button>
              </div>
            </Form>
            <div className="w-100 text-center" style={{opacity: 0.7}}>
            Don't have an account yet? <span className="redirect" onClick={() => {setOnSignUp(true)}} style={{color: "#B88178", opacity: 1}}>Sign up here!</span>
            </div>
          </Card.Body>
        </div>
      </div>
    );
  }


}

export default SignIn;
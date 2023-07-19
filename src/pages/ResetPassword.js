import React from 'react';
import firebase from '../firebase';
import { Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../stylesheets/ResetPassword.css';

const ResetPassword = () => {
    const handleResetPassword = () => {
        const email = document.querySelector('#resetPassword-email').value;
      
        firebase
          .auth()
          .sendPasswordResetEmail(email)
          .then(() => {
            alert('Password reset email sent. Please check your inbox.');
          })
          .catch((error) => {
            alert(error.message);
          });
      };

    return (
        <div className="page-reset-password">
            <div className="card signin" style={{backgroundColor:"#ffddd6", border: "none"}}>
                <Card.Body className="signin d-flex justify-content-center" style={{padding:0}}>
                    <h1 className="text-center">RESET PASSWORD</h1>
                    <Form>
                        <Form.Group>
                            <Form.Label className="form-lab">Email</Form.Label>
                            <Form.Control type="email" id="resetPassword-email" autoComplete="off" />
                        </Form.Group>
                        
                        <div className="text-center">
                        <Button
                            onClick={handleResetPassword}
                            style={{ backgroundColor: '#f1b6ac', border: 'none', fontSize: 18, lineHeight: 1.5, display: 'inline-block' }}
                        >
                            Reset Passworddd
                        </Button>
                        </div>

                    </Form>
                </Card.Body>
            </div>
            </div>
    );
    };

export default ResetPassword;

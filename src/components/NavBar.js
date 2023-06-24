import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useAuth } from "../contexts/Auth";
import SignIn from "../pages/SignIn.js"

const NavBar = () => {
  const { auth, signOut } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { error } = await signOut();
      console.log(error);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: "white" }}>
      <Container>
        <Navbar.Brand>
          <img src="NutriZZ_logo.svg" height="40" alt="logo"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {!auth && (
              <Nav.Link as={Link} to="../pages/SignIn" style={{fontSize:18}}>
                Login 
              </Nav.Link>
            )}
            {!auth && (
              // <Nav.Link as={Link} to="../pages/SignIn" onClick={() => {SignIn.setOnSignUp(true)}} style={{fontSize:18}}>
              <Nav.Link as={Link} to="../pages/SignIn" style={{fontSize:18}}>
                Sign Up
              </Nav.Link>
            )}
            {auth && (
              <Nav.Link as={Link} to="/" style={{fontSize:18}}>
                Home
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {auth && (
              <Nav.Link as={Button} onClick={handleLogout} style={{fontSize:18}}>
                Log Out
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
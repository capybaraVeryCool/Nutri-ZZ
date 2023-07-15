import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useAuth } from "../contexts/Auth";
import SignIn from "../pages/SignIn.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { BackArrowDiv } from "../stylesheets/styledComponents";

const NavBar = () => {
  const location = useLocation();
  const toHomepage = ['/DataSheet', '/Configure', '/Search', '/Meal'];
  const getBackLink = () => {
    // Define the back link based on the current location
    if (toHomepage.includes(location.pathname)) {
      return '/';
    } else if (location.pathname === '/Food') {
      return '/Search';
    } else {
      return null;
    }
  };

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
      <Container style={{display: "flex", justifyContent:"center"}}>
        {getBackLink() && (
          <BackArrowDiv>
            <Link to={getBackLink()} className="arrow-link">
              <FontAwesomeIcon icon={faArrowLeft} className="arrow-icon" />
            </Link>
          </BackArrowDiv>
        )}
        <Navbar.Brand>
          <Link to="/" className="logo-link">
            <img className="logo-custom" src="NutriZZ_logo.svg" height="50" alt="logo" />
          </Link>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavBar;
import React, {useState, useEffect} from 'react';
import '../stylesheets/MealBar.css';
import {Link} from "react-router-dom";
<<<<<<< HEAD
=======
import { Container, Row, Col } from 'react-bootstrap';

>>>>>>> 7f5d0222a07d47dd726706267429f10b4feb0343

const MealBar = (props) => {

  const [meal, setMeal] = useState(props.meal);
  const [totalCal, setTotalCal] = useState(props.totalCal)

  const options = {
    "breakfast" : {
      title: "Breakfast",
      emoji: "🍳",
    },
    "lunch" : {
      title: "Lunch",
      emoji: "🥗",
    },
    "dinner" : {
      title: "Dinner",
      emoji: "🍲",
    },
    "snacks" : {
      title: "Snacks",
      emoji: "🍐",
    },
  }

  useEffect(()=> {
    setMeal(props.meal);
    setTotalCal(props.totalCal);
  }, [props])


  return (
<<<<<<< HEAD
    <div  className="mealbar">
      
        <div className="mealbar-top">
          <h2 className="mealbar-emoji">{options[meal].emoji}</h2>
          <Link to={`/meal/${meal}`}>
          <div className="mealbar-text">
            <h2>{options[meal].title}</h2>
            <h3>Here I'll write down a list of foods</h3>
          </div>
          </Link>
          <Link to={`/meal/${meal}/search`}>
            <button>➕</button>
          </Link>
        </div>
        <div className="mealbar-bottom">
          <h2>{totalCal} Calories</h2>
        </div>
=======
    <div className="mealbar">
      <div style={{ backgroundColor: '#ffddd6', padding: '10px 5px' }}>
        <Container className="custom-container">
          {/* <Row> */}
            <Col>
              <h2 className="mealbar-emoji">{options[meal].emoji}</h2>
            </Col>
            <Col className="mealbar-text">
              <Link to={`/meal/${meal}`} className="link">
                <h2>{options[meal].title}</h2>
              </Link>
            </Col>
            <Col className="mealbar-bottom">
              <h2>{totalCal} Calories</h2>
            </Col>
            <Col className="mealbar-button" style={{padding: 0}}>
              <Link to={`/meal/${meal}/search`}>
                <button >➕</button>
              </Link>
            </Col>
          {/* </Row> */}
        </Container>
      </div>
>>>>>>> 7f5d0222a07d47dd726706267429f10b4feb0343
    </div>
  );
}

export default MealBar;
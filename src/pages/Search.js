import React, {useState, useEffect} from 'react';
import '../stylesheets/Search.css';
import {Link, useParams} from "react-router-dom";
import {capitalize} from "../functions/helperFunctions";
import '../stylesheets/FoodBar.css';
// import FoodBar from '../components/FoodBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong} from '@fortawesome/free-solid-svg-icons';
import { BackArrowDiv } from '../stylesheets/styledComponents';

const Search = (props) => {

  const FoodBar = (props) => {

    const getNumId = (id) => {
      const arr = id.split('-');
      return arr[1];
    }
  
    return (
      <div style={{margin: "10px 0px"}}>
        <Link to={`/meal/${props.meal}/search/${getNumId(props.id)}`} className="link">
          <div  className="foodbar">
            
            <div className="foodbar-left">
              {
                props.imgSrc ? <img src={props.imgSrc} alt={props.title} /> : null
              }
              <div className="foodbar-text">
                <h2>{capitalize(props.title)}</h2>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
  const { id } = useParams();
  const meal = id;
  // let meal = useMatch('/meal/:id/search').url.split('/');
  // meal = meal[meal.length-2];
  const [search, setSearch] = useState('');
  const baseSrc = "https://spoonacular.com/cdn/ingredients_100x100/";
  const myDispatchResults = props.dispatchResults;

  const handleFoodBarClick = () => {
    // Refresh the page
    myDispatchResults({ type: 'update', payload: [] });
  };

  // LISTEN FOR 'ENTER' EVENT AND UPDATE SEARCH INPUT
  useEffect(() => {
    let input = document.getElementById("page-searchbar");
    const pressedEnter = (event) => {
      if (event.keyCode === 13) {
        event.preventDefault();
        setSearch(input.value);
      }
    }
    input.addEventListener("keyup", pressedEnter);
    return () => {
      return input.removeEventListener("keyup", pressedEnter);
    };
  }, []);


  // COLLECT RESULTS FROM API
  useEffect(() => {
    let abortController = new AbortController();
    let aborted = abortController.signal.aborted;
    if (search!==''){
      async function fetchResults() {
        let response = await fetch(`https://api.spoonacular.com/food/ingredients/search?apiKey=${"298395fc508d46c8accf3b43c528a9e2"}&query=${search}&number=25`);
        let data = await response.json();
        aborted = abortController.signal.aborted;
        if (aborted === false) {
          myDispatchResults({type: 'update', payload: data.results});
        }
      }
      fetchResults();
    }
    return () => {
      abortController.abort();
      // myDispatchResults({ type: 'update', payload: [] });
    };
  }, [search, myDispatchResults])


  return (
    <div  className="page-search">
      <div className="page-search-top">
        <div className="page-search-nav">
          <BackArrowDiv>
            {/* <Link to={`/meal/${meal}`}> */}
            <Link to="/">
              <FontAwesomeIcon icon={faArrowLeftLong} style={{color: "#f1b6ac",fontSize: "30px"}} />
            </Link>
          </BackArrowDiv>
          <h2 className="custom-header">{capitalize(meal)}</h2>
          <input type="text" placeholder="🔍 Search Food" id="page-searchbar" />
        </div>
      </div>
      <div className="page-search-items">
        {
          props.results.map((item) => {
            return (
            <div onClick={handleFoodBarClick}>
              <FoodBar key={item.id} id={'foodId-'+item.id} title={item.name} imgSrc={baseSrc+item.image} meal={meal} />
            </div>
          )})
        }
      </div>
    </div>
  );
}

export default Search;
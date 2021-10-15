import React, { useState, useReducer, useEffect } from "react";
import "./DiscoverForm.css";

const obj = {
  type: "movies",
  genre: "action",
  "starting-year": 2000,
  "ending-year": new Date().getFullYear(),
  rating: 3,
};

const rate = [true, true, true, false, false];
const startingYear = [];
const endingYear = [];

(function () {
  const yr = new Date().getFullYear();
  for (let i = 2000; i <= +yr; i++) {
    startingYear.push(i);
    endingYear.push(i);
  }
  endingYear.reverse();
})();

const reducer = (state, action) => {
  switch (action.type) {
    case "type":
      return { ...state, type: action.payload };
    case "genre":
      return { ...state, genre: action.payload };
    case "start":
      return { ...state, "starting-year": action.payload };
    case "end":
      return { ...state, "ending-year": action.payload };
    case "rating":
      return { ...state, rating: action.payload };
    default:
      return state;
  }
};

const DiscoverForm = ({ callBackFormData }) => {
  const [rating, setRating] = useState(rate);
  const [state, dispatch] = useReducer(reducer, obj);
  const [genreList, setGenreList] = useState("");

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=3a94078fb34b772a31d9a1348035bed7"
    )
      .then((data) => {
        if (data.status >= 200 && data.status <= 299) return data.json();
        else throw Error(data.statusText);
      })
      .then((data) => {
        setGenreList(data.genres);
      })
      .catch((err) => console.log(err));
  }, []);

  const ratingHandler = (e, index) => {
    const arr = [...rating];
    for (let i = 0; i < arr.length; i++) {
      if (i <= index) arr[i] = true;
      else arr[i] = false;
    }
    setRating(arr);
    dispatch({ type: "rating", payload: index + 1 });
  };

  const typeHandler = (e) => {
    dispatch({ type: "type", payload: e.target.value });
  };

  const genreHandler = (e) => {
    dispatch({ type: "genre", payload: e.target.value });
  };

  useEffect(() => {
    let obj = {...state, genreList: genreList }
    callBackFormData(obj);
  }, [state, callBackFormData, genreList]);

  const startingYearHandler = (e) => {
    dispatch({ type: "start", payload: e.target.value });
  };

  const endingYearHandler = (e) => {
    dispatch({ type: "end", payload: e.target.value });
  };

  return (
    <div className="discover-form-container">
      <h3 className="sub-heading">Discover options</h3>
      <div className="form-box">
        <label htmlFor="type">TYPE</label>
        <select className="drop-down" name="type" onChange={typeHandler}>
          <option className="option">Movies</option>
          <option className="option">TV Series</option>
        </select>
      </div>
      <div className="form-box">
        <label htmlFor="genre">GENRE</label>
        <select className="drop-down" name="genre" onChange={genreHandler}>
          {genreList &&
            genreList.map((item) => (
              <option key={item.id} className="option">
                {item.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-box" id="year">
        <label htmlFor="year">YEAR</label>

        <div className="year-range" name="year">
          <select className="drop-down" onChange={startingYearHandler}>
            {startingYear &&
              startingYear.map((item, i) => (
                <option key={i} className="option" value={item}>
                  {item}
                </option>
              ))}
          </select>
          <h1> - </h1>
          <select className="drop-down year" onChange={endingYearHandler}>
            {endingYear &&
              endingYear.map((item, i) => (
                <option key={i} className="option" value={item}>
                  {item}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="form-box">
        <label htmlFor="rating">RATING</label>
        <div className="rating" name="rating">
          <i
            className={`fas fa-star ${rating[0] ? "gold" : "gray"}`}
            onClick={(e) => ratingHandler(e, 0)}
          ></i>
          <i
            className={`fas fa-star ${rating[1] ? "gold" : "gray"}`}
            onClick={(e) => ratingHandler(e, 1)}
          ></i>
          <i
            className={`fas fa-star ${rating[2] ? "gold" : "gray"}`}
            onClick={(e) => ratingHandler(e, 2)}
          ></i>
          <i
            className={`fas fa-star ${rating[3] ? "gold" : "gray"}`}
            onClick={(e) => ratingHandler(e, 3)}
          ></i>
          <i
            className={`fas fa-star ${rating[4] ? "gold" : "gray"}`}
            onClick={(e) => ratingHandler(e, 4)}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default DiscoverForm;

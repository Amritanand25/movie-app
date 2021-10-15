import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./Nav.css";
const current = [false, false, false, false];

const Nav = () => {
  const [active, setActive] = useState(current);
  const clickHandler = (id) => {
    const arr = [false, false, false, false];
    arr[id] = true;
    setActive(arr);
  };

  useEffect(() => {
    const path = window.location.pathname;
    const arr = [false, false, false, false];
    switch (path) {
      case "/":
        setActive(arr);
        break;
      case "/popular":
        arr[0] = true;
        setActive(arr);
        break;
      case "/newest":
        arr[1] = true;
        setActive(arr);
        break;
      case "/trending":
        arr[2] = true;
        setActive(arr);
        break;
      case "/top_rated":
        arr[3] = true;
        setActive(arr);
        break;
      default:
        setActive(arr);
        break;
    }
  }, []);

  return (
    <>
      <li onClick={() => clickHandler(0)}>
        <Link className={`${active[0] ? "white" : "blue"}`} to="/popular">
          POPULAR
        </Link>
      </li>
      <li onClick={() => clickHandler(1)}>
        <Link className={`${active[1] ? "white" : "blue"}`} to="/newest">
          NEWEST
        </Link>
      </li>
      <li onClick={() => clickHandler(2)}>
        <Link className={`${active[2] ? "white" : "blue"}`} to="/trending">
          TRENDING
        </Link>
      </li>
      <li onClick={() => clickHandler(3)}>
        <Link className={`${active[3] ? "white" : "blue"}`} to="/top_rated">
          TOP RATED
        </Link>
      </li>
    </>
  );
};

export default Nav;

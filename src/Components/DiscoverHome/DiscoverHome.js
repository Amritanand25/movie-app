import React, { useState, useEffect } from "react";
import "./DiscoverHome.css";
import Nav from "./Nav/Nav";

const DiscoverHome = ({callBackSearchData}) => {
  const [inputData, setInputData] = useState("");
  
  useEffect(() => {
    callBackSearchData(inputData);
  }, [inputData, callBackSearchData])

  return (
    <div className="home-container">
      <nav className="nav-bar">
        <div className="logo">
          <h1>Discover</h1>
        </div>
        <div className="link">
          <ul>
            <Nav />
          </ul>
        </div>
        <div className="search">
          <i className="fas fa-search"></i>
          <input
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            type="search"
            placeholder="Search"
          />
        </div>
      </nav>
    </div>
  );
};

export default DiscoverHome;

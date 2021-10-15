import React, { useState, createContext, useCallback } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Index from "./Components/DiscoverHome/RouterContent/Index";

import "./App.css";
import DiscoverForm from "./Components/DiscoverForm/DiscoverForm";
import DiscoverHome from "./Components/DiscoverHome/DiscoverHome";

const Context1 = createContext();
const Context2 = createContext();

function App() {
  const [formData, setFormData] = useState("");
  const [searchData, setSearchData] = useState("");

  const formDataHandler = useCallback((data) => {
    setFormData(data);
  }, []);

  const searchDataHandler = useCallback((data) => {
    setSearchData(data);
  }, []);

  return (
    <Context1.Provider value={formData}>
      <Context2.Provider value={searchData}>
        <Router>
          <div className="main-container">
            <div className="left-container">
              <DiscoverHome callBackSearchData={searchDataHandler} />
              <div className="content">
                <Index />
              </div>
            </div>
            <div className="right-container">
              <DiscoverForm callBackFormData={formDataHandler} />
            </div>
          </div>
        </Router>
      </Context2.Provider>
    </Context1.Provider>
  );
}

export {Context1, Context2};
export default App;

import React from "react";

import Spark from "../../components/spark/Spark";
import About from "../../components/about/About";

import "../homepage/homepage.styles.css";

function Homepage() {
  return (
    <div className="homepage-container">
      <div className="spark-container">
        <Spark />
      </div>
      <About />
    </div>
  );
}

export default Homepage;

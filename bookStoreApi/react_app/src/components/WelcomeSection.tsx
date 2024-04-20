import React from "react";
import WelcomeSectionCarousel from "./WelcomeSectionCarousel";

const WelcomeSection : React.FC =()=>{
    return <div className="d-block d-lg-flex">
    <div className="flex-lg-fill">
    <img src="https://www.shutterstock.com/shutterstock/photos/1883859943/display_1500/stock-photo-the-word-example-is-written-on-a-magnifying-glass-on-a-yellow-background-1883859943.jpg" className="card-img-top" alt="..."/>
    </div>
    <div className="flex-lg-fill">
    <WelcomeSectionCarousel/>
    </div>
  </div>
  
}

export default WelcomeSection
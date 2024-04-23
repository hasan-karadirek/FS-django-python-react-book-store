import React from "react";
import WelcomeSection from "../components/WelcomeSection";
import AboutUs from "../components/AboutUsSection";

const Home : React.FC = ()=>{

    return <>
        <WelcomeSection/>
        <br/>
        <AboutUs/>
    </>
}

export default Home
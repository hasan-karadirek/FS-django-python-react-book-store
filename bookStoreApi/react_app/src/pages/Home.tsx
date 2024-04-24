import React from "react";
import WelcomeSection from "../components/WelcomeSection";
import AboutUs from "../components/AboutUsSection";
import BlogPosts from "../components/BlogPosts";
import Testimonials from "../components/Testimonials";

const Home : React.FC = ()=>{

    return <>
        <WelcomeSection/>
        <br/>
        <AboutUs/>
        <br/>
        <BlogPosts/>
        <Testimonials/>
    </>
}

export default Home
import React from "react";
import WelcomeSection from "../components/WelcomeSection";
import AboutUs from "../components/AboutUsSection";
import BlogPosts from "../components/BlogPosts";
import Testimonials from "../components/Testimonials";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

const Home : React.FC = ()=>{

    return <>
        <WelcomeSection/>
        <br/>
        <AboutUs/>
        <br/>
        <BlogPosts/>
        <Testimonials/>
        <ContactSection/>
        <Footer/>
    </>
}

export default Home
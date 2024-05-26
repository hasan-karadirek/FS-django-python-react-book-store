import React, { useEffect } from "react";
import WelcomeSection from "../components/home/WelcomeSection";
import AboutUs from "../components/home/AboutUsSection";
import BlogPosts from "../components/home/BlogPosts";
import Testimonials from "../components/home/Testimonials";
import ContactSection from "../components/home/ContactSection";
import { useLocation } from "react-router-dom";

const Home: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <>
      <WelcomeSection />
      <br />
      <AboutUs />
      <br />
      <BlogPosts />
      <Testimonials />
      <ContactSection />
    </>
  );
};

export default Home;

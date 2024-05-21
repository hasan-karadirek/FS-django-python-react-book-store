import React from "react";
import WelcomeSection from "../components/home/WelcomeSection";
import AboutUs from "../components/home/AboutUsSection";
import BlogPosts from "../components/home/BlogPosts";
import Testimonials from "../components/home/Testimonials";
import ContactSection from "../components/home/ContactSection";
import Footer from "../components/main/Footer";

const Home: React.FC = () => {
  return (
    <>
      <WelcomeSection />
      <br />
      <AboutUs />
      <br />
      <BlogPosts />
      <Testimonials />
      <ContactSection />
      <Footer />
    </>
  );
};

export default Home;

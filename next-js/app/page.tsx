import AboutUs from "./components/home/AboutUsSection";
import BlogPosts from "./components/home/BlogPosts";
import ContactSection from "./components/home/ContactSection";

import dynamic from "next/dynamic";

// Dynamically import WelcomeSection
const WelcomeSection = dynamic(
  () => import("./components/home/WelcomeSection"),
  { ssr: false },
);
const Testimonials = dynamic(() => import("./components/home/Testimonials"), {
  ssr: false,
});

export default function Home() {
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
}

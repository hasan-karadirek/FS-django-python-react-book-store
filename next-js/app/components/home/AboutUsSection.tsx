"use client";
import React from "react";
import { Slide } from "react-awesome-reveal";
import Image from "next/image";

const AboutUs: React.FC = () => {
  return (
    <div id="about-us" className="container">
      <div className="d-flex flex-column flex-lg-row">
        <Slide triggerOnce={true}>
          <div className="flex-fill about-us">
            <h1>Let’s get intimate</h1>
            <br />
            <p>
              Welcome to the most exquisite world of Le Flaneur Amsterdam, a gem
              for book lovers hidden in plain sight bordering the beautiful and
              cozy Jordaan and always attractive and hectic negenstraatjes.
              Enter this gate of wonder and the...
            </p>
            <p>No, no. Really?</p>
            <p>
              Le Flaneur is an ordinary, second hand bookstore, and proudly a
              physical one. This is an ordinary bookstore, meaning that, we
              mostly stock ordinary editions and wish to cater for ordinary
              people. Le Flaneur is not a classical antiquarian, or seller of
              rare books, which we consider important in their own ways, but we
              are more in love with the letter, rather than the envelope. We
              also sell “things” in that sense, first editions, antiquarian
              stuff, but do not necessarily chase them, and keep our energy to
              offer books that matter, so that everybody reads and we live
              ordinarily.
            </p>
            <p>
              This is a second hand bookstore. It comes with the idea that
              people can lighten their reading lists without large holes in
              their budgets and extra weight on the planet. However trivial, it
              may turn a behavior, once they catch themselves thinking the
              difference between buying second hand and new beyond purses. Then
              they may relentlessly leap to think the meaning of buying, and all
              that white noise of production. Not of books of course. Second
              hand bookstores may stimulate thinking.
            </p>
            <p>
              This is a physical bookstore. This gets serious. We are brick and
              mortar because we are more than economic transactions. We are an
              element of the city and give it yet another color, contributing to
              a common memory, and contrary to the city, being physical for us
              is an ode to imagining things different; slowness, coincidence,
              idleness, resistance, creation. Only we need suitable physical
              spaces. Supposedly as all other bookshops small and big marked by
              serious readers and idle spirits around the world, this is an open
              house where daily life takes place with care, understanding and
              good manners. Drop by when you are available.
            </p>
          </div>
        </Slide>
        <div className="flex-fill about-us">
          <Slide triggerOnce={true}>
            <Image
              id="about-us-img"
              src="/assets/insideBackToFront.jpg"
              className="d-block"
              width={2000}
              height={2000}
              alt="..."
            />
          </Slide>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

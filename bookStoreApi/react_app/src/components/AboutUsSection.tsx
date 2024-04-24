import React from "react";
import "./CSS/AboutUs.css";

const AboutUs: React.FC = () => {
  return (
    <div className="container">
      <div className="d-flex flex-column flex-lg-row">
        <div className="flex-fill about-us">
          <h1>About Us</h1>
          <br />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In viverra
            vitae leo et sollicitudin. Nulla ut sagittis ante. Sed dolor dolor,
            mattis non dolor et, tincidunt tempor odio. Cras facilisis porta
            libero, rutrum vehicula libero dapibus eu. Nullam blandit ut tellus
            vitae hendrerit. Ut eget iaculis eros, a mollis enim. Aliquam
            fermentum dui ac est pharetra porttitor. Sed pharetra in massa sit
            amet hendrerit. Maecenas semper tristique dui id cursus. Aenean
            tincidunt posuere lacus, ac condimentum mi lacinia id. Nulla mollis
            lectus eu tortor viverra, fringilla aliquet felis molestie.
            Phasellus in sagittis ligula, quis congue diam. Quisque dictum nulla
            eu mattis placerat. Nulla facilisi. Curabitur porttitor, tellus quis
            sagittis consequat, risus est faucibus ipsum, et sodales massa purus
            id metus. Nulla ut tincidunt justo. Nullam tincidunt enim rutrum
            nunc mattis fringilla. Mauris interdum venenatis nunc, nec elementum
            turpis congue et. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Nam auctor ut sapien sit amet consequat. Sed sit amet tellus
            sit amet nisi fermentum molestie. Donec vestibulum suscipit nibh non
            scelerisque. Suspendisse ultricies ex fermentum metus sagittis
            fermentum. Nulla aliquam fringilla mauris.
          </p>
        </div>
        <div className="flex-fill about-us">
          <img
            id="about-us-img"
            src="https://www.shutterstock.com/shutterstock/photos/1883859943/display_1500/stock-photo-the-word-example-is-written-on-a-magnifying-glass-on-a-yellow-background-1883859943.jpg"
            className="d-block"
            alt="..."
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

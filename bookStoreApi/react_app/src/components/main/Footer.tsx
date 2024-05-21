import React from "react";
import "../CSS/Footer.css";
import Logo from "../../assets/303178780_487833293365662_2765766073040987699_n.jpg";

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="d-flex px-4 py-4">
        <div className="footer-left flex-grow-1">
          <a className="navbar-brand pe-5 py-5 mt-5" href="#">
            <img id="logo" src={Logo} alt="" />
          </a>
        </div>
        <div className="footer-right flex-grow-1">
          <ul>
            <li className="p-2">KvK:222222222</li>
            <li className="p-2">Adress: lirinsengracht 260, Amsterdam</li>
            <li className="p-2">Tel: 055555555555</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;

import React from "react";
import Link from "next/link";
import Image from "next/image";

const NavbarUser: React.FC = () => {
  return (
    <div className="nav-user-container">
      <Link href="/customer">
        <div className="d-flex" style={{ justifyContent: "center" }}>
          <Image
            className="nav-cart-list-image"
            src="/assets/user.png"
            alt="user-icon"
            width={35}
            height={35}
          />
        </div>
      </Link>
    </div>
  );
};

export default NavbarUser;

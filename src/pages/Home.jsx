import React from "react";
import { Carousel } from "flowbite-react";
import Scroll from "../components/ScrollProduct";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="md:h-[33rem] h-52">
        <Carousel>
          <img
            src="https://img.freepik.com/free-vector/sport-shoes-sneakers-set_74855-313.jpg?w=996&t=st=1663715396~exp=1663715996~hmac=3b1edeed8336fef52d645f72f33bf664b32c1ef08ccc9fb1afaf04e098e642ef"
            alt="Sepatu"
          />
          <img
            src="https://img.freepik.com/free-photo/girl-torn-jeans_144627-12941.jpg?w=996&t=st=1663715458~exp=1663716058~hmac=6dd96ed60924c8e3f08deb552207c2a9dcfd4263b24fcd0eb309c243b11685eb"
            alt="..."
          />
          <img
            src="https://img.freepik.com/free-vector/running-sport-shoes-illustration_1284-17528.jpg?w=996&t=st=1663716286~exp=1663716886~hmac=1c37bfa27258911d4720a34955fc79834bb4b2b8666b4a18f3bfda893ace81c2"
            alt="..."
          />
        </Carousel>
      </div>
      <Scroll />
    </div>
  );
}

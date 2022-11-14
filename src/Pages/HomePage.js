import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import React, { useRef } from "react";
import List from "../Components/List";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Icon } from "@iconify/react";

function HomePage() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const [Codes, setCodes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setpostPerPage] = useState(6);
  const [value, setValue] = React.useState();

  const Nupload = () => {
    navigate("/compiler");
  };

  const Sexplore = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = Codes.slice(firstPostIndex, lastPostIndex);

  return (
    <div>
      <div className="block align-middle">
        <div className="h-[65vh] align-center justify-center text-center mt-40">
        <center><div className="md:text-8xl text-[#58544c]"><Icon icon="ion:code-sharp"/></div></center>
        <p className="text-5xl text-[#58544c]">Community based <br></br>CSS components library</p>
        <center>
          <p className="w-[50vw] mt-4 text-[#58544c]">
            AccelCss is a collection of free CSS components that can be
            used in your next project.
          </p>
        </center>
        <div className="flex gap-6 align-center justify-center mt-4">
          <div className="flex border-2 border-b-4 hover:border-b-2 hover:border-t-4 border-black">
          <Tippy content="Explore Css world">
            <button className="outline-0 px-6 py-[2px]" onClick={Sexplore}>Explore</button>
          </Tippy>
          <Icon className="border-black border-l-2 text-3xl right-0 text-[#58544c]" icon="ion:arrow-down-b"/>
          </div>
          <div className="flex border-2 border-t-4 hover:border-t-2 hover:border-b-4 border-black">
          <Tippy content="Upload your own style">
            <button className="outline-0 px-6 py-[2px]" onClick={Nupload}>Upload Code</button>
          </Tippy>
          <Icon className="border-black border-l-2 text-3xl right-0 text-[#58544c]" icon="ion:arrow-up-b"/>
          </div>
        </div>
        </div>
        <div ref={ref}>
          <List />
        </div>
      </div>
    </div>
  );
}

export default HomePage;

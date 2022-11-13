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
          <Tippy content="Explore Css world">
            <button className="border-2 border-black border-b-4 px-6 py-[2px] hover:border-b-2 hover:border-t-4" onClick={Sexplore}>Explore</button>
          </Tippy>
          <Tippy content="Upload your own style">
            <button className="border-2 border-black border-t-4 px-6 py-[2px] hover:border-t-2 hover:border-b-4" onClick={Nupload}>Upload Code</button>
          </Tippy>
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

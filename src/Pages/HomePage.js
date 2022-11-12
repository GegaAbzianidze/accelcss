import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import React, { useRef } from "react";
import List from "../Components/List";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
      <div className="block items-center justify-center text-center align-center">
        <h1 className="text-5xl mt-12">AccelCss</h1>
        <p className="text-lg mt-4">Community based css components library</p>
        <center>
          <p className="w-[50vw] mt-4">
            AccelCss is a collection of free CSS components that can be
            used in your next project. With a range of components, you can build
            your next marketing website, admin dashboard, eCommerce store and
            much more.
          </p>
        </center>
        <div className="flex gap-6 align-center justify-center mt-4">
          <Tippy content="Explore Css world">
            <button onClick={Sexplore}>Explore</button>
          </Tippy>
          <Tippy content="Upload your own style">
            <button onClick={Nupload}>Upload Code</button>
          </Tippy>
        </div>
        <div></div>
        <div ref={ref}>
          <List />
        </div>
      </div>
    </div>
  );
}

export default HomePage;

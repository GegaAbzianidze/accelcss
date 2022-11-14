import React from "react";
import "./Components.css"

function PopupPrev(props) {
  return props.trigger ? (
    <div>
      <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.2)] flex justify-center items-center">
        <div className="relative w-[90vw] h-[90vh] bg-white">
          {props.children}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default PopupPrev;

import React from "react";

function Popup(props) {
  return props.trigger ? (
    <div>
      <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.2)] flex justify-center items-center">
        <div className="relative p-12 w-full max-w-5xl bg-white">
          {props.children}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;

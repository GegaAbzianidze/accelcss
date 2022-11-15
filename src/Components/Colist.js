import React from "react";
import PreviewCard from "./PreviewCard";

function CoList({ Codes, onClick }) {
  return (
    <div>
      {Codes.map((code) => (
        <div className="inline-flex flex-wrap ml-14 mr-6 gap-16 mt-16 items-center justify-center">
          <PreviewCard key={code.id} code={code} onClick={onClick}/>
        </div>
      ))}
    </div>
  );
}

export default CoList;

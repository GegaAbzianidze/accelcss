import React from "react";
import PreviewCard from "./PreviewCard";

function CoList({ Codes }) {
  return (
    <div>
      {Codes.map((code) => (
        <div className="inline-flex flex-wrap ml-14 mr-6 gap-16 mt-16 items-center justify-center">
          <PreviewCard key={code.id} code={code} />
        </div>
      ))}
    </div>
  );
}

export default CoList;

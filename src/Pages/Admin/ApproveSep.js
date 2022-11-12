import { supabase } from "../../SupaBaseClient";
import React, { useEffect, useState } from "react";

const ApproveSep = ({ codeap, onDelete }) => {
  const [content, setCodeAP] = useState();
  const [userEmail, setemailAP] = useState();
  const [title, setTitleAp] = useState();
  const [category, setCategoryAP] = useState();

  useEffect(() => {
    setCodeAP(codeap.codeAP);
    setTitleAp(codeap.titleAP + ",n");
    setCategoryAP(codeap.categoryAP);
    setemailAP(codeap.emailAP);
  }, [codeap.codeAP, codeap.titleAP, codeap.categoryAP, codeap.emailAP]);

  const HandleApprove = () => {
    const likes = 1;
    const whoLikes = "miss.zaqareishvili@gmail.com";
    const whoFavs = "miss.zaqareishvili@gmail.com";
    if (codeap.id) {
      const fetchCodes = async () => {
        const { data, error } = await supabase
          .from("Codes")
          .insert([
            { content, userEmail, title, category, likes, whoLikes, whoFavs },
          ]);

        console.log(data);
        console.log(error);
      };

      fetchCodes();
      const deleteData = async () => {
        const { data, error } = await supabase
          .from("ApproveCode")
          .delete()
          .eq("id", codeap.id);

        console.log(data);
        console.log(error);
      };
      deleteData();
    }
  };
  const HandleRejection = () => {
    if (codeap.id) {
      const deleteData = async () => {
        const { data, error } = await supabase
          .from("ApproveCode")
          .delete()
          .eq("id", codeap.id);

        console.log(data);
        console.log(error);
      };
      deleteData();
    }
  };
    const iframeRender = '<script src="https://cdn.tailwindcss.com"></script>' + codeap.codeAP;
    const iframeRenderbootstrap = '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous"> <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>' + codeap.codeAP;


  return (
    <div id={codeap.id}>
      <iframe
        srcDoc={iframeRender}
        title="Display"
        className="border-4 h-[300px] w-[440px]"
      ></iframe>
      <p>{codeap.emailAP}</p>
      <button onClick={HandleApprove}>Approve</button>
      <button onClick={HandleRejection} className="ml-4">
        Reject
      </button>
    </div>
  );
};

export default ApproveSep;

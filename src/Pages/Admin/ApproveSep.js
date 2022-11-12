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

  return (
    <div id={codeap.id}>
      <iframe
        srcDoc={codeap.codeAP}
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

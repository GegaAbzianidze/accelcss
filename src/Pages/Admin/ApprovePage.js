import React, { useEffect, useState } from "react";
import { supabase } from "../../SupaBaseClient";
import AproveSep from "./ApproveSep";

function ApprovePage() {
  const [content, setCodeAP] = useState();

  const [CodesAP, setCodesAP] = useState(null);

  useEffect(() => {
    const fetchCodes = async () => {
      const { data, error } = await supabase.from("ApproveCode").select();

      if (error) {
        setCodeAP(null);
      }

      if (data) {
        setCodesAP(data);
      }
    };

    fetchCodes();
  }, []);

  return (
    <div>
      {CodesAP && (
        <div>
          {CodesAP.map((codeap) => (
            <div className="inline-flex flex-wrap ml-14 mr-6 gap-16 mt-16 items-center justify-center">
              <AproveSep key={codeap.id.toString()} codeap={codeap} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ApprovePage;

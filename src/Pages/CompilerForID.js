import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../SupaBaseClient";
import Editor from "@monaco-editor/react";
import "./Pages.css"
import { useNavigate } from "react-router-dom";
import Split from "react-split";

function ComilerForID() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [code, setCode] = useState();
  const [lcode, setLcode] = useState();

  const iframeRender =
    '<style>body{background-color: white;}</style><link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"><script src="https://cdn.tailwindcss.com"></script><script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous"> <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"> <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.5.0/semantic.min.js" integrity="sha512-Xo0Jh8MsOn72LGV8kU5LsclG7SUzJsWGhXbWcYs2MAmChkQzwiW/yTQwdJ8w6UA9C6EVG18GHb/TrYpYCjyAQw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script> <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.5.0/semantic.min.css" integrity="sha512-KXol4x3sVoO+8ZsWPFI/r5KBVB/ssCGB5tsv2nVOKwLg33wTFP3fmnXa47FdSVIshVTgsYk/1734xSk9aFIa4A==" crossorigin="anonymous" referrerpolicy="no-referrer" />' +
    code;

  useEffect(() => {
    const fatchSingleComp = async () => {
      const { data, error } = await supabase
        .from("Codes")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        navigate("/", { replace: true });
      }
      if (data) {
        setCode(data.content);
      }
    };

    setLcode(code);
    fatchSingleComp();
  }, [id, navigate, setLcode, code]);

  return (
    <div>
      <Split sizes={[65, 35]} className="split">
        <div>
          <Editor
            height="100vh"
            theme="vs-dark"
            defaultLanguage="markdown"
            options={{ formatOnPaste: true, readOnly: true }}
            value={lcode}
            onChange={lcode}
          />
        </div>
        <div>
          <iframe
            className="ifrmm"
            srcDoc={iframeRender}
            title="Display"
            frameBorder="0"
          ></iframe>
        </div>
      </Split>
    </div>
  );
}

export default ComilerForID;

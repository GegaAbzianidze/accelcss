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

  const iframeRender = '<script src="https://cdn.tailwindcss.com"></script>' + code;

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

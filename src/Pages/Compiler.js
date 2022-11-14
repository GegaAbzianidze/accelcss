import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import Split from "react-split";
import { supabase } from "../SupaBaseClient";
import Popup from "../Components/Popup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, Hidden, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { Icon } from "@iconify/react";
import "./Pages.css";

function Compiler() {
  const [codeAP, setCodeAP] = useState("<!-- write your code here ↓  you can use 5 frameworks ('TailwindCss', 'bootstrap','bulma','materialize css' and 'semantic ui') //also google icons<3-->");
  const [user, setUser] = useState({});
  const [titleAP, setTitleAp] = useState();
  const [popupTrig, setPopupTrig] = useState(false);

  const iframeRender =
    '<style>body{background-color: white;}</style><link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"><script src="https://cdn.tailwindcss.com"></script><script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous"> <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"> <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.5.0/semantic.min.js" integrity="sha512-Xo0Jh8MsOn72LGV8kU5LsclG7SUzJsWGhXbWcYs2MAmChkQzwiW/yTQwdJ8w6UA9C6EVG18GHb/TrYpYCjyAQw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script> <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.5.0/semantic.min.css" integrity="sha512-KXol4x3sVoO+8ZsWPFI/r5KBVB/ssCGB5tsv2nVOKwLg33wTFP3fmnXa47FdSVIshVTgsYk/1734xSk9aFIa4A==" crossorigin="anonymous" referrerpolicy="no-referrer" />' +
    codeAP;
  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        if (value.data?.user) {
          setUser(value.data.user);
        }
      });
    }
    getUserData();
  }, []);

  const emailAP = user.email;

  const handlePushToBase = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("ApproveCode")
      .insert([{ codeAP, emailAP, titleAP }]);

    if (error) {
      toast.error("You need to sign in to submit Code!!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    }

    if (!error) {
      console.log(data);
      toast.success("Submited!!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const openPopup = () => {
    setPopupTrig(true);
  };

  const actions = [
    {
      icon: <Icon icon="ion:save-outline" />,
      name: "Copy",
      clickHandler: openPopup,
    },
  ];

  return (
    <div>
      <Split sizes={[65, 35]} className="split">
        <div>
          <div className="float-right">
            {/* <button onClick={() => setPopupTrig(true)} className="absolute z-10 bottom-2 p-4 ml-[-13vh] rounded-full bg-green-400 font-3xl font-['Maven_Pro']">Upload</button> */}
            <Box
              sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}
              className="absolute z-10 bottom-2 p-4 ml-[-6vh]"
            >
              <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: "absolute", bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
              >
                {actions.map((action) => (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={action.clickHandler}
                  />
                ))}
              </SpeedDial>
            </Box>
          </div>
          <Editor
            height="100vh"
            theme="vs-dark"
            defaultLanguage="markdown"
            options={{
              formatOnPaste: true,
              autoClosingBrackets: false,
              quickSuggestions: true,
              horizontal: Hidden,
            }}
            defaultValue={codeAP}
            onChange={setCodeAP}
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
      <Popup trigger={popupTrig}>
        <div className="flex">
          <div>
            <iframe
              srcDoc={iframeRender}
              title="Display"
              className="border-4 h-[300px] w-[440px]"
            ></iframe>
          </div>
          <div>
            <input
              placeholder="Title"
              value={titleAP}
              onChange={(event) => setTitleAp(event.target.value)}
              required
            />
            <button onClick={() => setPopupTrig(false)}>close</button>
            {/* dropdown */}
          </div>
        </div>
        <button
          onClick={handlePushToBase}
          className="absolute z-7 bottom-2 p-4 right-2 rounded-full bg-green-400 font-3xl font-['Maven_Pro']"
        >
          Upload
        </button>
      </Popup>
      <ToastContainer />
    </div>
  );
}

export default Compiler;

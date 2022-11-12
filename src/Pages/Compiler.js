import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import Split from "react-split";
import { supabase } from "../SupaBaseClient";
import Popup from "../Components/Popup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { Icon } from "@iconify/react";

function Compiler() {
  const [codeAP, setCodeAP] = useState(
    '<script src="https://cdn.tailwindcss.com"></script>'
  );
  const [user, setUser] = useState({});
  const [titleAP, setTitleAp] = useState();
  const [popupTrig, setPopupTrig] = useState(false);

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
    { icon: <Icon icon="ion:save-outline" />, name: "Copy", clickHandler: openPopup },
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
            }}
            defaultValue={codeAP}
            onChange={setCodeAP}
          />
        </div>
        <div>
          <iframe
            className="ifrmm"
            srcDoc={codeAP}
            title="Display"
            frameBorder="0"
          ></iframe>
        </div>
      </Split>
      <Popup trigger={popupTrig}>
        <div className="flex">
          <div>
            <iframe
              srcDoc={codeAP}
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

import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import { supabase } from "../SupaBaseClient";
import { Icon } from "@iconify/react";
import "./Components.css"
import Tippy from "@tippyjs/react";
import PopupPrev from "./PopupPrev";

const PreviewCard = ({ code, onClick }) => {
  const [user, setUser] = useState({});

  const [popupTrig, setPopupTrig] = useState(false);

  const openPopup = () => {
    setPopupTrig(true);
  };
  const popclose = () => {
    setPopupTrig(false);
  };

  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        if (value.data?.user) {
          setUser(value.data.user);
          console.log(value.data.user);
        }
      });
    }
    getUserData();
  }, []);

  const string = code.whoLikes;
  const substring = user.email;
  const string2 = code.whoFavs;

  const addLikes = () => {

    onClick()

    const likescount = code.likes;

    const likes = +likescount + 1;

    const whoLikes = code.whoLikes + "," + user.email;

    if (code.id) {
      const fetchCodes = async () => {
        const { data, error } = await supabase
          .from("Codes")
          .update({ likes, whoLikes })
          .eq("id", code.id)
          .select();
      };

      fetchCodes();
    }
  };
  const addFavs = () => {
    onClick()
    const whoFavs = code.whoLikes + "," + user.email;

    if (code.id) {
      const fetchCodes = async () => {
        const { data, error } = await supabase
          .from("Codes")
          .update({ whoFavs })
          .eq("id", code.id)
          .select();
      };

      fetchCodes();
    }
  };
  const removeLikes = () => {
    onClick()
    const likescount = code.likes;
    const likes = +likescount - 1;
    const whoLikesLc = code.whoLikes;

    const whoLikes = whoLikesLc.replace("," + user.email, "");

    if (code.id) {
      const fetchCodes = async () => {
        const { data, error } = await supabase
          .from("Codes")
          .update({ likes, whoLikes })
          .eq("id", code.id)
          .select()
      };

      fetchCodes();
    }
  };
  const removeFavs = () => {
    onClick()
    const whoFavsLc = code.WhoFavs;

    const whoFavs = whoFavsLc.replace("," + user.email, "");
    if (code.id) {
      const fetchCodes = async () => {
        const { data, error } = await supabase
          .from("Codes")
          .update({ whoFavs })
          .eq("id", code.id)
          .select();

        if (data) {
          
        }
      };

      fetchCodes();
    }
  };
  const iframeRender =
  '<style>body{background-color: white; overflow: hidden;}</style><link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"><script src="https://cdn.tailwindcss.com"></script><script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous"> <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"> <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.5.0/semantic.min.js" integrity="sha512-Xo0Jh8MsOn72LGV8kU5LsclG7SUzJsWGhXbWcYs2MAmChkQzwiW/yTQwdJ8w6UA9C6EVG18GHb/TrYpYCjyAQw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script> <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.5.0/semantic.min.css" integrity="sha512-KXol4x3sVoO+8ZsWPFI/r5KBVB/ssCGB5tsv2nVOKwLg33wTFP3fmnXa47FdSVIshVTgsYk/1734xSk9aFIa4A==" crossorigin="anonymous" referrerpolicy="no-referrer" />' +
  code.content;

  return (
    <div id={code.id}>
      <PopupPrev trigger={popupTrig} className="zura ">
      <div  className='w-full bg-[#1E1919] h-7'>
      <h2 className="absolute left-1 top-1 text-white">{code.FrameWork}</h2>
        <center><h2 className="text-white">{code.title}</h2></center>
        <Tippy content="close"><button onClick={popclose} className="absolute text-2xl right-1 top-1"><Icon icon='ion:ios-circle-filled' className="text-[#B3423F]"/></button></Tippy>
      </div>
      <div className="h-full w-full ">
            <iframe
              srcDoc={iframeRender}
              title="Display"
              className="border-4 border-[#1E1919] w-[90vw] h-[90vh]"
            ></iframe>
          </div>
      </PopupPrev>
      
      <div className="bg-[#1E1919] hover:blur-sm rounded-md prnt">
        <div className=" flex justify-between mx-1 place-content-center">
        <div className="flex text-lg mt-1">
        <Icon icon='ion:ios-circle-filled' className="text-[#B3423F]"/>
        <Icon icon='ion:ios-circle-filled' className="text-[#B38520]"/>
        <Icon icon='ion:ios-circle-filled' className="text-[#1D8E2F]"/>
        </div>
        <h1 className="text-white">{code.title}</h1>
        <h2 className="text-white text-sm mt-1">{code.FrameWork}</h2>
        </div>
          <iframe
            srcDoc={iframeRender}
            scrolling="no"
            title="Display"
            className="border-4 rounded-md border-[#1E1919] h-[300px] w-[440px]"
          ></iframe>

          <div className="absolute h-[300px] w-[440px] top-0 left-0 ">
          </div>
        
       
      </div>
      <div className="justify-between flex  text-xl bg-[#fbf5e6] ">
          <div className="flex">
          <p>{code.likes}</p>
          {string.includes(substring) ? (
            <button onClick={removeLikes}>
              <Icon icon="ion:heart"/>
            </button>
          ) : (
            <button onClick={addLikes}>
              <Icon icon="ion:heart-outline" className="mt-[2px]"/>
            </button>
          )}</div>
          {string2.includes(substring) ? (
            <button onClick={removeFavs}>
              <Icon icon="ion:bookmark" />
            </button>
          ) : (
            <button onClick={addFavs}>
              <Icon icon="ion:bookmark-outline"/>
            </button>
          )}
        </div>
        <div className="chld ">
            <Tippy content="Preview in popup">
              <button onClick={openPopup}>Preview</button>
            </Tippy>
            <Link to={"/" + code.id}>
            <Tippy content="Open in editor">
              <button>Open</button>
            </Tippy>
            </Link>
      </div>
    </div>
  );
};

export default PreviewCard;

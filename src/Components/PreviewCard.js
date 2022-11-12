import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import { supabase } from "../SupaBaseClient";
import { Icon } from "@iconify/react";

const PreviewCard = ({ code }) => {
  const [user, setUser] = useState({});

  const [likk, setLikk] = useState(false);
  const [favv, setFavv] = useState(false);

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

        if (data) {
          setLikk(true);
        }
      };

      fetchCodes();
    }
  };
  const addFavs = () => {
    const whoFavs = code.whoLikes + "," + user.email;

    if (code.id) {
      const fetchCodes = async () => {
        const { data, error } = await supabase
          .from("Codes")
          .update({ whoFavs })
          .eq("id", code.id)
          .select();

        if (data) {
          setFavv(true);
        }
      };

      fetchCodes();
    }
  };
  const removeLikes = () => {
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
          .select();

        if (data) {
          setLikk(false);
        }
      };

      fetchCodes();
    }
  };
  const removeFavs = () => {
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
          setFavv(false);
        }
      };

      fetchCodes();
    }
  };

  const titleX = code.title.replace(",n", "");
  return (
    <div id={code.id}>
      <div className="relative">
        <Link to={"/" + code.id}>
          <iframe
            srcDoc={code.content}
            title="Display"
            className="border-4 h-[300px] w-[440px]"
          ></iframe>

          <div className="absolute h-[300px] w-[440px] top-0 left-0"></div>
        </Link>
        <p>{titleX}</p>
        <div className="float-right mt-[-20px] flex gap-2">
          <p>{code.likes}</p>
          {string.includes(substring) || likk === true ? (
            <button onClick={removeLikes}>
              <Icon icon="ion:heart" />
            </button>
          ) : (
            <button onClick={addLikes}>
              <Icon icon="ion:heart-outline" />
            </button>
          )}

          {string2.includes(substring) || favv === true ? (
            <button onClick={removeFavs}>
              <Icon icon="ion:bookmark" />
            </button>
          ) : (
            <button onClick={addFavs}>
              <Icon icon="ion:bookmark-outline" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewCard;

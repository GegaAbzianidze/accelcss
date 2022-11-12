import React, { useState, useEffect } from "react";
import Colist from "../Components/Colist";
import Paginations from "../Components/Paginations";
import { supabase } from "../SupaBaseClient";

function Profile() {
  const [user, setUser] = useState({});
  const [Codes, setCodes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setpostPerPage] = useState(2);

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

    const fetchCodes = async () => {
      const { data, error } = await supabase
        .from("Codes")
        .select()
        .textSearch("whoFavs", `'${user.email}'`);

      if (error) {
        console.log(error);
        setCodes(null);
      }

      if (data) {
        setCodes(data);
      }
    };

    fetchCodes();
  }, [user.email]);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = Codes.slice(firstPostIndex, lastPostIndex);

  return (
    <div>
      {user.aud === "authenticated" ? (
        <div className="flex">
          <div className="w-[30vw] h-[80vh] mt-6">
            <center>
              <img
                src={user.user_metadata.avatar_url}
                alt=""
                className="h-28 rounded-full"
              />
              <h1 className="mt-4">{user.email}</h1>
              <h1 className="mt-4">Role:{user.role}</h1>
            </center>
          </div>
          <div>
            <div>
              <Colist Codes={currentPost} />
              <div className="flex items-center justify-center text-center align-center mt-4">
                <Paginations
                  totalPosts={Codes.length}
                  postPerPage={postPerPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default Profile;

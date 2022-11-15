import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../SupaBaseClient";

function NavBar() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
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

  const HandleLogOut = async () => {
    const { error } = await supabase.auth.signOut();
    window.location.reload(false);
  };

  return (
    <nav className="relative border-b-2 border-black">
      <div className="container px-12 py-4 md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between ">
          <div>
            <Link
              to="/"
              className="text-xl font-bold text-gray-900 transition-colors duration-300 transform hover:text-gray-700"
            >
              AccelCss
            </Link>
          </div>
        </div>
        <div className="absolute gap-8 inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-[#fbf5e6] md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center">
          <div className="flex flex-col md:flex-row md:mx-6 text-lg items-center justify-center align-center gap-2 md:gap-8">
            <Link
              className="my-2 text-black transition-colors duration-300 transform hover:text-gray-700 md:mx-4 md:my-0"
              to="/"
            >
              Home
            </Link>
            <Link
              className="my-2 text-black transition-colors duration-300 transform hover:text-gray-700  md:mx-4 md:my-0"
              to="/compiler"
            >
              Compiler
            </Link>
            <Link
              className="my-2 text-black transition-colors duration-300 transform  hover:text-gray-700  md:mx-4 md:my-0"
              to="/profile"
            >
              Profile
            </Link>
          </div>


          <div className="flex justify-center md:block visible px-6 py-[2px] border-2 border-black">
          {user.aud !== "authenticated" ?
            
           <Link
                className="relative text-black transition-colors duration-300 transform hover:text-gray-600"
                to="/login"
              >
                Sign in
              </Link>
            :
            <button onClick={HandleLogOut}>Sign Out</button> 
            }
            
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

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
    navigate("/");
  };

  return (
    <nav className="relative bg-white shadow">
      <div className="container px-6 py-4 mx-auto flex justify-between items-center">
        <div className="flex items-center justify-between">
          <div>
            <Link
              to="/"
              className="text-2xl font-bold text-gray-900 transition-colors duration-300 transform  lg:text-2xl hover:text-gray-700"
            >
              AccelCss
            </Link>
          </div>
        </div>
        <div className="absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center hidden">
          <div className="flex flex-col md:flex-row md:mx-6">
            <Link
              className="my-2 text-gray-900 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
              to="/"
            >
              Home
            </Link>
            <Link
              className="my-2 text-gray-900 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
              to="/compiler"
            >
              Compiler
            </Link>
            <Link
              className="my-2 text-gray-900 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
              to="/profile"
            >
              Profile
            </Link>
          </div>

          <div className="flex justify-center md:block visible">
            {user.aud !== "authenticated" ? (
              <Link
                className="relative text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300"
                to="/login"
              >
                Log in
              </Link>
            ) : (
              <div>
                <button
                  className="relative text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300"
                  onClick={HandleLogOut}
                >
                  log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

import React, { useEffect, useState } from "react";
import { supabase } from "../SupaBaseClient";
import Colist from "./Colist";
import Paginations from "./Paginations";

function List() {
  const [Codes, setCodes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setpostPerPage] = useState(6);
  useEffect(() => {
    const fetchCodes = async () => {
      const { data, error } = await supabase
        .from("Codes")
        .select()
        .order("created_at", { ascending: false });

      if (error) {
        console.log(error);
        setCodes(null);
      }

      if (data) {
        setCodes(data);
      }
    };

    fetchCodes();
  }, []);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = Codes.slice(firstPostIndex, lastPostIndex);

  return (
    <div>
      <div>
        <div className="items-center justify-center text-center align-center">
          <Colist Codes={currentPost} />
        </div>
        <div className="flex items-center justify-center text-center align-center mt-4">
          <Paginations
            totalPosts={Codes.length}
            postPerPage={postPerPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default List;

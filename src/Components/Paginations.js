import { Pagination, Stack } from "@mui/material";
import React, { useEffect } from "react";

function Paginations({ totalPosts, postPerPage, setCurrentPage }) {
  let pages = [];

  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="block items-center justify-center text-center align-center">
      <Stack spacing={2}>
        <Pagination count={pages.length} page={page} onChange={handleChange} />
      </Stack>
    </div>
  );
}

export default Paginations;

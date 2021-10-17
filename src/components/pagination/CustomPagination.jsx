import * as React from 'react';
import Pagination from '@mui/material/Pagination';


const CustomPagination = ({ setPage, numberOfPages =10}) => {
   const handlePageChange = (page) => {
     setPage(page);
     window.scroll(0, 0);
   };
  return (
    <div className="py-2 bg-warning d-flex align-items-center justify-content-center">
      <Pagination
        count={numberOfPages}
        onChange={(e) => handlePageChange(e.target.textContent)}
        hideNextButton
        hidePrevButton
        color="primary"
      />
    </div>
  );
};

export default CustomPagination




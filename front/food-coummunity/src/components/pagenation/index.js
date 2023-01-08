import { useState } from 'react';
import Pagination from 'react-js-pagination';
import './page.css';

const PageNation = ({ data, page, setPage, perpage }) => {
  const handlePageChange = (page) => {
    setPage(page);
  };
  return (
    <Pagination
      totalItemsCount={data?.length}
      activePage={page}
      pageRangeDisplayed={5}
      itemsCountPerPage={perpage}
      prevPageText={'‹'}
      nextPageText={'›'}
      onChange={handlePageChange}
    />
  );
};

export default PageNation;

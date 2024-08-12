import { useEffect, useState } from "react";

const usePagination = () => {

  const totalPages = 300;
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchData = () => {
      const page = Math.min(currentPage + 1, totalPages);
      // const 
    }
  }, [])

  
  

  return <div>Pagination</div>;
};
export default usePagination;

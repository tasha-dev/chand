// Codes by mahdi tasha
// Importing part
import { usePaginationResult } from '@/type/hook';
import { useState, useMemo } from 'react';

// Creating and exporting usePagination custom hook as default
export default function usePagination<T>(
  data: T[],
  itemsPerPage: number,
): usePaginationResult<T> {
  // Defining states
  const [currentPage, setCurrentPage] = useState(1);

  // Defining variables
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Using useMemo to slice items
  const paginatedData = useMemo(() => {
    const end = currentPage * itemsPerPage;
    return data.slice(0, end);
  }, [currentPage, data, itemsPerPage]);

  // Defining a function to set pages
  const setPage = (page: number) => {
    if (page < 1) setCurrentPage(1);
    else if (page > totalPages) setCurrentPage(totalPages);
    else setCurrentPage(page);
  };

  // Defining usable functions
  const nextPage = () => setPage(currentPage + 1);
  const prevPage = () => setPage(currentPage - 1);

  // Exporting values
  return {
    currentPage,
    totalPages,
    paginatedData,
    setPage,
    nextPage,
    prevPage,
  };
}

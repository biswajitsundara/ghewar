import React from "react";
import "./Pagination.css";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  maxVisiblePages: number;
  currentPage: number;
  alignment?: "start" | "center" | "end";
  onPageChange: (page: number) => void;
}

const Pagination = ({
  totalItems,
  itemsPerPage,
  maxVisiblePages,
  currentPage,
  alignment = "center",
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentGroup = Math.floor((currentPage - 1) / maxVisiblePages);
  const startPage = currentGroup * maxVisiblePages + 1;
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  const handlePageClick = (pageNumber: number) => {
    if (pageNumber !== currentPage) {
      onPageChange(pageNumber);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className="pagination-container" style={{ justifyContent: alignment }}>
      <button
        className="pagination-nav-btn"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        <svg
          viewBox="0 0 24 24"
          focusable="false"
          aria-hidden="true"
          width="24"
          height="24"
        >
          <path d="M14 18l1.41-1.41L10.83 12l4.58-4.59L14 6l-6 6z"></path>
        </svg>
      </button>

      {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
        <button
          key={startPage + index}
          className={`pagination-btn ${
            currentPage === startPage + index ? "active" : ""
          }`}
          onClick={() => handlePageClick(startPage + index)}
        >
          {startPage + index}
        </button>
      ))}

      <button
        className="pagination-nav-btn"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        <svg
          viewBox="0 0 24 24"
          focusable="false"
          aria-hidden="true"
          width="24"
          height="24"
        >
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
        </svg>
      </button>
    </div>
  );
};

export default Pagination;

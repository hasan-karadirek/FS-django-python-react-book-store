"use client";
import React from "react";
import { BookListResponse } from "../../types/responses";

interface PaginationProps {
  pagination: BookListResponse;
}

const Pagination: React.FC<PaginationProps> = ({ pagination }) => {
  const updatePage = (page: number) => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("page", page.toString());
      window.location.href = url.toString();
    }
  };

  return (
    <nav style={{ display: "flex", justifyContent: "center", padding: "1rem" }}>
      <ul className="pagination">
        <li
          className={`page-item ${pagination?.current_page > 1 ? "" : "disabled"}`}
        >
          <a
            className="page-link"
            href="#"
            tabIndex={-1}
            onClick={() => updatePage(1)}
            aria-disabled={pagination?.current_page > 1 ? "false" : "true"}
          >
            First
          </a>
        </li>
        <li
          className={`page-item ${pagination?.current_page > 1 ? "" : "disabled"}`}
        >
          <a
            className="page-link"
            href="#"
            tabIndex={-1}
            onClick={() => updatePage(pagination?.current_page - 1)}
            aria-disabled={pagination?.current_page > 1 ? "false" : "true"}
          >
            Previous
          </a>
        </li>
        {pagination?.current_page > 1 ? (
          <li className="page-item">
            <a
              className="page-link"
              onClick={() => updatePage(pagination?.current_page - 1)}
              href="#"
            >
              {pagination?.current_page - 1}
            </a>
          </li>
        ) : (
          ""
        )}
        <li className="page-item active" aria-current="page">
          <a className="page-link" href="#">
            {pagination?.current_page}
          </a>
        </li>
        {pagination?.current_page < pagination?.total_pages ? (
          <li className="page-item">
            <a
              onClick={() => updatePage(pagination?.current_page + 1)}
              className="page-link"
              href="#"
            >
              {pagination?.current_page + 1}
            </a>
          </li>
        ) : (
          ""
        )}
        <li className="page-item">
          <a
            className="page-link"
            onClick={() => updatePage(pagination?.current_page + 1)}
            aria-disabled={
              pagination?.current_page < pagination?.total_pages
                ? "false"
                : "true"
            }
            href="#"
          >
            Next
          </a>
        </li>
        <li
          className={`page-item ${pagination?.current_page < pagination?.total_pages ? "" : "disabled"}`}
        >
          <a
            className="page-link"
            onClick={() => updatePage(pagination?.total_pages)}
            aria-disabled={
              pagination?.current_page < pagination?.total_pages
                ? "false"
                : "true"
            }
            href="#"
          >
            Last {pagination?.total_pages}
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

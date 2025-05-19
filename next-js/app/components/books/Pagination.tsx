"use client";
import React from "react";
import { BookListResponse } from "../../types/responses";

interface PaginationProps {
  pagination: BookListResponse;
}

const Pagination: React.FC<PaginationProps> = ({ pagination }) => {
  const url = new URL(window.location.href);
  const updatePage = (e: React.MouseEvent<HTMLAnchorElement>,page:number) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      
      url.searchParams.set("page", page.toString());
      window.location.href = url.toString();
    }
  };
  const pageUrl = (page: number) => {
    url.searchParams.set("page", page.toString());
    return url.toString();
  }

  return (
    <nav style={{ display: "flex", justifyContent: "center", padding: "1rem" }}>
      <ul className="pagination">
        <li
          className={`page-item ${pagination?.current_page > 1 ? "" : "disabled"}`}
        >
          <a
            className="page-link"
            href={pageUrl(1)}
            tabIndex={-1}
            onClick={(e) => updatePage(e, 1)}
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
            href={pageUrl(pagination?.current_page - 1)}
            tabIndex={-1}
            onClick={(e) => updatePage(e, pagination?.current_page - 1)}
            aria-disabled={pagination?.current_page > 1 ? "false" : "true"}
          >
            Previous
          </a>
        </li>
        {pagination?.current_page > 1 ? (
          <li className="page-item">
            <a
              className="page-link"
              onClick={(e) => updatePage(e, pagination?.current_page - 1)}
              href={pageUrl(pagination?.current_page - 1)}
            >
              {pagination?.current_page - 1}
            </a>
          </li>
        ) : (
          ""
        )}
        <li className="page-item active" aria-current="page">
          <a className="page-link" href={pageUrl(pagination?.current_page)}>
            {pagination?.current_page}
          </a>
        </li>
        {pagination?.current_page < pagination?.total_pages ? (
          <li className="page-item">
            <a
              onClick={(e) => updatePage(e, pagination?.current_page + 1)}
              className="page-link"
              href={pageUrl(pagination?.current_page + 1)}
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
            onClick={(e) => updatePage(e, pagination?.current_page + 1)}
            aria-disabled={
              pagination?.current_page < pagination?.total_pages
                ? "false"
                : "true"
            }
            href={pageUrl(pagination?.current_page +1)}
          >
            Next
          </a>
        </li>
        <li
          className={`page-item ${pagination?.current_page < pagination?.total_pages ? "" : "disabled"}`}
        >
          <a
            className="page-link"
            onClick={(e) => updatePage(e, pagination?.total_pages)}
            aria-disabled={
              pagination?.current_page < pagination?.total_pages
                ? "false"
                : "true"
            }
            href={pageUrl(pagination?.total_pages)}
          >
            Last {pagination?.total_pages}
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

"use client";
import React, { useEffect, useState } from "react";
import { SearchFormData } from "../../types/forms";
import useFetch from "../../hooks/useFetch";
import useWindowSize from "../../hooks/useWindowSize";

interface Category {
  id: number;
  title: string;
}
interface Language {
  id: number;
  name: string;
}

const SearchBar = () => {
  const { width } = useWindowSize();
  const [searchForm, setSearchForm] = useState<SearchFormData>({
    search: "",
    page: 1,
    category: "",
    language: "",

    tag: "",
  });

  const [categories, setCategories] = useState<Category[] | null>(null);
  const categoryFetch = useFetch("/book/categories/", (res) => {
    setCategories(res.data as Category[]);
  });
  const [languages, setLanguages] = useState<Language[] | null>(null);
  const languageFetch = useFetch("/book/languages/", (res) => {
    setLanguages(res.data as Language[]);
  });
  useEffect(() => {
    categoryFetch.performFetch();
    languageFetch.performFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const searchFormOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const value: string = e.target.value;
    const name: string = e.target.name;

    setSearchForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const searchParams = new URLSearchParams(window.location.search);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchParams.set(
      "page",
      searchForm?.page ? searchForm?.page?.toString() : "",
    );

    searchParams.set("search", searchForm?.search ? searchForm.search : "");

    searchParams.set(
      "category",
      searchForm?.category ? searchForm.category : "",
    );

    searchParams.set(
      "language",
      searchForm?.language ? searchForm.language : "",
    );

    window.location.href = `${window.location.pathname}?${searchParams.toString()}`;
  };

  return (
    <div className="container mt-3">
      <form
        className={`${width > 992 ? "d-flex" : "d-block"} search-form`}
        onSubmit={handleSubmit}
      >
        <input
          className="form-control me-2"
          type="search"
          name="search"
          placeholder="Search book name, author name, ISBN, Publishing House..."
          onChange={searchFormOnChange}
          aria-label="Search"
        />

        <select
          className="search-select"
          name="category"
          value={searchForm.category}
          onChange={searchFormOnChange}
        >
          <option value="">Choose a Category</option>
          {categories
            ? categories.map((category, index) => (
                <option key={index} value={category.title}>
                  {category.title}
                </option>
              ))
            : ""}
        </select>
        <select
          className="search-select"
          style={{ marginLeft: "0.5rem" }}
          name="language"
          value={searchForm.language}
          onChange={searchFormOnChange}
        >
          <option value="">Choose a language</option>
          {languages
            ? languages.map((language, index) => (
                <option key={index} value={language.name}>
                  {language.name}
                </option>
              ))
            : ""}
        </select>
        <button
          style={{ marginLeft: "1rem" }}
          className="btn btn-outline-success"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;

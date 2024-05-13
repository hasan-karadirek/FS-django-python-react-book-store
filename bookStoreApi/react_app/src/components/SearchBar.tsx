import React, { useState } from "react";

export interface SearchFormData {
  search: string;
}
interface SearchBarProps {
  handleSearchFormSubmit: (formData: SearchFormData) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ handleSearchFormSubmit }) => {
  const [searchForm, setSearchForm] = useState<SearchFormData>({
    search: "",
  });
  const searchFormOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;
    console.log("hasan",value,searchForm)
    setSearchForm((prevForm) => ({
      ...prevForm,
      search: value,
    }));
    console.log("hasan",value,searchForm)
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handle",searchForm)
    handleSearchFormSubmit(searchForm);
    setSearchForm({search:""})
  };

  return (
    <div className="container mt-3">
      <form className="d-flex" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          onChange={searchFormOnChange}
          aria-label="Search"
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
